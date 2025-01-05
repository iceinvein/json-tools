import { Textarea } from "@/components/ui/textarea";
import { createTypeFromJson, tsTokenPatterns, validateJson } from "@/lib/utils";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createLazyFileRoute("/json-to-type")({
	component: RouteComponent,
});

function RouteComponent() {
	const [content, setContent] = useState("");
	const [error, setError] = useState("");
	const [displayText, setDisplayText] = useState("");
	const [isComplete, setIsComplete] = useState(false);

	const TokenizedLine = ({ line }: { line: string }) => {
		const tokens: JSX.Element[] = [];
		let currentIndex = 0;

		while (currentIndex < line.length) {
			let matched = false;

			for (const { pattern, className } of tsTokenPatterns) {
				const match = line.slice(currentIndex).match(pattern);

				if (match && match.index === 0) {
					const value = match[0];

					tokens.push(
						<span key={currentIndex} className={className}>
							{value}
						</span>,
					);

					currentIndex += value.length;
					matched = true;
					break;
				}
			}

			if (!matched) {
				// Add unmatched characters as plain text
				tokens.push(
					<span key={currentIndex} className="text-gray-200">
						{line[currentIndex]}
					</span>,
				);
				currentIndex++;
			}
		}

		return <>{tokens}</>;
	};

	const targetRef = useRef("");

	useEffect(() => {
		if (!content) {
			setDisplayText("");
			setError("");
			return;
		}

		const currentFormattedType = validateJson(content)
			? createTypeFromJson(JSON.parse(content))
			: "";

		if (currentFormattedType !== targetRef.current) {
			setDisplayText("");
			targetRef.current = currentFormattedType;
		}

		if (!validateJson(content)) {
			setError("Invalid JSON! Please paste a valid JSON string.");
			setDisplayText("");
			return;
		}

		setError("");

		if (displayText.length < currentFormattedType.length) {
			const timeout = setTimeout(
				() =>
					setDisplayText(currentFormattedType.slice(0, displayText.length + 1)),
				10,
			);
			return () => clearTimeout(timeout);
		}

		setIsComplete((prev) => !prev);
	}, [displayText, content]);

	return (
		<div className="flex flex-row gap-8 items-center justify-center h-[calc(100svh-4rem)] p-8">
			<div className="w-1/2 h-full flex flex-col gap-4 justify-center items-center">
				<p className="text-2xl font-bold">Paste your JSON here</p>
				<Textarea
					value={content}
					onChange={(e) => {
						e.preventDefault();

						setContent(e.target.value);
					}}
					onPaste={(e) => {
						e.preventDefault();
						setError("");

						const text = e.clipboardData.getData("text/plain");

						setContent(text);
					}}
					className="h-full"
				/>
			</div>
			<div className="w-1/2 h-full flex flex-col gap-4 justify-center items-center">
				<div className="w-full h-full bg-gray-900 rounded-lg shadow-xl overflow-hidden">
					<div className="p-2 bg-gray-800 border-b border-gray-700 flex items-center">
						<div className="flex space-x-2 ml-2">
							<div className="w-3 h-3 rounded-full bg-red-500" />
							<div className="w-3 h-3 rounded-full bg-yellow-500" />
							<div className="w-3 h-3 rounded-full bg-green-500" />
						</div>
						{error ? (
							<span className="ml-4 text-red-500 text-sm">{error}</span>
						) : (
							<span className="ml-4 text-gray-400 text-sm">
								Typescript Type
							</span>
						)}
					</div>
					{displayText && (
						<div className="p-4 font-mono text-sm overflow-x-auto">
							<pre className="text-gray-200">
								{displayText.split("\n").map((line, i) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: the content is static
									<div key={i} className="min-h-[1.5em] flex">
										<span className="w-12 inline-block text-right pr-4 text-gray-400 select-none">
											{i + 1}
										</span>
										<span className="flex-1">
											<TokenizedLine line={line} />
										</span>
									</div>
								))}
								<span
									className={`inline-block w-2 h-4 ml-1 bg-gray-400 ${
										!isComplete ? "animate-typing-cursor" : ""
									}`}
								/>
							</pre>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
