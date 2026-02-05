"use client";

import { useState, useMemo } from "react";
import { Box, HStack, VStack, Text } from "@chakra-ui/react";
import ResourceHeader from "./ResourceHeader";
import TimeSidebar, { TIME_SLOT_HEIGHT, TIME_COLUMN_WIDTH } from "./TimeSidebar";
import { ShiftCard } from "./ShiftCard";
import { ShiftDetailsModal } from "./ShiftDetailsModal";
import { SeeAllModal } from "./SeeAllModal";
import { ShiftWithVariant, LIVE_SHIFTS, PLANNER_SHIFTS } from "@/lib/mockData";

const MOCK_RESOURCES = [
    { id: "1", name: "Behandelingkamer1" },
    { id: "2", name: "Management" },
    { id: "3", name: "Bijzonderheden-Verlof-Cursus-BZV" },
    { id: "4", name: "Financien" },
];

const COLUMN_WIDTHS = {
    first: 307,
    default: 240,
};

const MAX_VISIBLE_SHIFTS = 2;

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
const GRID_START_HOUR = 11;

interface SchedulerGridProps {
    resources?: { id: string; name: string }[];
    timeSlots?: string[];
    viewMode?: "live" | "planner";
}

interface ShiftPosition {
    top: number;
    height: number;
    left: number;
    width: number;
    shift: ShiftWithVariant;
    isHidden?: boolean;
}

interface SeeAllButtonPosition {
    top: number;
    height: number;
    left: number;
    width: number;
    groupId: string;
    allShifts: ShiftWithVariant[];
    extraCount: number;
}

function shiftsOverlap(a: ShiftWithVariant, b: ShiftWithVariant): boolean {
    return a.startTime < b.endTime && b.startTime < a.endTime;
}

function groupOverlappingShifts(shifts: ShiftWithVariant[]): ShiftWithVariant[][] {
    if (shifts.length === 0) return [];

    const groups: ShiftWithVariant[][] = [];
    const usedIndices = new Set<number>();

    for (let i = 0; i < shifts.length; i++) {
        if (usedIndices.has(i)) continue;

        const group: ShiftWithVariant[] = [shifts[i]];
        usedIndices.add(i);

        let foundNew = true;
        while (foundNew) {
            foundNew = false;
            for (let j = 0; j < shifts.length; j++) {
                if (usedIndices.has(j)) continue;
                const overlapsWithGroup = group.some(s => shiftsOverlap(s, shifts[j]));
                if (overlapsWithGroup) {
                    group.push(shifts[j]);
                    usedIndices.add(j);
                    foundNew = true;
                }
            }
        }
        groups.push(group);
    }

    return groups;
}

interface PositionResult {
    shiftPositions: ShiftPosition[];
    seeAllButtons: SeeAllButtonPosition[];
}

function getShiftPositions(
    shifts: ShiftWithVariant[],
    resources: { id: string; name: string }[]
): PositionResult {
    const shiftPositions: ShiftPosition[] = [];
    const seeAllButtons: SeeAllButtonPosition[] = [];

    const shiftsByResource = new Map<string, ShiftWithVariant[]>();
    for (const shift of shifts) {
        if (!shiftsByResource.has(shift.resourceId)) {
            shiftsByResource.set(shift.resourceId, []);
        }
        shiftsByResource.get(shift.resourceId)!.push(shift);
    }

    for (const [resourceId, resourceShifts] of shiftsByResource) {
        const resourceIndex = resources.findIndex(r => r.id === resourceId);
        if (resourceIndex === -1) continue;

        let leftOffset = TIME_COLUMN_WIDTH;
        for (let i = 0; i < resourceIndex; i++) {
            leftOffset += i === 0 ? COLUMN_WIDTHS.first : COLUMN_WIDTHS.default;
        }
        const columnWidth = resourceIndex === 0 ? COLUMN_WIDTHS.first : COLUMN_WIDTHS.default;

        const overlapGroups = groupOverlappingShifts(resourceShifts);

        for (const group of overlapGroups) {
            group.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

            const hasExtra = group.length > MAX_VISIBLE_SHIFTS;
            const visibleCount = hasExtra ? MAX_VISIBLE_SHIFTS : group.length;
            // Reserve space for "See all" button if needed
            const totalSlots = hasExtra ? visibleCount + 1 : visibleCount;
            const slotWidth = (columnWidth - 8) / totalSlots;

            // Calculate group bounds for "See all" button positioning
            let groupMinTop = Infinity;
            let groupMaxBottom = 0;

            group.forEach((shift, indexInGroup) => {
                const startHour = shift.startTime.getHours();
                const startMinute = shift.startTime.getMinutes();
                const endHour = shift.endTime.getHours();
                const endMinute = shift.endTime.getMinutes();

                const startOffsetHours = (startHour - GRID_START_HOUR) + (startMinute / 60);
                const endOffsetHours = (endHour - GRID_START_HOUR) + (endMinute / 60);

                const pxPerHour = TIME_SLOT_HEIGHT * 2;
                const top = startOffsetHours * pxPerHour;
                const height = Math.max((endOffsetHours - startOffsetHours) * pxPerHour, 60);

                groupMinTop = Math.min(groupMinTop, top);
                groupMaxBottom = Math.max(groupMaxBottom, top + height);

                // Only show first MAX_VISIBLE_SHIFTS shifts
                if (indexInGroup < visibleCount) {
                    const left = leftOffset + 4 + (indexInGroup * slotWidth);
                    const width = slotWidth - 2;

                    shiftPositions.push({ top, height, left, width, shift, isHidden: false });
                }
            });

            // Add "See all" button if there are extra shifts
            if (hasExtra) {
                const extraCount = group.length - MAX_VISIBLE_SHIFTS;
                const buttonLeft = leftOffset + 4 + (visibleCount * slotWidth);
                const buttonWidth = slotWidth - 2;
                const buttonHeight = groupMaxBottom - groupMinTop;

                seeAllButtons.push({
                    top: groupMinTop,
                    height: buttonHeight,
                    left: buttonLeft,
                    width: buttonWidth,
                    groupId: `${resourceId}-${group[0].id}`,
                    allShifts: group,
                    extraCount,
                });
            }
        }
    }

    return { shiftPositions, seeAllButtons };
}

export default function SchedulerGrid({
    resources = MOCK_RESOURCES,
    timeSlots = TIME_SLOTS,
    viewMode = "live",
}: SchedulerGridProps) {
    const [selectedShift, setSelectedShift] = useState<ShiftWithVariant | null>(null);
    const [seeAllShifts, setSeeAllShifts] = useState<ShiftWithVariant[] | null>(null);

    const shifts = viewMode === "live" ? LIVE_SHIFTS : PLANNER_SHIFTS;

    const { shiftPositions, seeAllButtons } = useMemo(
        () => getShiftPositions(shifts, resources),
        [shifts, resources]
    );

    const handleSeeAllClick = (allShifts: ShiftWithVariant[]) => {
        setSeeAllShifts(allShifts);
    };

    const handleShiftFromSeeAll = (shift: ShiftWithVariant) => {
        setSeeAllShifts(null);
        setSelectedShift(shift);
    };

    return (
        <>
            <Box
                border="1px solid"
                borderColor="grid.border"
                borderTopRadius="12px"
                overflow="hidden"
                bg="white"
                display="flex"
                flexDirection="column"
                h="full"
            >
                <Box position="sticky" top={0} zIndex={20} bg="white">
                    <ResourceHeader resources={resources} />
                </Box>

                <Box flex={1} overflowY="auto" position="relative">
                    <HStack gap={0} align="stretch">
                        <Box position="sticky" left={0} zIndex={999} bg="white">
                            <TimeSidebar timeSlots={timeSlots} />
                        </Box>

                        <Box flex={1} position="relative">
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
                                            />
                                        ))}
                                    </HStack>
                                ))}
                            </VStack>

                            <Box position="absolute" top={0} left={0} right={0} bottom={0} pointerEvents="none">
                                {/* Shift Cards */}
                                {shiftPositions.map((pos) => (
                                    <Box
                                        key={pos.shift.id}
                                        position="absolute"
                                        top={`${pos.top}px`}
                                        left={`${pos.left - TIME_COLUMN_WIDTH}px`}
                                        w={`${pos.width}px`}
                                        h={`${pos.height - 4}px`}
                                        pointerEvents="auto"
                                        zIndex={10}
                                    >
                                        <ShiftCard
                                            shift={pos.shift}
                                            onClick={() => setSelectedShift(pos.shift)}
                                            height={pos.height - 4}
                                        />
                                    </Box>
                                ))}


                                {seeAllButtons.map((btn) => {
                                    // Center the 35px button within the overlap group's height
                                    const buttonHeight = 80;
                                    const centeredTop = btn.top + (btn.height - buttonHeight) / 2;

                                    return (
                                        <Box
                                            key={btn.groupId}
                                            position="absolute"
                                            top={`${centeredTop}px`}
                                            left={`${btn.left - TIME_COLUMN_WIDTH}px`}
                                            w={`${btn.width}px`}
                                            h={`${buttonHeight}px`}
                                            pointerEvents="auto"
                                            zIndex={10}
                                            bg="neutral.light"
                                            borderRadius="6px"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            cursor="pointer"
                                            _hover={{ bg: "gray.200" }}
                                            onClick={() => handleSeeAllClick(btn.allShifts)}
                                        >
                                            <Text
                                                fontSize="14px"
                                                fontWeight="semibold"
                                                color="neutral.grey"
                                                textAlign="center"
                                            >
                                                See all
                                            </Text>
                                        </Box>
                                    );
                                })}

                            </Box>
                        </Box>
                    </HStack>
                </Box>
            </Box>

            <ShiftDetailsModal
                isOpen={!!selectedShift}
                onClose={() => setSelectedShift(null)}
                shift={selectedShift}
            />

            <SeeAllModal
                isOpen={!!seeAllShifts}
                onClose={() => setSeeAllShifts(null)}
                shifts={seeAllShifts || []}
                onShiftClick={handleShiftFromSeeAll}
            />
        </>
    );
}


