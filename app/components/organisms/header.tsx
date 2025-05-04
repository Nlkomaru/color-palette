import { IconButton, VStack } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { TbBrandStorybook } from "react-icons/tb";
import { Link } from "react-router";
import { css } from "../../../styled-system/css";
import { HStack } from "../../../styled-system/jsx";

export const Header = () => {
    return (
        <HStack justifyContent="space-between" maxWidth="1200px" margin="0 auto" padding="2rem">
            <Link to="/">
                <VStack alignItems="flex-start">
                    <h1 className={css({ fontSize: "1.5rem", color: "black" })}>Color Palette Generator</h1>
                    <div className={css({ fontSize: "0.8rem" })}>oklch based color palette generator</div>
                </VStack>
            </Link>
            <HStack gap="3rem">
                <Link to="/reference">Reference</Link>
                <HStack gap="2rem">
                    <Link to="https://github.com/nlkomaru/color-palette" target="_blank" rel="noopener noreferrer">
                        <IconButton aria-label="GitHub" variant="ghost" size="2xs" as={FaGithub} color="black" />
                    </Link>
                    <Link to="https://color-palette-storybook.pages.dev/" target="_blank" rel="noopener noreferrer">
                        <IconButton
                            aria-label="Storybook"
                            variant="ghost"
                            size="2xs"
                            as={TbBrandStorybook}
                            color="black"
                        />
                    </Link>
                </HStack>
            </HStack>
        </HStack>
    );
};
