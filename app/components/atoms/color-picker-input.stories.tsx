import type { Meta, StoryObj } from "@storybook/react";
import { ColorPickerInput } from "./color-picker-input";

const meta = {
    title: "Atoms/ColorPickerInput",
    component: ColorPickerInput,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof ColorPickerInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        color: "#FF0000",
    },
};
