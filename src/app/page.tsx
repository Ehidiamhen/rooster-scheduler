"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Box, VStack } from "@chakra-ui/react";
import { SchedulerToolbar, SchedulerGrid, ViewModeToggle } from "@/components/features/scheduler";

type ViewMode = "live" | "planner";

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 8)); // Sept 8, 2025
  const [viewMode, setViewMode] = useState<ViewMode>("live");

  const handlePrevDay = () => {
    setCurrentDate(prev => new Date(prev.getTime() - 24 * 60 * 60 * 1000));
  };

  const handleNextDay = () => {
    setCurrentDate(prev => new Date(prev.getTime() + 24 * 60 * 60 * 1000));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const modeDescription = viewMode === "live"
    ? "Description of the live"
    : "Description of the planner view";

  return (
    <DashboardLayout>
      <VStack gap={4} px={8} align="stretch" h="full">
        <Box pt={4}>
          <ViewModeToggle
            mode={viewMode}
            onModeChange={setViewMode}
            description={modeDescription}
          />
        </Box>
        <SchedulerToolbar
          currentDate={currentDate}
          onPrevDay={handlePrevDay}
          onNextDay={handleNextDay}
          onToday={handleToday}
        />
        <Box flex={1} overflow="auto" pb={4}>
          <SchedulerGrid />
        </Box>
      </VStack>
    </DashboardLayout>
  );
}

