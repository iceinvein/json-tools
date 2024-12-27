import { useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { Textarea } from "./components/ui/textarea";

const validateJson = (json: string) => {
	try {
		JSON.parse(json);
	} catch (error) {
		return false;
	}
	return true;
};

function App() {
	const [content, setContent] = useState("");
	const [error, setError] = useState("");

	return (
		<ThemeProvider defaultTheme="dark" storageKey="json-tools-theme">
			<div className="flex flex-row gap-8 items-center justify-center h-screen p-8">
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
		</ThemeProvider>
	);
}

export default App;
