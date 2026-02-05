"use client";

import { Box, HStack, VStack } from "@chakra-ui/react";
import ResourceHeader from "./ResourceHeader";
import TimeSidebar, { TIME_SLOT_HEIGHT, TIME_COLUMN_WIDTH } from "./TimeSidebar";

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
    first: 307,
    default: 240,
};

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

const TIME_SLOTS = generateTimeSlots(11, 23);

interface SchedulerGridProps {
    resources?: { id: string; name: string }[];
    timeSlots?: string[];
}

export default function SchedulerGrid({
    resources = MOCK_RESOURCES,
    timeSlots = TIME_SLOTS,
}: SchedulerGridProps) {
    return (
        <Box
            border="1px solid"
            borderColor="grid.border"
            borderRadius="12px"
            overflow="hidden"
            bg="white"
        >
            {/* Resource Header */}
            <ResourceHeader resources={resources} />

            {/* Grid Body */}
            <HStack gap={0} align="stretch">
                {/* Time Sidebar */}
                <TimeSidebar timeSlots={timeSlots} />

                {/* Grid Cells */}
                <Box flex={1} overflowX="auto">
                    <VStack gap={0}>
                        {timeSlots.map((time) => (
                            <HStack
                                key={time}
                                h={`${TIME_SLOT_HEIGHT}px`}
                                gap={0}
                                borderBottom="1px solid"
                                borderColor="grid.border"
                            >
                                {resources.map((resource, colIndex) => (
                                    <Box
                                        key={`${time}-${resource.id}`}
                                        flexShrink={0}
                                        w={`${colIndex === 0 ? COLUMN_WIDTHS.first : COLUMN_WIDTHS.default}px`}
                                        h="full"
                                        borderRight="1px solid"
                                        borderColor="grid.border"
                                        bg="white"
                                        _hover={{ bg: "gray.50" }}
                                        transition="background 0.1s"
                                    />
                                ))}
                            </HStack>
                        ))}
                    </VStack>
                </Box>
            </HStack>
        </Box>
    );
}
