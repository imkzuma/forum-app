import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';

export default function InputText({ title, text, setText }: { title?: string, text: string, setText: (value: string) => void }) {
  const [error, setError] = useState<string>('');
  const [errorStatus, setErrorStatus] = useState<boolean>(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      setErrorStatus(true);
      setError(`${title} required`);
    }
    else {
      setErrorStatus(false);
      setError('');
      setText(value);
    }
  };

  return (
    <FormControl isRequired isInvalid={errorStatus}>
      <FormLabel htmlFor={title ? title : "Text"}>{title ? title : "Text"}</FormLabel>
      <Input
        type="text"
        id="text"
        placeholder={title ? title : "Text"}
        onChange={handleTextChange}
        h={12}
        borderColor={useColorModeValue('gray.300', 'gray.700')}
        required
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
