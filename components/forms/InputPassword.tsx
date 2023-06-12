import { FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputRightElement, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { validatePassword } from './ValidateInput';

import { HiEye, HiEyeOff } from 'react-icons/hi'

export default function InputPassword({ title, password, setPassword }: { title?: string, password: string, setPassword: (value: string) => void }) {
  const [error, setError] = useState<string>('');
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null)

  const { isOpen, onToggle } = useDisclosure();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { validateStatus, validateMsg } = validatePassword(value);

    if (validateStatus) {
      setPassword(value);
      setError('');
      setErrorStatus(false);
    }
    else {
      setPassword('');
      setError(validateMsg);
      setErrorStatus(true)
    }
  };

  const onClickReveal = () => {
    onToggle()
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }

  return (
    <FormControl isRequired isInvalid={errorStatus}>
      <FormLabel htmlFor={title ? title : "Password"}>{title ? title : "Password"}</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant="link"
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            pt={2}
            size={'lg'}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          name="password"
          ref={inputRef}
          type={isOpen ? 'text' : 'password'}
          autoComplete="current-password"
          id={title ? title : "Password"}
          h={12}
          borderColor={useColorModeValue('gray.300', 'gray.700')}
          placeholder="***********"
          onChange={handlePasswordChange}
          required
        />
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
