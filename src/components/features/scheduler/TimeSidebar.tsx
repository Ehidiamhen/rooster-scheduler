"use client";

import { Box, VStack, Text } from "@chakra-ui/react";

// Generate time slots from startHour to endHour in 30-minute intervals
function generateTimeSlots(startHour: number, endHour: number): string[] {
    const slots: string[] = [];
    for (let hour = startHour; hour <= endHour; hour++) {
        slots.push(`${hour.toString().padStart(2, "0")}:00`);
        if (hour < endHour) {
            slots.push(`${hour.toString().padStart(2, "0")}:30`);
        }
    }
    return slots;
}

const DEFAULT_TIME_SLOTS = generateTimeSlots(11, 14); // 11:00 to 14:00

export const TIME_SLOT_HEIGHT = 120; // px per slot
export const TIME_COLUMN_WIDTH = 120; // px

interface TimeSidebarProps {
    timeSlots?: string[];
}

export default function TimeSidebar({
    timeSlots = DEFAULT_TIME_SLOTS,
}: TimeSidebarProps) {
    return (
        <VStack
            w={`${TIME_COLUMN_WIDTH}px`}
            flexShrink={0}
            gap={0}
            borderRight="1px solid"
            borderColor="grid.border"
        >
            {timeSlots.map((time, index) => (
                <Box
                    key={time}
                    w="full"
                    h={`${TIME_SLOT_HEIGHT}px`}
                    px={4}
                    py={2}
                    borderBottom="1px solid"
                    borderColor="grid.border"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                >
                    <Text
                        fontSize="14px"
                        fontWeight="medium"
                        color="neutral.grey"
                        lineHeight="none"
                    >
                        {time}
                    </Text>
                </Box>
            ))}
        </VStack>
    );
}
