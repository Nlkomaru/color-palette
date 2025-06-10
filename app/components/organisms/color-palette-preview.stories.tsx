import type { Meta, StoryObj } from "@storybook/react";
import { getColorChannels, getColorInfo } from "~/utils/color";
import { getLightness } from "~/utils/lightness";
import { ColorPalettePreview } from "./color-palette-preview";
const meta = {
    title: "Organisms/ColorPalettePreview",
    component: ColorPalettePreview,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof ColorPalettePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        colorValue: "#00368E",
        colorId: "0",
        uniqueId: 0,
        displayColors: getColorChannels("#00368E", getLightness(10, "linear", 1)).map((color) => getColorInfo(color)),
        lightBackgroundColor: "#ffffff",
        darkBackgroundColor: "#000000",
        onChangeColor: () => {},
        onChangeId: () => {},
        onRemove: () => {},
        onCreate: () => {},
        isLast: false,
    },
};

// export const Monochrome: Story = {
//     args: {
//         colors: ["#000000", "#333333", "#666666", "#999999", "#cccccc", "#ffffff"],
//         lightBackgroundColor: "#ffffff",
//         darkBackgroundColor: "#000000",
//     },
// };

// export const Pastel: Story = {
//     args: {
//         colors: ["#ffb6c1", "#98fb98", "#87cefa", "#ffd700", "#dda0dd"],
//         lightBackgroundColor: "#ffffff",
//         darkBackgroundColor: "#000000",
//     },
// };
