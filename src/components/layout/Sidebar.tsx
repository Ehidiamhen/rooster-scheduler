"use client"

import { Box, VStack, HStack, Text, Icon, Flex, Badge } from "@chakra-ui/react"
import {
    Home,
    Calendar,
    DocumentText,
    NoteText,
    Setting2,
    TaskSquare,
    FolderOpen,
    MessageQuestion,
    Notification
} from "iconsax-reactjs"

const NAV_ITEMS = [
    { label: "Startpagina", icon: Home, route: "/dashboard" },
    {
        label: "Rooster",
        icon: Calendar,
        route: "/rooster",
        isActive: true,
        subItems: [
            { label: "Mijn Rooster", icon: DocumentText },
            { label: "Planner", icon: NoteText, isActive: true },
            { label: "Instellingen", icon: Setting2 }
        ]
    },
    { label: "My to do Protocols", icon: TaskSquare, route: "/protocols" },
    { label: "Document Management", icon: FolderOpen, route: "/documents" },
    { label: "Department News", icon: NoteText, route: "/news" },
    { label: "Knowledge Base", icon: MessageQuestion, route: "/kb" },
    { label: "General News", icon: Notification, route: "/general-news" },
]

export const Sidebar = () => {
    return (
        <Box
            w="260px"
            h="100vh"
            borderRight="1px solid"
            borderColor="gray.200"
            bg="white"
            position="sticky"
            top={0}
            flexShrink={0}
            display={{ base: "none", md: "block" }}
        >
            <VStack gap={0} align="stretch" pt={6}>
                {/* Logo Area */}

                <VStack gap={2} align="stretch" px={4} mt={6}>
                    {NAV_ITEMS.map((item) => (
                        <Box key={item.label}>
                            <HStack
                                py={2.5}
                                px={3}
                                borderRadius="md"
                                color={item.isActive ? "blue.600" : "gray.600"}
                                bg={item.isActive ? "blue.50" : "transparent"}
                                _hover={{ bg: "gray.50" }}
                                cursor="pointer"
                            >
                                <item.icon size={20} variant={item.isActive ? "Bold" : "Outline"} />
                                <Text fontWeight={item.isActive ? "semibold" : "medium"} fontSize="sm">
                                    {item.label}
                                </Text>
                            </HStack>

                            {/* Sub Items */}
                            {item.subItems && (
                                <VStack gap={1} align="stretch" pl={4} mt={1}>
                                    {item.subItems.map((sub) => (
                                        <HStack
                                            key={sub.label}
                                            py={2}
                                            px={3}
                                            borderRadius="md"
                                            color={sub.isActive ? "blue.600" : "gray.500"}
                                            bg={sub.isActive ? "blue.50" : "transparent"}
                                            _hover={{ bg: "gray.50" }}
                                            cursor="pointer"
                                        >
                                            <sub.icon size={18} variant="Outline" />
                                            <Text
                                                fontWeight={sub.isActive ? "semibold" : "medium"}
                                                fontSize="sm"
                                            >
                                                {sub.label}
                                            </Text>
                                        </HStack>
                                    ))}
                                </VStack>
                            )}
                        </Box>
                    ))}
                </VStack>
            </VStack>
        </Box>
    )
}
