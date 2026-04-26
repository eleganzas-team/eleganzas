# TODO: Editor, Preview, and Publish System for Undangan Templates

## Phase 1: Create Generator System ✅
- [x] Create `components/undangan/lib/engine/generator.ts`
  - [x] `generateData(mode, defaultData, userConfig, mapping)` function
  - [x] Editor mode: merged data with editing metadata
  - [x] Preview mode: merged data, no editing metadata
  - [x] Publish mode: flattened static data

## Phase 2: Update Editor Hook ✅
- [x] Modify `components/undangan/lib/hooks/useEditor.tsx`
  - [x] Add `mode` prop: 'editor' | 'preview' | 'publish'
  - [x] Editor mode: activeField, setActiveField, setValue, show FormRenderer
  - [x] Preview mode: read-only, no activeField, no FormRenderer
  - [x] Publish mode: completely static
  - [x] Add `onChange` callback to track user data changes
- [x] Modify `components/undangan/editor/Editable.tsx`
  - [x] Conditionally render editing UI based on mode
- [x] Modify `components/undangan/editor/FormRenderer.tsx`
  - [x] Only render in editor mode
- [x] Fix import paths in all related files
- [x] Create placeholder components for ethereal theme

## Phase 3: Create Dashboard Editor Page ✅
- [x] Update `app/(dashboard)/dashboard/editor/[id]/page.tsx`
  - [x] Convert to client component (for custom auth compatibility)
  - [x] Use `useAuth()` from custom auth context
  - [x] Fetch user_template data client-side
  - [x] Render template in editor mode with user config
  - [x] Add top bar with Save, Preview toggle, Publish button
- [x] Create `components/dashboard/editor/TemplateEditor.tsx`
  - [x] Client component with editor UI
  - [x] Handle save, preview, publish actions
  - [x] Track unsaved changes

## Phase 4: Create Preview Page ✅
- [x] Create `app/(dashboard)/dashboard/preview/[id]/page.tsx`
  - [x] Convert to client component (for custom auth compatibility)
  - [x] Load user template data from DB
  - [x] Render template in preview mode (no editing UI)
  - [x] Show "Back to Editor" button

## Phase 5: Update Template Pages ✅
- [x] Modify `components/undangan/pages/islami-lux/page.tsx`
  - [x] Accept `mode`, `userConfig`, `onUserDataChange` props
  - [x] Pass props to EditorProvider
- [x] Modify `components/undangan/pages/ethereal/page.tsx`
  - [x] Accept `mode`, `userConfig`, `onUserDataChange` props
  - [x] Pass props to EditorProvider

## Phase 6: Create Public Invitation Page ✅
- [x] Update `app/(public)/(undangan)/undangan/[slug]/[type]/page.tsx`
  - [x] Load published user_template by slug
  - [x] Render template in publish mode (completely static)
  - [x] Fix double view increment bug
  - [x] Increment views only in page component (not in metadata)

## Phase 7: Update User Template Service ✅
- [x] `saveContent(id, config)` function exists and works correctly
- [x] `publish(id)` and `unpublish(id)` functions exist
- [x] Data structure: `config.content` stores user data

## Custom Auth System Compatibility ✅
- [x] Editor page converted to client component using `useAuth()`
- [x] Preview page converted to client component using `useAuth()`
- [x] Both pages verify template ownership with custom user ID
- [x] Public page remains server component (no auth required)

## Testing
- [ ] Test editor → save → preview → publish flow
- [ ] Verify data persistence in database
- [ ] Test public invitation page loads correctly
