import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Box, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <DashboardLayout>
      <Box p={8}>
        <Text fontSize="lg" color="gray.500">
          Phase 2 Complete. Application Shell is ready.
        </Text>
      </Box>
    </DashboardLayout>
  );
}
