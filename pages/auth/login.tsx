import Head from "next/head";
import AuthLayout from "@/layouts/AuthLayout";
import FormLogin from "@/components/auth/login/FormLogin";
import { Heading, Icon, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";

export default function LoginPage() {
  const secondaryColor = useColorModeValue('gray.500', 'gray.500');
  const secondaryColorLink = useColorModeValue('gray.500', 'gray.300');
  const colorLink = useColorModeValue('blue.600', 'blue.400');

  return (
    <>
      <Head>
        <title>Login Page</title>
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
                  Login
                </Heading>
              </Stack>
              <Text
                color={secondaryColor}
              >
                Login to your Forum App account
              </Text>
            </Stack>

            <FormLogin />
            <Text
              textAlign={'center'}
              color={secondaryColorLink}
            >
              Dont have an account?
              <Text as={'a'}
                href={'/auth/register'}
                color={colorLink}
                ps={1}
              >
                Register
              </Text>

            </Text>
          </Stack>
        </AuthLayout>
      </main>
    </>
  )
}