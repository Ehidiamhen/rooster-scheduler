"use client";

import { Box, HStack, Text } from "@chakra-ui/react";

const MOCK_RESOURCES = [
    { id: "1", name: "Behandelingkamer1" },
    { id: "2", name: "Management" },
    { id: "3", name: "Bijzonderheden-Verlof-Cursus-BZV" },
    { id: "4", name: "Financien" },
    { id: "5", name: "Verkoever (Infusen)" },
    { id: "6", name: "Verkoever (Infusen)" },
    { id: "7", name: "Verkoever (Infusen)" },
    { id: "8", name: "Verkoever (Infusen)" },
];

const COLUMN_WIDTHS = {
    time: 120,
    first: 307,
    default: 240,
};

interface ResourceHeaderProps {
    resources?: { id: string; name: string }[];
}

export default function ResourceHeader({
    resources = MOCK_RESOURCES,
}: ResourceHeaderProps) {
    return (
        <HStack
            h="44px"
            bg="grid.headerBg"
            borderBottom="1px solid"
            borderColor="grid.border"
            gap={0}
            flexShrink={0}
            overflowX="auto"
            css={{
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
            }}
        >
            <Box
                flexShrink={0}
                w={`${COLUMN_WIDTHS.time}px`}
                h="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                px={2}
                py={4}
                bg="brand.primaryLight"
                borderRight="1px solid"
                borderColor="grid.border"
            >
                <Text
                    fontSize="14px"
                    fontWeight="medium"
                    color="brand.primary"
                    textAlign="center"
                >
                    Days
                </Text>
            </Box>

            {resources.map((resource, index) => (
                <Box
                    key={resource.id}
                    flexShrink={0}
                    w={`${index === 0 ? COLUMN_WIDTHS.first : COLUMN_WIDTHS.default}px`}
                    h="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    px={2}
                    py={4}
                    borderRight="1px solid"
                    borderColor="grid.border"
                >
                    <Text
                        fontSize="14px"
                        fontWeight="medium"
                        color="neutral.text"
                        textAlign="center"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                    >
                        {resource.name}
                    </Text>
                </Box>
            ))}
        </HStack>
    );
}
