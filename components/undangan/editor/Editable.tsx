import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";
import { useEditor } from "@/components/undangan/lib/hooks/useEditor";

type EditableProps<TElement extends ElementType> = {
  as?: TElement;
  field: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className" | "onClick">;

export function Editable<TElement extends ElementType = "span">({
  as,
  field,
  className,
  ...props
}: EditableProps<TElement>) {
  const Component = as ?? "span";
  const { isEditable, activeField, getValue, setActiveField } = useEditor();
  const isActive = activeField === field;

  // In preview/publish mode, render static text without editing UI
  if (!isEditable) {
    return (
      <Component {...props} className={className}>
        {getValue(field)}
      </Component>
    );
  }

  // In editor mode, render editable field with interaction
  return (
    <Component
      {...props}
      role="button"
      tabIndex={0}
      data-active={isActive}
      onClick={() => setActiveField(field)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") setActiveField(field);
      }}
      className={cn(
        "editable-field cursor-text rounded-md px-1 outline-none transition-all duration-300 hover:bg-editor-highlight focus-visible:ring-2 focus-visible:ring-ring data-[active=true]:bg-editor-highlight data-[active=true]:shadow-editor",
        className,
      )}
    >
      {getValue(field)}
    </Component>
  );
}
