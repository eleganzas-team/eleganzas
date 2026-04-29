# Fix Editor Render Error: EditorProvider updating TemplateEditor during render

## Plan Steps

- [x] Step 1: Edit `components/undangan/lib/hooks/useEditor.tsx` to defer `onChange` calls using useRef + useEffect
- [ ] Step 2: Test in browser - edit a field, check no React console error, hasChanges updates, save works
- [ ] Step 3: Verify across themes (islami-lux, ethereal)
- [ ] Step 4: Complete task

**Current status**: Step 1 ✅ Complete. EditorProvider now defers onChange via useEffect, removed synchronous call in setValue, stabilized deps. Ready for testing.


