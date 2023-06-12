import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Flex
      pos={'relative'}
      w={'full'}
      h={'100vh'} maxH={'100vh'}
      align={{
        base: 'start',
        md: 'center'
      }}
      justify={{
        base: 'start',
        md: 'center'
      }}
      bg={useColorModeValue('white', 'gray.900')}
    >
      <Box
        w={{
          base: 'full',
          md: 'lg'
        }}
        p={{
          base: 5,
          md: 0
        }}
        py={{
          base: 10,
          md: 0
        }}
        border={{ md: '1px' }}
        borderColor={{ md: useColorModeValue('gray.200', 'gray.700') }}
        borderRadius={{ md: 'xl' }}
      >
        <Box p={{
          base: 0,
          md: 10
        }}>
          {children}
        </Box>
      </Box>
    </Flex>
  )
}