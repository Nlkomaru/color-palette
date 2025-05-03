import type { Meta, StoryObj } from "@storybook/react";
import { ColorDisplay } from "./color-display";

const meta: Meta<typeof ColorDisplay> = {
    title: "Molecules/ColorDisplay",
    component: ColorDisplay,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ColorDisplay>;

export const Default: Story = {
    args: {
        color: "#000000",
        id: "0",
        onChangeColor: () => {},
        onChangeId: () => {},
    },
};
