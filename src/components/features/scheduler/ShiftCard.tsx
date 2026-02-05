"use client";

import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { ShiftWithVariant } from "@/lib/mockData";

interface ShiftCardProps {
    shift: ShiftWithVariant;
    onClick?: () => void;
    height?: number;
}

const VARIANT_COLORS = {
    orange: {
        bg: "#FDF5F0",
        border: "#E35F00",
        text: "#E35F00",
    },
    green: {
        bg: "#F1FBF4",
        border: "#19C34C",
        text: "#19C34C",
    },
    yellow: {
        bg: "#F9F9F1",
        border: "#A19712",
        text: "#A19712",
    },
};

function formatTime(date: Date): string {
    return date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

export function ShiftCard({ shift, onClick, height }: ShiftCardProps) {
    const colors = VARIANT_COLORS[shift.variant];
    const timeRange = `${formatTime(shift.startTime)} - ${formatTime(shift.endTime)}`;

    return (
        <Box
            bg={colors.bg}
            borderWidth="1px"
            borderStyle="solid"
            borderColor={colors.border}
            borderRadius="8px"
            px={2}
            py={2}
            cursor="pointer"
            onClick={onClick}
            h={height ? `${height}px` : "auto"}
            overflow="hidden"
            transition="all 0.15s ease"
            _hover={{
                boxShadow: "sm",
                transform: "scale(1.01)",
            }}
        >
            <Box
                display="flex"
                flexWrap="wrap"
                gap={2}
                alignItems="flex-start"
                justifyContent="flex-start"
            >
                <Box
                    bg="white"
                    borderRadius="full"
                    w="28px"
                    h="28px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                >
                    <Text
                        fontSize="12px"
                        fontWeight="semibold"
                        color="neutral.subtle"
                    >
                        {shift.employeeInitials}
                    </Text>
                </Box>
                <VStack align="start" gap={1} minW={0} overflow="hidden">
                    <Text
                        fontSize="14px"
                        fontWeight="semibold"
                        color="neutral.black"
                        lineHeight="1.2"
                        wordBreak="break-word"
                        css={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {shift.title}
                    </Text>
                    <Text
                        fontSize="12px"
                        fontWeight="medium"
                        color="neutral.grey"
                        lineHeight="1"
                        whiteSpace="nowrap"
                    >
                        {timeRange}
                    </Text>
                    <Text
                        fontSize="12px"
                        fontWeight="medium"
                        color={colors.text}
                        lineHeight="1"
                        wordBreak="break-word"
                    >
                        {shift.assigneeName}
                    </Text>
                </VStack>
            </Box>
        </Box>
    );
}

export default ShiftCard;
