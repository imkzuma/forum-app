import { ReactNode } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
export const CustomContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      w={'full'} minH={'100vh'}
      px={{
        base: 5,
        lg: 14,
      }}
      bg={useColorModeValue('#eeeeee', 'gray.900')}
    >
      {children}
    </Box>
  )
}
