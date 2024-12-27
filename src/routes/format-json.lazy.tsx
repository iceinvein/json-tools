import { Textarea } from "@/components/ui/textarea";
import { validateJson } from "@/lib/utils";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/format-json")({
	component: RouteComponent,
});

function RouteComponent() {
	const [content, setContent] = useState("");
	const [error, setError] = useState("");

	return (
		<div className="flex flex-row gap-8 items-center justify-center h-[calc(100svh-4rem)] p-8">
			<div className="w-1/2 h-full flex flex-col gap-4 justify-center items-center">
				<p className="text-2xl font-bold">Paste your JSON here</p>
				{error && <p className="text-red-500 text-sm">{error}</p>}
				<Textarea
					value={content}
					onChange={(e) => {
						e.preventDefault();
						setError("");
						if (!validateJson(e.target.value)) setError("Invalid JSON");

						setContent(e.target.value);
					}}
					onPaste={(e) => {
						e.preventDefault();
						setError("");

						const text = e.clipboardData.getData("text/plain");

						if (!validateJson(text)) setError("Invalid JSON");

						setContent(text);
					}}
					className="h-full"
				/>
				{/* <Button>Convert</Button> */}
			</div>
			<div className="w-1/2 h-full flex flex-col gap-4 justify-center items-center">
				<p className="text-2xl font-bold">Formatted JSON</p>
				<div className="h-full w-full overflow-auto p-2 rounded-lg bg-card border border-border">
					{!error && !!content && (
						<pre className="whitespace-pre-wrap">
							{JSON.stringify(JSON.parse(content), null, 2)}
						</pre>
					)}
				</div>
			</div>
		</div>
	);
}
