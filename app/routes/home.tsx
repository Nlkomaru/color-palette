import { useQueryState } from "nuqs";
import { ColorPalettePreview } from "~/components/organisms/color-palette-preview";
import { VStack } from "../../styled-system/jsx";
import type { Route } from "./+types/home";

type ColorPalette = {
    colorValue: string;
    colorId: string;
    uniqueId: number;
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
                colorValue: "#000000",
                colorId: "0",
                uniqueId: 1,
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

    const lastUniqueId = colors.at(-1)?.uniqueId ?? 1;

    const addColorPalette = () => {
        setColors([
            ...colors,
            { colorValue: "#000000", colorId: String(length), uniqueId: lastUniqueId + 1 },
        ]);
        setLength(length + 1);
    };

    const removeColorPalette = (uniqueId: number) => {
        setColors(colors.filter(({ uniqueId: id }) => id !== uniqueId));
    };

    return (
        <>
            <VStack gap="4rem" alignItems="flex-start">
                {colors.map(({ colorValue: color, colorId: id, uniqueId }, index) => (
                    <ColorPalettePreview
                        key={uniqueId}
                        colorValue={color}
                        displayColors={getColor(color, length, "constant")}
                        colorId={id}
                        uniqueId={uniqueId}
                        onChangeColor={(newColor: string) =>
                            setColors(colors.map((c, i) => (i === index ? { ...c, colorValue: newColor } : c)))
                        }
                        onChangeId={(newId: string) =>
                            setColors(colors.map((c, i) => (i === index ? { ...c, colorId: newId } : c)))
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
