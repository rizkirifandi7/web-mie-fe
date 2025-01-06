"use client";
import { List } from "lucide-react";
import {
	Heading1,
	Bold,
	Italic,
	Strikethrough,
	Highlighter,
} from "lucide-react";
import { ListOrdered } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export default function ToolBar({ editor }) {
	if (!editor) return null;

	const Options = [
		{
			icon: <Heading1 className="size-4" />,
			onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
			pressed: editor.isActive("heading", { level: 1 }),
		},
		{
			icon: <Bold className="size-4" />,
			onClick: () => editor.chain().focus().toggleBold().run(),
			pressed: editor.isActive("bold"),
		},
		{
			icon: <Italic className="size-4" />,
			onClick: () => editor.chain().focus().toggleItalic().run(),
			pressed: editor.isActive("italic"),
		},
		{
			icon: <Strikethrough className="size-4" />,
			onClick: () => editor.chain().focus().toggleStrike().run(),
			pressed: editor.isActive("strike"),
		},
		{
			icon: <List className="size-4" />,
			onClick: () => editor.chain().focus().toggleBulletList().run(),
			pressed: editor.isActive("bulletList"),
		},
		{
			icon: <ListOrdered className="size-4" />,
			onClick: () => editor.chain().focus().toggleOrderedList().run(),
			pressed: editor.isActive("orderedList"),
		},
		{
			icon: <Highlighter className="size-4" />,
			onClick: () => editor.chain().focus().toggleHighlight().run(),
			pressed: editor.isActive("highlight"),
		},
	];

	return (
		<div className="border-b p-1.5 mb-1 space-x-1 sticky top-10 z-50">
			{Options.map((option, i) => (
				<Toggle
					key={i}
					size="sm"
					pressed={option.pressed}
					onPressedChange={option.onClick}
				>
					{option.icon}
				</Toggle>
			))}
		</div>
	);
}
