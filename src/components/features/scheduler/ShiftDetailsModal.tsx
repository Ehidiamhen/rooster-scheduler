"use client";

import { Box, HStack, Text, VStack, IconButton } from "@chakra-ui/react";
import { FiX } from "react-icons/fi";
import { ShiftWithVariant } from "@/lib/mockData";
import { ShiftCard } from "./ShiftCard";
import { useScheduler } from "@/context/SchedulerContext";

interface ShiftDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    shift: ShiftWithVariant | null;
}

export function ShiftDetailsModal({
    isOpen,
    onClose,
    shift,
}: ShiftDetailsModalProps) {
    if (!isOpen || !shift) return null;

    const { currentDate } = useScheduler();
    const dayLabel = currentDate.toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const timeLabel = shift.startTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="blackAlpha.300"
            zIndex={1000}
            display="flex"
            alignItems="center"
            justifyContent="center"
            pt="100px"
            onClick={onClose}
        >
            <Box
                bg="white"
                borderRadius="12px"
                shadow="0px 0px 16px 2px rgba(78,93,105,0.16)"
                w="350px"
                maxH="500px"
                overflow="hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <HStack
                    justify="space-between"
                    align="center"
                    p={4}
                    borderBottomWidth="0.8px"
                    borderColor="grid.outline"
                >
                    <Text
                        fontSize="18px"
                        fontWeight="semibold"
                        color="neutral.black"
                        lineHeight="24px"
                    >
                        {dayLabel}
                    </Text>
                    <IconButton
                        aria-label="Close"
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        color="neutral.grey"
                    >
                        <FiX size={18} />
                    </IconButton>
                </HStack>

                <VStack align="stretch" gap={4} p={4}>
                    <Text
                        fontSize="16px"
                        fontWeight="semibold"
                        color="neutral.black"
                        lineHeight="1.2"
                    >
                        {timeLabel}
                    </Text>

                    <VStack align="stretch" gap={2}>
                        <ShiftCard shift={shift} />
                    </VStack>
                </VStack>
            </Box>
        </Box>
    );
}

export default ShiftDetailsModal;
