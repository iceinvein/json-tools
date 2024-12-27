import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-row items-center justify-center h-[calc(100svh-4rem)] p-8">
			<p className="text-2xl font-bold">Welcome to JSON Tools</p>
		</div>
	);
}
