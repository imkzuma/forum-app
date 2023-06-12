import { ReactNode } from "react";
import { CustomContainer } from "@/components/custom/container";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import Navbar from "@/components/navigation/Navbar";
import SidebarNavigation from "@/components/navigation/SidebarNavigation";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />

      <CustomContainer>
        <Grid
          gridTemplateColumns={'repeat(12, 1fr)'}
          gap={5}
          py={10}
        >
          <GridItem
            display={{ base: "none", md: "block" }}
            colSpan={{
              base: 12,
              md: 3
            }}
          >
            <SidebarNavigation />
          </GridItem>
          <GridItem
            colSpan={{
              base: 12,
              md: 9
            }}
          >
            {children}
          </GridItem>
        </Grid>
      </CustomContainer>
    </>
  )
}

export const MainLayoutWithoutSidebar = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />

      <CustomContainer>
        {children}
      </CustomContainer>
    </>
  )
}