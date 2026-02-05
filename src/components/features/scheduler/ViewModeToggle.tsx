"use client";

import { Box, HStack, Text } from "@chakra-ui/react";

type ViewMode = "live" | "planner";

interface ViewModeToggleProps {
    mode: ViewMode;
    onModeChange: (mode: ViewMode) => void;
    description?: string;
}

export function ViewModeToggle({
    mode,
    onModeChange,
    description
}: ViewModeToggleProps) {
    const isLive = mode === "live";

    const containerBg = isLive ? "#FFF5F5" : "#F0F0FF";
    const containerBorder = isLive ? "#FF6669" : "#BAB9FE";
    const activeBg = isLive ? "#FF383C" : "#5653FC";
    const inactiveTextColor = "neutral.subtle"; // #7E919F

    return (
        <Box
            bg={containerBg}
            borderWidth="1px"
            borderStyle="solid"
            borderColor={containerBorder}
            borderRadius="20px"
            overflow="hidden"
            px="3px"
            py="3px"
            w="full"
        >
            <HStack gap={4} align="center">
                <HStack
                    bg="white"
                    p="4px"
                    borderRadius="20px"
                    gap={0}
                >
                    <Box
                        as="button"
                        bg={isLive ? activeBg : "transparent"}
                        px={isLive ? "8px" : "6px"}
                        py="6px"
                        borderRadius="20px"
                        w="66px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        cursor="pointer"
                        transition="all 0.2s ease"
                        onClick={() => onModeChange("live")}
                        _hover={{ opacity: 0.9 }}
                    >
                        <Text
                            fontSize="12px"
                            fontWeight={isLive ? "bold" : "medium"}
                            color={isLive ? "white" : inactiveTextColor}
                            lineHeight="1"
                        >
                            Live
                        </Text>
                    </Box>

                    <Box
                        as="button"
                        bg={!isLive ? activeBg : "transparent"}
                        px={!isLive ? "10px" : "6px"}
                        py="6px"
                        borderRadius="20px"
                        w="66px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        cursor="pointer"
                        transition="all 0.2s ease"
                        onClick={() => onModeChange("planner")}
                        _hover={{ opacity: 0.9 }}
                    >
                        <Text
                            fontSize="12px"
                            fontWeight={!isLive ? "bold" : "medium"}
                            color={!isLive ? "white" : inactiveTextColor}
                            lineHeight="1"
                        >
                            Planner
                        </Text>
                    </Box>
                </HStack>

                {description && (
                    <Text
                        fontSize="12px"
                        fontWeight="medium"
                        color="neutral.black"
                        lineHeight="1"
                    >
                        {description}
                    </Text>
                )}
            </HStack>
        </Box>
    );
}
