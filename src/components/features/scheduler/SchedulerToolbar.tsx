"use client";

import { Box, HStack, Text, IconButton, Button } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight, FiChevronDown, FiFilter, FiPlus, FiCheck } from "react-icons/fi";
import { LuLock } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
import { Menu, Portal } from "@chakra-ui/react";
import { useScheduler } from "@/context/SchedulerContext";

interface SchedulerToolbarProps {
    currentDate: Date;
    onPrevDay?: () => void;
    onNextDay?: () => void;
    onToday?: () => void;
}

type DateRange = "deze_dag" | "deze_week" | "maand" | "custom";

export default function SchedulerToolbar({
    currentDate,
    onPrevDay,
    onNextDay,
    onToday,
}: SchedulerToolbarProps) {
    const { isLive } = useScheduler();
    const dayName = currentDate.toLocaleDateString("en-US", { weekday: "short" });
    const dayNumber = currentDate.getDate();
    const monthYear = currentDate.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });

    const handleDateRangeSelect = (range: DateRange) => {
        if (range === "deze_dag") {
            onToday?.();
        }
    };

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

                <Menu.Root>
                    <Menu.Trigger asChild>
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
                    </Menu.Trigger>
                    <Portal>
                        <Menu.Positioner>
                            <Menu.Content
                                bg="white"
                                borderRadius="12px"
                                border="1px solid"
                                borderColor="grid.outline"
                                shadow="0px 4px 16px 0px rgba(100,100,100,0.1)"
                                p={2}
                                minW="160px"
                            >
                                <Menu.Item
                                    value="deze_dag"
                                    onClick={() => handleDateRangeSelect("deze_dag")}
                                    borderRadius="8px"
                                    px={2}
                                    py={2}
                                    _hover={{ bg: "gray.50" }}
                                >
                                    <HStack justify="space-between" w="full">
                                        <Text fontSize="14px" fontWeight="medium" color="neutral.black">Deze dag</Text>
                                        <FiCheck size={16} color="#19C34C" />
                                    </HStack>
                                </Menu.Item>
                                <Menu.Item
                                    value="deze_week"
                                    onClick={() => handleDateRangeSelect("deze_week")}
                                    borderRadius="8px"
                                    px={2}
                                    py={2}
                                    _hover={{ bg: "gray.50" }}
                                >
                                    <Text fontSize="14px" fontWeight="medium" color="neutral.grey">Deze week</Text>
                                </Menu.Item>
                                <Menu.Item
                                    value="maand"
                                    onClick={() => handleDateRangeSelect("maand")}
                                    borderRadius="8px"
                                    px={2}
                                    py={2}
                                    _hover={{ bg: "gray.50" }}
                                >
                                    <Text fontSize="14px" fontWeight="medium" color="neutral.grey">Maand</Text>
                                </Menu.Item>
                                <Menu.Item
                                    value="custom"
                                    onClick={() => handleDateRangeSelect("custom")}
                                    borderRadius="8px"
                                    px={2}
                                    py={2}
                                    _hover={{ bg: "gray.50" }}
                                >
                                    <HStack gap={2}>
                                        <Text fontSize="14px" fontWeight="medium" color="neutral.grey">Custom</Text>
                                        <FiPlus size={14} color="#4E5D69" />
                                    </HStack>
                                </Menu.Item>
                            </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                </Menu.Root>

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
                        {isLive ? <FiPlus size={18} /> : <LuLock size={18} />}
                        <Text>Lock Shift</Text>
                    </HStack>
                </Button>
            </HStack>
        </HStack>
    );
}
