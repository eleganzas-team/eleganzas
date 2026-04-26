import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { setDeepValue, resolveValue } from "@/lib/engine/resolver";

type ThemeMapping = Record<string, readonly string[]>;
type EditableData = Record<string, unknown>;

type EditorContextValue = {
  activeField: string | null;
  userData: EditableData;
  getEditablePath: (field: string) => string | null;
  getValue: (field: string) => string;
  setActiveField: (field: string | null) => void;
  setValue: (field: string, value: string) => void;
};

const EditorContext = createContext<EditorContextValue | null>(null);

function getUserEditablePath(paths: readonly string[] = []) {
  const userPath = paths.find((path) => path.startsWith("user."));
  return userPath ? userPath.replace(/^user\./, "") : null;
}

export function EditorProvider({
  children,
  defaultData,
  initialUserData,
  mapping,
}: {
  children: ReactNode;
  defaultData: EditableData;
  initialUserData: EditableData;
  mapping: ThemeMapping;
}) {
  const [userData, setUserData] = useState<EditableData>(initialUserData);
  const [activeField, setActiveField] = useState<string | null>(null);

  const value = useMemo<EditorContextValue>(() => {
    const sources = { user: userData, default: defaultData };

    return {
      activeField,
      userData,
      getEditablePath: (field) => getUserEditablePath(mapping[field]),
      getValue: (field) => String(resolveValue([...(mapping[field] ?? [])], sources) ?? ""),
      setActiveField,
      setValue: (field, fieldValue) => {
        const editablePath = getUserEditablePath(mapping[field]);
        if (!editablePath) return;
        setUserData((current) => setDeepValue(current, editablePath, fieldValue));
      },
    };
  }, [activeField, defaultData, mapping, userData]);

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) throw new Error("useEditor must be used inside EditorProvider");
  return context;
}
