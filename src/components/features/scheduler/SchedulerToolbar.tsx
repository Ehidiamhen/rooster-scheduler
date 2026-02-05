"use client";

import { Box, HStack, Text, IconButton, Button } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight, FiChevronDown, FiFilter, FiPlus, FiUsers } from "react-icons/fi";
import { PiUsersThree } from "react-icons/pi";


interface SchedulerToolbarProps {
    currentDate: Date;
    onPrevDay?: () => void;
    onNextDay?: () => void;
    onToday?: () => void;
}

export default function SchedulerToolbar({
    currentDate,
    onPrevDay,
    onNextDay,
    onToday,
}: SchedulerToolbarProps) {
    const dayName = currentDate.toLocaleDateString("en-US", { weekday: "short" });
    const dayNumber = currentDate.getDate();
    const monthYear = currentDate.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });

    return (
        <HStack
            justify="space-between"
            align="center"
            py={1}
            bg="white"
        >
            <HStack gap={3}>
                <HStack
                    gap={2}
                    px={3}
                    py={1}
                    border="1px solid"
                    borderColor="grid.outline"
                    borderRadius="20px"
                    fontSize="14px"
                >
                    <Text color="neutral.grey" fontWeight="normal">{dayName}</Text>
                    <Text color="neutral.black" fontWeight="semibold">{dayNumber}</Text>
                </HStack>
                <Text fontSize="20px" fontWeight="semibold" color="neutral.black" letterSpacing="-0.4px">
                    {monthYear}
                </Text>
            </HStack>

            <HStack gap={2}>
                <IconButton
                    aria-label="Users"
                    variant="outline"
                    size="sm"
                    borderRadius="8px"
                    borderColor="grid.outline"
                    color="black"
                    w="38px"
                    h="38px"
                >
                    <PiUsersThree size={20} />
                </IconButton>

                <IconButton
                    aria-label="Filter"
                    variant="outline"
                    size="sm"
                    borderRadius="8px"
                    borderColor="grid.outline"
                    color="neutral.grey"
                    w="38px"
                    h="38px"
                >
                    <FiFilter size={20} />
                </IconButton>

                <HStack gap={0}>
                    <IconButton
                        aria-label="Previous day"
                        variant="outline"
                        size="sm"
                        borderRadius="0"
                        borderTopLeftRadius="8px"
                        borderBottomLeftRadius="8px"
                        borderColor="grid.outline"
                        color="neutral.grey"
                        h="38px"
                        onClick={onPrevDay}
                    >
                        <FiChevronLeft size={18} />
                    </IconButton>
                    <Button
                        variant="outline"
                        size="sm"
                        borderRadius="0"
                        borderColor="grid.outline"
                        color="neutral.black"
                        fontSize="14px"
                        h="38px"
                        px={3}
                        onClick={onToday}
                    >
                        Current day
                    </Button>
                    <IconButton
                        aria-label="Next day"
                        variant="outline"
                        size="sm"
                        borderRadius="0"
                        borderTopRightRadius="8px"
                        borderBottomRightRadius="8px"
                        borderColor="grid.outline"
                        color="neutral.grey"
                        h="38px"
                        onClick={onNextDay}
                    >
                        <FiChevronRight size={18} />
                    </IconButton>
                </HStack>

                <Button
                    variant="outline"
                    size="sm"
                    borderRadius="8px"
                    borderColor="grid.outline"
                    color="neutral.black"
                    fontSize="14px"
                    h="38px"
                    px={3}
                >
                    <HStack gap={2}>
                        <Box w={2} h={2} bg="brand.green" borderRadius="full" />
                        <Text>This day</Text>
                        <FiChevronDown size={18} />
                    </HStack>
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    borderRadius="8px"
                    borderColor="grid.outline"
                    color="neutral.black"
                    fontSize="14px"
                    h="38px"
                    px={3}
                >
                    Publish All
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    borderRadius="8px"
                    borderColor="grid.outline"
                    color="neutral.black"
                    fontSize="14px"
                    h="38px"
                    px={3}
                >
                    <HStack gap={2}>
                        <FiPlus size={18} />
                        <Text>Lock Shift</Text>
                    </HStack>
                </Button>
            </HStack>
        </HStack>
    );
}
