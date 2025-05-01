import "../app/app.css";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import type { Preview } from "@storybook/react";
import { withScreenshot } from "storycap";

export const decorators = [withScreenshot];
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
            <ChakraProvider value={defaultSystem}>
                <Story />
            </ChakraProvider>
        ),
    ],
};

export default preview;
