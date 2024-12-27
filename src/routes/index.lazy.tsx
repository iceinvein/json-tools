import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-4 items-center justify-center h-[calc(100svh-4rem)] p-8">
			<p className="text-2xl font-bold">Welcome to JSON Tools</p>
			<p className="text-gray-400">
				A collection of tools to help you work with JSON data.
			</p>
			<div className="flex flex-row gap-4 items-center justify-center">
				<a
					href="https://github.com/iceinvein/json-tools"
					target="_blank"
					rel="noreferrer noopener"
				>
					<img
						src="https://img.shields.io/github/stars/iceinvein/json-tools?style=social"
						alt="GitHub Repo stars"
					/>
				</a>
				<a
					href="https://github.com/iceinvein/json-tools"
					target="_blank"
					rel="noreferrer noopener"
				>
					<img
						src="https://img.shields.io/github/forks/iceinvein/json-tools?style=social"
						alt="GitHub forks"
					/>
				</a>
				<a
					href="https://github.com/iceinvein/json-tools/issues"
					target="_blank"
					rel="noreferrer noopener"
				>
					<img
						src="https://img.shields.io/github/issues/iceinvein/json-tools?style=social"
						alt="GitHub issues"
					/>
				</a>
			</div>
		</div>
	);
}
