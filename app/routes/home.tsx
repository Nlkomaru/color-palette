import { Button } from "../components/ui/button";
import type { Route } from "./+types/home";
export function meta() {
    return [
        { title: "Color Palette Generator" },
        { name: "description", content: "Welcome to Color Palette Generator!" },
    ];
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    return (
        <>
            <div> Hello Panda</div>
            <Button>Click me</Button>
        </>
    );
}
