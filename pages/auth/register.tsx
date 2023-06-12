import FormRegister from "@/components/auth/register/FormRegister";
import AuthLayout from "@/layouts/AuthLayout";
import { Heading, Icon, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import { FaChevronLeft } from "react-icons/fa";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register Page</title>
      </Head>
      <main>
        <AuthLayout>
          <Stack spacing={10}>
            <Stack textAlign={{ md: 'center' }}>
              <Stack
                direction="row"
                align={'center'}
                justify={{ md: 'center' }}
                spacing={4}
                as="a" href="/auth"
              >
                <Icon display={{ md: 'none' }} as={FaChevronLeft} fontSize={'xl'} />
                <Heading>
                  Register
                </Heading>
              </Stack>
              <Text
                color={useColorModeValue('gray.500', 'gray.500')}
              >
                Register to use Forum App
              </Text>
            </Stack>

            <FormRegister />
            <Text
              textAlign={'center'}
              color={useColorModeValue('gray.500', 'gray.300')}
            >
              Already have an account?
              <Text as={'a'}
                href={'/auth/login'}
                color={useColorModeValue('blue.600', 'blue.400')}
                ps={1}
              >
                Login
              </Text>

            </Text>
          </Stack>
        </AuthLayout>
      </main>
    </>
  )
}