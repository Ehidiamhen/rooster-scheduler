"use client"

import { Flex, Text, VStack, Box, HStack } from "@chakra-ui/react"
import Image from "next/image"
import logo from "../../../public/logo.svg"
import {
    MenuBoard,
    DocumentText,
    ArrowDown2,
    Maximize1,
    HamburgerMenu,
    Stickynote,
    Document,
    Notepad2,
    Category2
} from "iconsax-reactjs"

interface NavItemProps {
    icon: any
    label: string
    isActive?: boolean
    hasSubmenu?: boolean
    isOpen?: boolean
    isSubItem?: boolean
}

const NavItem = ({ icon: IconComp, label, isActive, hasSubmenu, isOpen, isSubItem }: NavItemProps) => {
    return (
        <HStack
            w="full"
            py={3}
            px={6}
            mx={isSubItem ? 7 : 0}
            cursor="pointer"
            color={isActive ? "brand.primary" : "gray.500"}
            position="relative"
            _hover={{ color: "brand.primary", bg: "gray.50" }}
            transition="all 0.2s"
            fontWeight={isActive ? "bold" : "medium"}
            borderLeft={isSubItem ? "1px solid" : "none"}
            borderLeftColor={isActive ? "brand.primary" : "gray.200"}
        >
            {isActive && (
                <Box
                    position="absolute"
                    left={0}
                    top={0}
                    bottom={0}
                    w="1px"
                    bg="brand.primary"
                />
            )}

            <IconComp size={22} variant={isActive ? "Outline" : "Linear"} />

            <Text fontWeight={isOpen ? 700 : 500} color={isOpen ? "black" : "gray.500"} fontSize="16px" flex="1" ml={2}>
                {label}
            </Text>

            {hasSubmenu && (
                <ArrowDown2 size={16} variant="Linear" style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
            )}
        </HStack>
    )
}

export const Sidebar = () => {
    return (
        <Flex
            w="260px"
            h="100vh"
            bg="white"
            borderRight="1px solid"
            borderColor="gray.100"
            direction="column"
            py={8}
            overflowY="auto"
            css={{ '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: '#EDF2F7', borderRadius: '4px' } }}
        >
            <HStack align="center" px={4} mb={10} justify="space-between">
                <Image src={logo} alt="Excellent Care Clinics" />
                <Box alignSelf="flex-start" border="1px solid" borderColor="brand.gray" rounded="lg" p={2}>
                    <HamburgerMenu size={24} color="black" />
                </Box>
            </HStack>

            <VStack gap={2} align="stretch">
                <NavItem icon={Category2} label="Startpagina" />

                <Box>
                    <NavItem icon={Maximize1} label="Rooster" hasSubmenu isOpen isActive={false} />
                    <VStack gap={0} align="stretch" mt={1}>
                        <NavItem icon={DocumentText} label="Mijn Rooster" isSubItem />
                        <NavItem icon={Stickynote} label="Planner" isSubItem isActive />
                        <NavItem icon={Stickynote} label="Instellingen" isSubItem />
                    </VStack>
                </Box>

                <NavItem icon={Stickynote} label="My to do Protocols" />
                <NavItem icon={Document} label="Document Management" />
                <NavItem icon={Notepad2} label="Department News" />
                <NavItem icon={MenuBoard} label="Knowledge Base" />
                <NavItem icon={DocumentText} label="General News" />
            </VStack>
        </Flex>
    )
}
