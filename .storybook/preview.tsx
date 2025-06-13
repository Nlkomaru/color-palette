import "../app/app.css";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import { Provider as JotaiProvider } from "jotai";
import { Provider } from "../app/components/ui/provider";

export const parameters = {
    screenshot: {
        provider: {
            name: "storycap",
        },
    },
};
const preview: Preview = {
    parameters: {
        options: {
            storySort: {
                order: ["Organisms", "Molecules", "Atoms"],
            },
        },
        docs: {
            theme: themes.light,
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        a11y: {
            test: "todo",
            element: "body",
            config: {
                rules: [
                    {
                        id: "autocomplete-valid",
                        selector: '*:not([autocomplete="nope"])',
                    },
                    {
                        id: "image-alt",
                        enabled: false,
                    },
                ],
            },
            options: {},
        },
    },
    decorators: [
        (Story) => (
            <Provider>
                <JotaiProvider>
                    <Story />
                </JotaiProvider>
            </Provider>
        ),
        withThemeByClassName({
            defaultTheme: "light",
            themes: { light: "", dark: "dark" },
        }),
    ],
};

export default preview;
