import { ColorPalettePreview } from "~/components/organisms/color-palette-preview";
import { getColorChannels, getColorInfo } from "~/utils/color";
import { getLightness } from "~/utils/lightness";
import { VStack } from "../../styled-system/jsx";
import { LightnessChart } from "../components/organisms/lightness-chart";
import { Setting } from "../components/organisms/setting";
import { useColorPaletteState } from "../hooks/useColorPaletteState";
import type { Route } from "./+types/home";

export default function Home({ loaderData }: Route.ComponentProps) {
    const { colors, updateColorValue, updateColorId, length, mode, gain, removeColorPalette , addColorPalette } = useColorPaletteState();

    return (
        <VStack gap="4rem" alignItems="flex-start">
            <Setting />
            <LightnessChart data={getLightness(length, mode, gain)} />
            <VStack gap="4rem" alignItems="flex-start">
                {colors.map(({ colorValue: color, colorId: id, uniqueId }) => {
                    const lightness = getLightness(length, mode, gain);
                    const displayColors = getColorChannels(color, lightness).map((color) => getColorInfo(color));
                    return (
                        <ColorPalettePreview
                            key={uniqueId}
                            colorValue={color}
                            displayColors={displayColors}
                            colorId={id}
                            uniqueId={uniqueId}
                            onChangeColor={(newColor: string) => updateColorValue(uniqueId, newColor)}
                            onChangeId={(newId: string) => updateColorId(uniqueId, newId)}
                            lightBackgroundColor="#ffffff"
                            darkBackgroundColor="#000000"
                            onRemove={() => {
                                removeColorPalette(uniqueId);
                            }}
                            onCreate={() => {
                                addColorPalette();
                            }}
                            isLast={colors[colors.length - 1].uniqueId === uniqueId}
                        />
                    );
                })}
            </VStack>
        </VStack>
    );
}

export function meta() {
    return [
        { title: "Color Palette Generator" },
        { name: "description", content: "Welcome to Color Palette Generator!" },
    ];
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}
