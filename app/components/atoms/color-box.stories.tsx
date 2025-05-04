import type { Meta, StoryObj } from "@storybook/react";
import { getColorInfo } from "~/utils/color";
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
        color: getColorInfo("#0000FF"),
    },
    parameters: {
        nuqs: {
            searchParams: {
                color: "#0000FF",
            },
        },
    },
};

export const Blue: Story = {
    args: {
        color: getColorInfo("#0000FF"),
    },
};

export const Green: Story = {
    args: {
        color: getColorInfo("#00FF00"),
    },
};
