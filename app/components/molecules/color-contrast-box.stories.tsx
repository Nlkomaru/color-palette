import type { Meta, StoryObj } from "@storybook/react";
import { ColorContrastBox } from "./color-contrast-box"; // ← コメントアウト解除

const meta: Meta<typeof ColorContrastBox> = {
    // ← any を戻す
    title: "Molecules/ColorContrastBox",
    component: ColorContrastBox, // ← コメントアウト解除
    tags: ["autodocs"],
    // argTypes: { ... }, // コメントアウトしたまま
};

export default meta;
type Story = StoryObj<typeof ColorContrastBox>; // ← コメントアウト解除

// 基本的な表示
export const Default: Story = {
    // ← any を戻す
    // render: () => <div>テストなのだ</div>, // ← render を削除
    args: {
        // ← args のコメントアウト解除
        targetColor: {
            color: "#ff0000",
            fallback: "#ff0000",
            lightness: 0.5,
        },
        index: 0,
        lightBackgroundColor: "#ffffff",
        darkBackgroundColor: "#000000",
    },
};

// 白背景に黒文字
export const WhiteBackground: Story = {
    args: {
        targetColor: {
            color: "#000000",
            fallback: "#000000",
            lightness: 0.5,
        },
        index: 0,
        lightBackgroundColor: "#ffffff",
        darkBackgroundColor: "#000000",
    },
};

// コントラストが低い例
export const LowContrast: Story = {
    args: {
        targetColor: {
            color: "#888888",
            fallback: "#888888",
            lightness: 0.5,
        },
        index: 0,
        lightBackgroundColor: "#ffffff",
        darkBackgroundColor: "#000000",
    },
};

// アクセントカラーの例
export const AccentColor: Story = {
    args: {
        targetColor: {
            color: "#3182CE",
            fallback: "#3182CE",
            lightness: 0.5,
        },
        index: 0,
        lightBackgroundColor: "#ffffff",
        darkBackgroundColor: "#000000",
    },
};
