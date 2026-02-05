"use client";

import { useState } from "react";
import { Box, HStack, VStack, Text, IconButton, Input, Separator } from "@chakra-ui/react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { MOCK_EMPLOYEES, Employee } from "@/lib/mockData";

interface RosterPanelProps {
    isOpen: boolean;
    onToggle: () => void;
}

type TabType = "all" | "available" | "on_leave";

function EmployeeCard({ employee }: { employee: Employee }) {
    return (
        <Box
            p="10px"
            borderRadius="12px"
            border="1px solid"
            borderColor="#d9e5f2"
            bg="white"
            _hover={{ borderColor: "brand.primary" }}
            cursor="grab"
            transition="all 0.15s ease"
        >
            <HStack gap="8px" align="start">
                {/* Left section: Avatar + Info */}
                <HStack gap="10px" flex={1} align="start">
                    {/* Avatar */}
                    <Box
                        bg="#f3f5f7"
                        color="#4e5d69"
                        w="40px"
                        h="40px"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="12px"
                        fontWeight="semibold"
                        flexShrink={0}
                    >
                        {employee.initials}
                    </Box>

                    {/* Name and badges */}
                    <VStack align="start" gap="10px" flex={1}>
                        <Text fontSize="14px" fontWeight="semibold" color="#242424" lineHeight="1">
                            {employee.name}
                        </Text>

                        <VStack align="start" gap="6px">
                            {/* Hours badges */}
                            <HStack gap="4px">
                                <Box
                                    bg="#f0f5fa"
                                    px="6px"
                                    py="4px"
                                    borderRadius="6px"
                                >
                                    <Text fontSize="10px" fontWeight="medium" color="#4e5d69" lineHeight="1">
                                        {employee.totalHours}
                                    </Text>
                                </Box>
                                <Box
                                    bg="#f0f5fa"
                                    px="6px"
                                    py="4px"
                                    borderRadius="6px"
                                >
                                    <Text fontSize="10px" fontWeight="medium" color="#4e5d69" lineHeight="1">
                                        {employee.weeklyHours}
                                    </Text>
                                </Box>
                            </HStack>

                            {/* Leave dates badge */}
                            {employee.leaveDates && (
                                <Box
                                    bg="#feecec"
                                    px="6px"
                                    py="6px"
                                    borderRadius="4px"
                                >
                                    <Text fontSize="10px" fontWeight="medium" color="#ef2e2e" lineHeight="1" textAlign="center">
                                        {employee.leaveDates}
                                    </Text>
                                </Box>
                            )}
                        </VStack>
                    </VStack>
                </HStack>

                {/* Right section: Status + Days */}
                <VStack align="end" gap="8px" w="106px">
                    {/* On leave status badge */}
                    {employee.status === "on_leave" && (
                        <HStack
                            bg="#feecec"
                            px="6px"
                            py="4px"
                            borderRadius="16px"
                            gap="4px"
                        >
                            <Box w="3px" h="3px" borderRadius="full" bg="#ef2e2e" />
                            <Text fontSize="10px" fontWeight="medium" color="#ef2e2e" lineHeight="1">
                                On leave
                            </Text>
                        </HStack>
                    )}

                    {/* Weekday availability badges */}
                    <HStack gap="4px" w="full">
                        {employee.availableDays.map((d) => (
                            <Box
                                key={d.day}
                                w="18px"
                                h="18px"
                                borderRadius="16px"
                                bg={d.available ? "#ebffef" : "#ffefe7"}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text
                                    fontSize="10px"
                                    fontWeight="medium"
                                    color={d.available ? "#37a55c" : "#f55300"}
                                    lineHeight="1"
                                >
                                    {d.day}
                                </Text>
                            </Box>
                        ))}
                    </HStack>
                </VStack>
            </HStack>
        </Box>
    );
}

export function RosterPanel({ isOpen, onToggle }: RosterPanelProps) {
    const [activeTab, setActiveTab] = useState<TabType>("all");
    const [searchQuery, setSearchQuery] = useState("");

    const tabCounts = {
        all: MOCK_EMPLOYEES.length,
        available: MOCK_EMPLOYEES.filter((e) => e.status === "available").length,
        on_leave: MOCK_EMPLOYEES.filter((e) => e.status === "on_leave").length,
    };

    const filteredEmployees = MOCK_EMPLOYEES.filter((employee) => {
        const matchesTab =
            activeTab === "all" ||
            (activeTab === "available" && employee.status === "available") ||
            (activeTab === "on_leave" && employee.status === "on_leave");
        const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    if (!isOpen) {
        return null;
    }

    return (
        <Box
            w="350px"
            h="full"
            bg="white"
            flexShrink={0}
            p="24px"
            border="2px solid"
            borderColor="#f3f4f6"
            borderRadius="16px"
            display="flex"
            flexDirection="column"
            gap="20px"
            overflowY="auto"
        >
            {/* Header */}
            <HStack
                justify="space-between"
                align="center"
                pb="16px"
                borderBottom="1px solid"
                borderColor="#f3f4f6"
            >
                <HStack gap="12px" align="center">
                    <Box color="#4e5d69" cursor="pointer" onClick={onToggle} _hover={{ bg: "#f3f4f6", color: "#141b34" }} p={2} borderRadius="6px" >
                        <BsArrowsAngleExpand size={20} />
                    </Box>
                    {/* <Separator orientation="vertical" color="black" /> */}
                    {/* <Box w="0" h="24px" borderLeft="1px solid" borderColor="#f3f4f6" transform="rotate(90deg)" /> */}
                    <Text fontSize="18px" fontWeight="bold" color="#141b34" letterSpacing="-0.36px" borderLeft="1px solid" borderColor="gray.400" pl="12px">
                        Roster
                    </Text>
                </HStack>
            </HStack>

            {/* Search and filter */}
            <HStack gap="8px">
                <Box position="relative" flex={1}>
                    <Box
                        border="1px solid"
                        borderColor="#d9e5f2"
                        borderRadius="8px"
                        px="12px"
                        py="4px"
                        display="flex"
                        alignItems="center"
                        gap="8px"
                    >
                        <FiSearch size={20} color="#7e919f" />
                        <Input
                            placeholder="Search"
                            variant="flushed"
                            size="sm"
                            fontSize="14px"
                            fontWeight="medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            _placeholder={{ color: "#7e919f" }}
                            color="black"
                        />
                    </Box>
                </Box>
                <Box
                    border="1px solid"
                    borderColor="#d9e5f2"
                    borderRadius="8px"
                    p="12px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    _hover={{ bg: "gray.50" }}
                >
                    <FiFilter size={20} color="#7e919f" />
                </Box>
            </HStack>

            {/* Horizontal Tabs */}
            <Box borderBottom="1px solid" borderColor="#e9eaeb">
                <HStack gap="12px">
                    {([
                        { key: "all", label: "All" },
                        { key: "available", label: "Available" },
                        { key: "on_leave", label: "On Leave" },
                    ] as { key: TabType; label: string }[]).map((tab) => (
                        <Box
                            key={tab.key}
                            pb="10px"
                            px="4px"
                            borderBottom="2px solid"
                            borderColor={activeTab === tab.key ? "#5653fc" : "transparent"}
                            cursor="pointer"
                            onClick={() => setActiveTab(tab.key)}
                            transition="all 0.15s ease"
                        >
                            <HStack gap="8px">
                                <Text
                                    fontSize="14px"
                                    fontWeight={activeTab === tab.key ? "semibold" : "medium"}
                                    color={activeTab === tab.key ? "#5653fc" : "#717680"}
                                    lineHeight="24px"
                                >
                                    {tab.label}
                                </Text>
                                <Box
                                    bg="#f7fafc"
                                    border="1px solid"
                                    borderColor="#d9e5f2"
                                    borderRadius="16px"
                                    px="8px"
                                    py="2px"
                                >
                                    <Text
                                        fontSize="14px"
                                        fontWeight="medium"
                                        color={activeTab === tab.key ? "#5653fc" : "#414651"}
                                        lineHeight="24px"
                                    >
                                        {tabCounts[tab.key]}
                                    </Text>
                                </Box>
                            </HStack>
                        </Box>
                    ))}
                </HStack>
            </Box>

            {/* Employee list */}
            <VStack gap="16px" align="stretch" flex={1} overflowY="auto">
                {filteredEmployees.map((employee) => (
                    <EmployeeCard key={employee.id} employee={employee} />
                ))}
                {filteredEmployees.length === 0 && (
                    <Text fontSize="14px" color="#717680" textAlign="center" py={4}>
                        No employees found
                    </Text>
                )}
            </VStack>
        </Box>
    );
}

export default RosterPanel;
