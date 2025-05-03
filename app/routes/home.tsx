import { useQueryState } from "nuqs";
import { ColorPalettePreview } from "~/components/organisms/color-palette-preview";
import { VStack } from "../../styled-system/jsx";
import type { Route } from "./+types/home";

type ColorPalette = {
    color: string;
    id: string;
};

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
    const [colors, setColors] = useQueryState<ColorPalette[]>("data", {
        defaultValue: [
            {
                color: "#000000",
                id: "0",
            },
        ],
        parse: (value) => JSON.parse(value),
        serialize: (value) => JSON.stringify(value),
    });

    const [length, setLength] = useQueryState("length", {
        defaultValue: 5,
        parse: (value) => Number.parseInt(value),
        serialize: (value) => String(value),
    });

    const addColorPalette = () => {
        setColors([...colors, { color: "#000000", id: String(length) }]);
        setLength(length + 1);
    };

    const removeColorPalette = (index: number) => {
        setColors(colors.filter((_, i) => i !== index));
    };

    return (
        <>
            <VStack gap="4rem">
                {colors.map(({ color, id }, index) => (
                    <ColorPalettePreview
                        key={`${color}-${id}`}
                        color={color}
                        displayColors={getColor(color, 5, "constant")}
                        id={id}
                        onChangeColor={(newColor: string) =>
                            setColors(colors.map((c, i) => (i === index ? { ...c, color: newColor } : c)))
                        }
                        onChangeId={(newId: string) =>
                            setColors(colors.map((c, i) => (i === index ? { ...c, id: newId } : c)))
                        }
                        lightBackgroundColor="#ffffff"
                        darkBackgroundColor="#000000"
                    />
                ))}
            </VStack>
        </>
    );
}

const getColor = (color: string, length: number, mode: "constant" | "dark") => {
    return Array.from({ length }, (_, i) => {
        return color;
    });
};
