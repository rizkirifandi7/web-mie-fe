import parse from "html-react-parser";

const parseHTMLToEditorContent = (html) => {
	const parsed = parse(html);
	const content = [];

	const parseNode = (node) => {
		if (node.type === "tag") {
			switch (node.name) {
				case "h1":
					return {
						type: "heading",
						attrs: { level: 1 },
						content: [{ type: "text", text: node.children[0].data }],
					};
				case "h2":
					return {
						type: "heading",
						attrs: { level: 2 },
						content: [{ type: "text", text: node.children[0].data }],
					};
				case "h3":
					return {
						type: "heading",
						attrs: { level: 3 },
						content: [{ type: "text", text: node.children[0].data }],
					};
				case "p":
					return {
						type: "paragraph",
						content: [{ type: "text", text: node.children[0].data }],
					};
				case "ul":
					return {
						type: "bulletList",
						attrs: { tight: true },
						content: node.children.map((li) => ({
							type: "listItem",
							content: [
								{
									type: "paragraph",
									content: [{ type: "text", text: li.children[0].data }],
								},
							],
						})),
					};
				// Add more cases for other tags as needed
				default:
					return null;
			}
		}
		return null;
	};

	const nodes = Array.isArray(parsed) ? parsed : [parsed];

	nodes.forEach((node) => {
		const parsedNode = parseNode(node);
		if (parsedNode) {
			content.push(parsedNode);
		}
	});

	return content;
};

export default parseHTMLToEditorContent;
