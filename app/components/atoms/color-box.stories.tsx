import type { Meta, StoryObj } from "@storybook/react";
import { ColorBox } from "./color-box";

const meta = {
    title: "Atoms/ColorBox",
    component: ColorBox,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof ColorBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        color: "#FF0000",
    },
};

export const Blue: Story = {
    args: {
        color: "#0000FF",
    },
};

export const Green: Story = {
    args: {
        color: "#00FF00",
    },
};
