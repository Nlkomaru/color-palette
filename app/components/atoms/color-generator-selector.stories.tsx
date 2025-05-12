import type { Meta, StoryObj } from "@storybook/react";
import type { LightnessMode } from "../../types/type";
import { ColorGeneratorSelector } from "./color-generator-selector";

const meta: Meta<typeof ColorGeneratorSelector> = {
    title: "Atoms/ColorGeneratorSelector",
    component: ColorGeneratorSelector,
    tags: ["autodocs"],
    args: {
        // デフォルトのargsを設定
        value: "linear",
        onChange: (value: LightnessMode) => console.log("Selected:", value),
        items: [
            { value: "constant", label: "Constant" },
            { value: "linear", label: "Linear" },
            { value: "sigmoid", label: "Sigmoid" },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    // argsはmetaで設定済みなのでここでは不要
};

export const SigmoidSelected: Story = {
    args: {
        value: "sigmoid",
    },
};

export const ConstantSelected: Story = {
    args: {
        value: "constant",
    },
};
