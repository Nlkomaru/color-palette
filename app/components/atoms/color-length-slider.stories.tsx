import type { Meta, StoryObj } from "@storybook/react";
import { ColorLengthSlider } from "./color-length-slider";

const meta: Meta<typeof ColorLengthSlider> = {
    title: "Atoms/ColorLengthSlider",
    component: ColorLengthSlider,
    tags: ["autodocs"],
    args: {
        // デフォルトのargsを設定
        length: 5,
        onChangeLength: (length: number) => console.log("Length changed:", length),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    // argsはmetaで設定済みなのでここでは不要
};

export const Length10: Story = {
    args: {
        length: 10,
    },
};

export const MinLength: Story = {
    args: {
        length: 1, // Sliderのminはデフォルトで0だが、実用上1が最小値と想定
    },
};

export const MaxLength: Story = {
    args: {
        length: 12, // Sliderのmaxを12に設定しているため
    },
};
