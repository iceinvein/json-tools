import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<div className="h-16 flex flex-row items-center px-4">
				<nav className="flex flex-row items-center justify-flex-start gap-6">
					<a href="/">Home</a>
					<a href="/format-json">Format JSON</a>
				</nav>
			</div>
			<hr />
			<Outlet />
			{import.meta.env.DEV && <TanStackRouterDevtools />}
		</>
	);
}
