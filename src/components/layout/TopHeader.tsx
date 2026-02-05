"use client"

import { Flex, Text, HStack, Button, Box, Avatar, IconButton, VStack } from "@chakra-ui/react"
import { Add, Notification, Setting2, ArrowDown2, Category } from "iconsax-reactjs"

export const TopHeader = () => {
    return (
        <VStack>
            <HStack w="full" px={8} py={6} justify="end">
                <HStack gap={4}>
                    <Box
                        p={2.5}
                        borderRadius="lg"
                        cursor="pointer"
                        color="brand.blue"
                        bg="blue.50"
                        _hover={{ bg: "blue.100" }}
                    >
                        <Category size={22} />
                    </Box>

                    <Box
                        p={2.5}
                        borderRadius="lg"
                        cursor="pointer"
                        color="black"
                        bg="blue.50"
                        _hover={{ bg: "blue.100", color: "gray.600" }}
                    >
                        <Setting2 size={22} variant="Linear" />
                    </Box>

                    <Box
                        p={2.5}
                        borderRadius="lg"
                        cursor="pointer"
                        color="black"
                        bg="blue.50"
                        position="relative"
                        _hover={{ bg: "blue.100", color: "gray.600" }}
                    >
                        <Notification size={22} variant="Linear" />
                        <Box
                            position="absolute"
                            top="10px"
                            right="10px"
                            w="8px"
                            h="8px"
                            bg="red.500"
                            borderRadius="full"
                            border="2px solid white"
                        />
                    </Box>
                </HStack>

                <HStack gap={8} cursor="pointer" pl={16}>
                    <Box display={{ base: "none", md: "block" }}>
                        <Text fontSize="14px" fontWeight="bold" color="gray.700" lineHeight="1.2">
                            Paul Cornelius
                        </Text>
                        <Text fontSize="12px" color="gray.400" lineHeight="1.2">
                            Paul@dstrct.com
                        </Text>
                    </Box>
                    <IconArrowDown color="gray" />
                </HStack>
            </HStack>

            <Flex
                as="header"
                w="full"
                py={4}
                align="center"
                justify="space-between"
                px={8}
                borderTop="1px solid"
                borderBottom="1px solid"
                borderColor="gray.300"
            >
                <Text fontSize="24px" fontWeight="bold" color="gray.800" letterSpacing="-0.5px">
                    Planner
                </Text>

                <HStack gap={4}>

                    <HStack gap={3}>
                        <Button
                            variant="outline"
                            h="44px"
                            px={4}
                            borderColor="gray.200"
                            color="gray.600"
                            fontWeight="semibold"
                            borderRadius="lg"
                            _hover={{ bg: "gray.50" }}
                            fontSize="sm"
                        >
                            <IconArrowDown ml={3} /> Open Days
                        </Button>
                        <Button
                            variant="outline"
                            h="44px"
                            px={4}
                            borderColor="gray.200"
                            color="gray.600"
                            fontWeight="semibold"
                            borderRadius="lg"
                            _hover={{ bg: "gray.50" }}
                            fontSize="sm"
                        >
                            <Add size={18} style={{ marginRight: '8px' }} /> Nieuw <IconArrowDown ml={3} />
                        </Button>
                    </HStack>
                </HStack>
            </Flex>
        </VStack>
    )
}

const IconArrowDown = ({ ml, color }: { ml?: number | string, color?: string }) => (
    <ArrowDown2 size={16} color={color || "currentColor"} style={{ marginLeft: typeof ml === 'number' ? `${ml}px` : ml }} />
)
