// src/Tiptap.tsx
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./styles/styles.scss";
import Placeholder from "@tiptap/extension-placeholder";

export const BlogTitle = () => {
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: "Title" })],
    editorProps: {
      attributes: {
        class: "border-2 p-3 rounded-xl",
      },
    },
  });

  return (
    <>
      <EditorContent editor={editor} />
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bubble-menu">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              Bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              Italic
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
            >
              H1
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              H2
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={
                editor.isActive("heading", { level: 3 }) ? "is-active" : ""
              }
            >
              H3
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }
              className={
                editor.isActive("heading", { level: 4 }) ? "is-active" : ""
              }
            >
              H4
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 5 }).run()
              }
              className={
                editor.isActive("heading", { level: 5 }) ? "is-active" : ""
              }
            >
              H5
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 6 }).run()
              }
              className={
                editor.isActive("heading", { level: 6 }) ? "is-active" : ""
              }
            >
              H6
            </button>
          </div>
        </BubbleMenu>
      )}
    </>
  );
};
