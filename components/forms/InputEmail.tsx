import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { validateEmail } from './ValidateInput';

export default function InputEmail({ email, setEmail }: { email: string, setEmail: (value: string) => void }) {
  const [error, setError] = useState<string>('');
  const [errorStatus, setErrorStatus] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { validateStatus, validateMsg } = validateEmail(value);

    if (validateStatus) {
      setEmail(value);
      setError('');
      setErrorStatus(false);
    }
    else {
      setEmail('');
      setError(validateMsg);
      setErrorStatus(true)
    }
  };

  return (
    <FormControl isRequired isInvalid={errorStatus}>
      <FormLabel>Email</FormLabel>
      <Input
        variant="outline"
        type="email"
        id="email"
        placeholder="example@email.com"
        onChange={handleEmailChange}
        h={12}
        borderColor={useColorModeValue('gray.300', 'gray.700')}
        required
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
