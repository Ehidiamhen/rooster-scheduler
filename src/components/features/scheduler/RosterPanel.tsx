"use client";

import { useState } from "react";
import { Box, HStack, VStack, Text, IconButton, Input } from "@chakra-ui/react";
import { FiSearch, FiFilter, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { MOCK_EMPLOYEES, Employee } from "@/lib/mockData";

interface RosterPanelProps {
    isOpen: boolean;
    onToggle: () => void;
}

type TabType = "all" | "available" | "on_leave";

function EmployeeCard({ employee }: { employee: Employee }) {
    return (
        <Box
            p={3}
            borderRadius="12px"
            border="1px solid"
            borderColor="grid.outline"
            bg="white"
            _hover={{ borderColor: "brand.primary" }}
            cursor="grab"
            transition="all 0.15s ease"
        >
            <HStack justify="space-between" mb={2}>
                <HStack gap={2}>
                    <Box
                        bg="brand.primary"
                        color="white"
                        w="32px"
                        h="32px"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="12px"
                        fontWeight="semibold"
                    >
                        {employee.initials}
                    </Box>
                    <VStack align="start" gap={0}>
                        <Text fontSize="14px" fontWeight="semibold" color="neutral.black">
                            {employee.name}
                        </Text>
                        {employee.leaveDates && (
                            <Text fontSize="11px" color="#E35F00">
                                {employee.leaveDates}
                            </Text>
                        )}
                    </VStack>
                </HStack>
                <VStack align="end" gap={0}>
                    <Text fontSize="12px" fontWeight="medium" color="neutral.black">
                        {employee.totalHours}
                    </Text>
                    <Text fontSize="11px" color="neutral.grey">
                        {employee.weeklyHours}
                    </Text>
                </VStack>
            </HStack>
            {/* Status badge */}
            {employee.status === "on_leave" && (
                <HStack justify="space-between" align="center" mt={1}>
                    <HStack gap={1}>
                        {employee.availableDays.map((d) => (
                            <Box
                                key={d.day}
                                px={1.5}
                                py={0.5}
                                borderRadius="4px"
                                bg={d.available ? "brand.greenLight" : "neutral.light"}
                                fontSize="10px"
                                fontWeight="medium"
                                color={d.available ? "brand.green" : "neutral.grey"}
                            >
                                {d.day}
                            </Box>
                        ))}
                    </HStack>
                    <Text fontSize="11px" color="#E35F00" fontWeight="medium">
                        • On leave
                    </Text>
                </HStack>
            )}
            {employee.status !== "on_leave" && (
                <HStack gap={1}>
                    {employee.availableDays.map((d) => (
                        <Box
                            key={d.day}
                            px={1.5}
                            py={0.5}
                            borderRadius="4px"
                            bg={d.available ? "brand.greenLight" : "neutral.light"}
                            fontSize="10px"
                            fontWeight="medium"
                            color={d.available ? "brand.green" : "neutral.grey"}
                        >
                            {d.day}
                        </Box>
                    ))}
                </HStack>
            )}
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
            w="280px"
            h="full"
            bg="white"
            flexShrink={0}
            pt={2}

            overflowY="auto"
        >
            <VStack gap={4} align="stretch">
                <HStack justify="space-between" align="center">
                    <HStack gap={2}>
                        <IconButton
                            aria-label="Collapse Panel"
                            variant="ghost"
                            size="xs"
                            color="neutral.grey"
                            onClick={onToggle}
                            _hover={{ bg: "gray.50" }}
                        >
                            <FiChevronsLeft size={16} />
                        </IconButton>
                        <Text fontSize="16px" fontWeight="bold" color="neutral.black">
                            Roster
                        </Text>
                    </HStack>
                </HStack>

                {/* Search and filter */}
                <HStack gap={2}>
                    <Box position="relative" flex={1}>
                        <Input
                            placeholder="Search"
                            size="sm"
                            borderRadius="8px"
                            borderColor="grid.outline"
                            pl={9}
                            h="36px"
                            fontSize="14px"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            _placeholder={{ color: "neutral.grey" }}
                        />
                        <Box position="absolute" left={3} top="50%" transform="translateY(-50%)">
                            <FiSearch size={16} color="#4E5D69" />
                        </Box>
                    </Box>
                    <IconButton
                        aria-label="Filter"
                        variant="outline"
                        size="sm"
                        borderRadius="8px"
                        borderColor="grid.outline"
                        color="neutral.grey"
                        h="36px"
                        w="36px"
                    >
                        <FiFilter size={16} />
                    </IconButton>
                </HStack>

                {/* Tabs */}
                <HStack gap={2}>
                    {(["all", "available", "on_leave"] as TabType[]).map((tab) => (
                        <HStack
                            key={tab}
                            px={2}
                            py={1}
                            borderRadius="full"
                            bg={activeTab === tab ? "neutral.black" : "transparent"}
                            cursor="pointer"
                            onClick={() => setActiveTab(tab)}
                            transition="all 0.15s ease"
                        >
                            <Text
                                fontSize="12px"
                                fontWeight="medium"
                                color={activeTab === tab ? "white" : "neutral.grey"}
                            >
                                {tab === "all" ? "All" : tab === "available" ? "Available" : "On Leave"}
                            </Text>
                            <Text
                                fontSize="12px"
                                fontWeight="semibold"
                                color={activeTab === tab ? "white" : tab === "on_leave" ? "#E35F00" : "neutral.black"}
                            >
                                {tabCounts[tab]}
                            </Text>
                        </HStack>
                    ))}
                </HStack>

                {/* Employee list */}
                <VStack gap={3} align="stretch">
                    {filteredEmployees.map((employee) => (
                        <EmployeeCard key={employee.id} employee={employee} />
                    ))}
                    {filteredEmployees.length === 0 && (
                        <Text fontSize="14px" color="neutral.grey" textAlign="center" py={4}>
                            No employees found
                        </Text>
                    )}
                </VStack>
            </VStack>
        </Box>
    );
}

export default RosterPanel;

