"use client"
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { setDeepValue, resolveValue } from "@/components/undangan/lib/engine/resolver";
import type { EditorMode } from "@/components/undangan/lib/engine/generator";

type ThemeMapping = Record<string, readonly string[]>;
type EditableData = Record<string, unknown>;

type EditorContextValue = {
  mode: EditorMode;
  isEditable: boolean;
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
  mode = "editor",
  onChange,
}: {
  children: ReactNode;
  defaultData: EditableData;
  initialUserData: EditableData;
  mapping: ThemeMapping;
  mode?: EditorMode;
  onChange?: (userData: EditableData) => void;
}) {
  const [userData, setUserData] = useState<EditableData>(initialUserData);
  const [activeField, setActiveField] = useState<string | null>(null);

  const isEditable = mode === "editor";

  const value = useMemo<EditorContextValue>(() => {
    const sources = { user: userData, default: defaultData };

    return {
      mode,
      isEditable,
      activeField: isEditable ? activeField : null,
      userData,
      getEditablePath: (field) => getUserEditablePath(mapping[field]),
      getValue: (field) => String(resolveValue([...(mapping[field] ?? [])], sources) ?? ""),
      setActiveField: isEditable
        ? setActiveField
        : () => {}, // no-op in non-editor modes
      setValue: isEditable
        ? (field, fieldValue) => {
            const editablePath = getUserEditablePath(mapping[field]);
            if (!editablePath) return;
            setUserData((current) => {
              const newData = setDeepValue(current, editablePath, fieldValue);
              onChange?.(newData);
              return newData;
            });
          }
        : () => {}, // no-op in non-editor modes
    };
  }, [activeField, defaultData, mapping, userData, mode, isEditable, onChange]);

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) throw new Error("useEditor must be used inside EditorProvider");
  return context;
}
