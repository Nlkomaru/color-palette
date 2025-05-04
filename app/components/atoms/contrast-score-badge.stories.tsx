import type { Meta, StoryObj } from "@storybook/react";
import { ContrastScoreBadge } from "./contrast-score-badge";

// メタデータの定義
const meta = {
    title: "Atoms/ContrastScoreBadge",
    component: ContrastScoreBadge,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof ContrastScoreBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的なストーリー
export const Primary: Story = {
    args: {
        targetColor: "#FF0000",
        baseColor: "#FFFFFF",
    },
};

// 暗い背景色のストーリー
export const DarkBackground: Story = {
    args: {
        targetColor: "#FFFFFF",
        baseColor: "#000000",
    },
};

// パステルカラーのストーリー
export const PastelColors: Story = {
    args: {
        targetColor: "#FFB6C1",
        baseColor: "#E6E6FA",
    },
};

// oklch
export const Oklch: Story = {
    args: {
        targetColor: "oklch(0.5 0.2 270)",
        baseColor: "#FFFFFF",
    },
};

// rgb
export const Rgb: Story = {
    args: {
        targetColor: "rgb(255, 0, 0)",
        baseColor: "#FFFFFF",
    },
};

// hsl
export const Hsl: Story = {
    args: {
        targetColor: "hsl(0, 100%, 50%)",
        baseColor: "#FFFFFF",
    },
};
