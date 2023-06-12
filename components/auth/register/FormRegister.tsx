import InputEmail from "@/components/forms/InputEmail";
import InputPassword from "@/components/forms/InputPassword";
import InputText from "@/components/forms/InputText";
import { ForumApi } from "@/utils/api";
import { Button, FormErrorMessage, Stack, useColorModeValue, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";

interface LoginProps {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}


export default function FormRegister() {
  const router = useRouter();
  const Toast = useToast();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      Toast.closeAll();
      return Toast({
        position: "top",
        title: "Register Failed",
        description: "Password not matched!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    else {
      try {
        setLoading(true);
        const response = await ForumApi.post('/account/register', {
          username: username,
          password: password
        });

        if (response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Register Success',
            text: 'Register telah berhasil, silakan login',
            confirmButtonText: "OK"
          }).then(() => {
            router.replace('/auth/login');
          });
        }

      } catch (error) {
        Toast.closeAll();
        if ((error as any).response.status === 400) {
          return Toast({
            position: "top",
            title: "Register Failed",
            description: "Username telah dipakai, ganti username anda",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        return Toast({
          position: "top",
          title: "Register Failed",
          description: "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    }
  }

  const isDisabled = () => {
    return username === '' || password === '' || passwordConfirmation === '';
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={7}>
          <InputText title={"Username"} text={username} setText={setUsername} />
          <InputPassword password={password} setPassword={setPassword} />
          <InputPassword title="Re-type Password" password={passwordConfirmation} setPassword={setPasswordConfirmation} />

          <Button
            type="submit"
            bg={useColorModeValue('blue.500', 'blue.600')}
            color={'white'}
            _hover={{
              bg: useColorModeValue('blue.600', 'blue.700'),
            }}
            h={'fit-content'}
            py={4}
            rounded={'xl'}
            isDisabled={isDisabled()}
            isLoading={loading}
          >
            Register
          </Button>
        </Stack>
      </form>
    </>
  )
}