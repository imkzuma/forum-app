import Head from "next/head";
import { Button, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";

export default function AuthPage() {
  return (
    <>
      <Head>
        <title>Auth Page</title>
      </Head>
      <main>
        <Flex
          w={'full'}
          h={'100vh'}
          justifyContent={'center'}
          alignItems={'center'}
          p={{
            base: 10,
            md: 0
          }}
          bg={useColorModeValue('white', 'gray.900')}
        >
          <Stack
            alignItems={'center'}
            textAlign={'center'}
            spacing={5}
          >
            <Text
              fontSize={'3xl'}
              fontWeight={'semibold'}
            >
              Welcome to Forum App
            </Text>
            <Text
              fontSize={'md'}
              w={{
                base: 'full',
                md: '70%',
              }}
              lineHeight={1.8}
              color={useColorModeValue('gray.500', 'gray.500')}
            >
              Log in with your Forum app account to continue.
              Register if you dont have an account.
            </Text>
            <Stack direction={'row'} spacing={5}>
              <Button as="a"
                href="/auth/login"
                bg={useColorModeValue('blue.400', 'blue.600')}
                color={'white'}
                px={7}
                border={'1px solid transparent'}
                _hover={{
                  bg: useColorModeValue('blue.500', 'blue.700')
                }}
              >
                Login
              </Button>
              <Button as="a"
                href="/auth/register"
                variant={'outline'}
                color={useColorModeValue('blue.400', 'blue.500')}
                px={7}
                borderColor={useColorModeValue('blue.400', 'blue.600')}
                _hover={{
                  borderColor: useColorModeValue('blue.400', 'blue.600'),
                  bg: useColorModeValue('blue.400', 'blue.600'),
                  color: 'white'
                }}
              >
                Register
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </main>
    </>
  )
}