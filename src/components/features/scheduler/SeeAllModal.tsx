"use client";

import { Box, HStack, VStack, Text, IconButton } from "@chakra-ui/react";
import { FiX } from "react-icons/fi";
import { ShiftWithVariant } from "@/lib/mockData";
import { ShiftCard } from "./ShiftCard";
import { useScheduler } from "@/context/SchedulerContext";

interface SeeAllModalProps {
    isOpen: boolean;
    onClose: () => void;
    shifts: ShiftWithVariant[];
    onShiftClick?: (shift: ShiftWithVariant) => void;
}

// Group shifts by their start hour
function groupShiftsByHour(shifts: ShiftWithVariant[]): Map<string, ShiftWithVariant[]> {
    const groups = new Map<string, ShiftWithVariant[]>();

    const sortedShifts = [...shifts].sort((a, b) =>
        a.startTime.getTime() - b.startTime.getTime()
    );

    for (const shift of sortedShifts) {
        const hour = shift.startTime.getHours();
        const minute = shift.startTime.getMinutes();
        // Round to nearest 30 min slot
        const slotKey = minute < 30
            ? `${hour.toString().padStart(2, "0")}:00`
            : `${hour.toString().padStart(2, "0")}:30`;

        if (!groups.has(slotKey)) {
            groups.set(slotKey, []);
        }
        groups.get(slotKey)!.push(shift);
    }

    return groups;
}

export function SeeAllModal({
    isOpen,
    onClose,
    shifts,
    onShiftClick,
}: SeeAllModalProps) {
    const { currentDate } = useScheduler();

    if (!isOpen || shifts.length === 0) return null;

    const dayLabel = currentDate.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const shiftsByHour = groupShiftsByHour(shifts);

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
            onClick={onClose}
        >
            <Box
                bg="white"
                borderRadius="12px"
                shadow="0px 0px 16px 2px rgba(78,93,105,0.16)"
                w="420px"
                maxH="600px"
                overflow="hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <HStack justify="space-between" px={5} py={4} borderBottom="1px solid" borderColor="gray.100">
                    <Text fontSize="18px" fontWeight="bold" color="neutral.black">
                        {dayLabel}
                    </Text>
                    <IconButton
                        aria-label="Close modal"
                        variant="ghost"
                        size="sm"
                        color="neutral.grey"
                        onClick={onClose}
                        _hover={{ bg: "gray.100" }}
                    >
                        <FiX size={20} />
                    </IconButton>
                </HStack>

                {/* Content */}
                <Box px={5} py={4} overflowY="auto" maxH="520px">
                    <VStack gap={6} align="stretch">
                        {Array.from(shiftsByHour.entries()).map(([timeSlot, slotShifts]) => (
                            <VStack key={timeSlot} gap={3} align="stretch">
                                {/* Time label */}
                                <Text fontSize="16px" fontWeight="semibold" color="neutral.black">
                                    {timeSlot}
                                </Text>

                                {/* Shifts for this time slot */}
                                <VStack gap={2} align="stretch">
                                    {slotShifts.map((shift) => (
                                        <Box
                                            key={shift.id}
                                            cursor="pointer"
                                            onClick={() => onShiftClick?.(shift)}
                                        >
                                            <ShiftCard
                                                shift={shift}
                                                height={64}
                                                onClick={() => onShiftClick?.(shift)}
                                            />
                                        </Box>
                                    ))}
                                </VStack>
                            </VStack>
                        ))}
                    </VStack>
                </Box>
            </Box>
        </Box>
    );
}
