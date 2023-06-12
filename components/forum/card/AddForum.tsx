import { Box, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from 'react';

export default function CardAddForum({ children }: { children: ReactNode }) {
  return (
    <Box
      w={{ base: 'full' }}
      bg={useColorModeValue('white', 'gray.800')}
      rounded={'lg'}
      p={{ base: 5, md: 8 }}
      py={{ base: 8, md: 8 }}
    >
      {children}
    </Box>
  )
}