"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./ToolBar";
import Highlight from "@tiptap/extension-highlight";

export default function RichTextEditor({ content, onChange }) {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: {
					levels: [1],
					HTMLAttributes: { class: "font-bold text-xl" },
				},
				orderedList: {
					HTMLAttributes: { class: "list-decimal ml-4 mt-2" },
				},
				bulletList: {
					HTMLAttributes: { class: "list-disc ml-4" },
				},
				paragraph: {
					HTMLAttributes: { class: "text-sm mt-2" },
				},
			}),
			Highlight,
		],
		content: content,
		editorProps: {
			attributes: { class: "min-h-[200px] rounded-md p-6" },
		},
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		immediatelyRender: false,
	});

	return (
		<div className="border rounded-md">
			<ToolBar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
}
