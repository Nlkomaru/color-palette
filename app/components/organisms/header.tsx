import { IconButton, VStack } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { css } from "../../../styled-system/css";
import { HStack } from "../../../styled-system/jsx";
import { Link } from "react-router";

export const Header = () => {
    return (
        <HStack justifyContent="space-between" maxWidth="1200px" margin="0 auto" padding="2rem">
            <Link to="/">
                <VStack alignItems="flex-start">
                    <h1 className={css({ fontSize: "1.5rem", color: "black" })}>Color Palette Generator</h1>
                    <div className={css({ fontSize: "0.8rem" })}>oklch based color palette generator</div>
                </VStack>
            </Link>
            <HStack gap="4rem">
                <Link to="/reference">Reference</Link>
                <Link to="https://github.com/nlkomaru/color-palette" target="_blank" rel="noopener noreferrer">
                    <IconButton aria-label="GitHub" variant="ghost" size="2xs" as={FaGithub} />
                </Link>
            </HStack>
        </HStack>
    );
};
