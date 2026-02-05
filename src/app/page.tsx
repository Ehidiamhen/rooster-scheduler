"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Box, HStack, VStack, IconButton } from "@chakra-ui/react";
import { SchedulerToolbar, SchedulerGrid, ViewModeToggle, RosterPanel } from "@/components/features/scheduler";
import { FiChevronsRight } from "react-icons/fi";
import { useScheduler } from "@/context/SchedulerContext";

export default function Home() {
  const {
    currentDate,
    viewMode,
    setViewMode,
    goToPrevDay,
    goToNextDay,
    goToToday
  } = useScheduler();

  const [isRosterOpen, setIsRosterOpen] = useState(false);

  const modeDescription = viewMode === "live"
    ? "Description of the live"
    : "Description of the planner view";

  return (
    <DashboardLayout>
      <VStack gap={0} align="stretch" h="full" overflow="hidden">
        <Box px={6} py={4}>
          <ViewModeToggle
            mode={viewMode}
            onModeChange={setViewMode}
            description={modeDescription}
          />
        </Box>

        <Box flex={1} px={6} overflow="hidden" position="relative">
          <HStack gap={4} h="full" align="stretch">
            <RosterPanel isOpen={isRosterOpen} onToggle={() => setIsRosterOpen(!isRosterOpen)} />

            <VStack gap={4} flex={1} align="stretch" overflow="hidden">
              <SchedulerToolbar
                currentDate={currentDate}
                onPrevDay={goToPrevDay}
                onNextDay={goToNextDay}
                onToday={goToToday}
              />
              <Box flex={1} overflow="auto">
                <SchedulerGrid viewMode={viewMode} />
              </Box>
            </VStack>
          </HStack>

          {!isRosterOpen && (
            <IconButton
              aria-label="Open Roster Panel"
              position="absolute"
              left={0}
              top="50%"
              transform="translateY(-50%)"
              bg="white"
              borderRadius="0 8px 8px 0"
              border="1px solid"
              borderColor="grid.outline"
              borderLeft="none"
              color="neutral.grey"
              size="sm"
              h="48px"
              minW="24px"
              onClick={() => setIsRosterOpen(true)}
              _hover={{ bg: "gray.50" }}
              zIndex={30}
              shadow="sm"
            >
              <FiChevronsRight size={16} />
            </IconButton>
          )}
        </Box>
      </VStack>
    </DashboardLayout>
  );
}

