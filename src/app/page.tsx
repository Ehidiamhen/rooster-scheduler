"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { SchedulerToolbar, SchedulerGrid, ViewModeToggle, RosterPanel } from "@/components/features/scheduler";
import { useScheduler } from "@/context/SchedulerContext";

export default function Home() {
  const {
    currentDate,
    viewMode,
    setViewMode,
    goToPrevDay,
    goToNextDay,
    goToToday,
    isRosterOpen,
    toggleRoster
  } = useScheduler();

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
            <RosterPanel isOpen={isRosterOpen} onToggle={toggleRoster} />

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
        </Box>
      </VStack>
    </DashboardLayout>
  );
}
