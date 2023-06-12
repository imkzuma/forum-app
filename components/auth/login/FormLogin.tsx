import InputEmail from "@/components/forms/InputEmail";
import InputPassword from "@/components/forms/InputPassword";
import InputText from "@/components/forms/InputText";
import { ForumApi } from "@/utils/api";
import { Button, Input, Modal, ModalBody, Stack, useColorModeValue, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

interface LoginProps {
  email: string;
  password: string;
}

export default function FormLogin() {
  const router = useRouter();
  const Toast = useToast();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await ForumApi.post('/account/login', {
        username: username,
        password: password
      });
      console.log(response);

      if (response.status === 200) {
        localStorage.setItem('token-name', response.data.data.username)
        router.replace('/');
      }
      else {
        return Toast({
          title: 'Login Gagal',
          description: 'Username atau password salah',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }

    } catch (error) {
      return Toast({
        title: 'Login Gagal',
        description: 'Username atau password salah',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setLoading(false);
    }
  }

  const isDisabled = () => {
    return username === '' || password === '';
  }

  const bgButton = useColorModeValue('blue.500', 'blue.600');
  const bgButtonHover = useColorModeValue('blue.600', 'blue.700');

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={7}>
          <InputText title={'Input Username'} text={username} setText={setUsername} />
          <InputPassword title="Password" password={password} setPassword={setPassword} />
          <Button
            type="submit"
            bg={bgButton}
            color={'white'}
            _hover={{
              bg: bgButtonHover,
            }}
            h={'fit-content'}
            py={4}
            rounded={'xl'}
            isDisabled={isDisabled()}
          >
            Login
          </Button>
        </Stack>
      </form>
    </>
  )
}