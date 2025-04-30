import type { Meta, StoryObj } from "@storybook/react";
import { ColorDisplay } from "./color-display";

const meta: Meta<typeof ColorDisplay> = {
  title: "UI/ColorDisplay",
  component: ColorDisplay,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ColorDisplay>;

export const Default: Story = {
  args: {},
};
