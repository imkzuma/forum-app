import { Flex, Text, useColorModeValue } from "@chakra-ui/react"

export const ForumLogoFull = () => {
  return (
    <Flex alignItems={'center'} gap={1}>
      <Text
        py={0}
        px={1}
        bg={useColorModeValue('blue.500', 'blue.600')}
        color={'white'}
        rounded={'md'} fontSize={{ md: 'xl' }}
        fontWeight={'bold'}
      >
        FO
      </Text>
      <Text color={'dark'} fontSize={'xl'} fontWeight={'bold'}>RUM</Text>
    </Flex>
  )
}

export const LogoForumOnly = () => {
  return (
    <Flex alignItems={'center'} gap={1}>
      <Text
        py={0}
        px={2}
        bg={useColorModeValue('blue.500', 'blue.600')}
        color={'white'}
        rounded={'md'} fontSize={{ md: 'xl' }}
        fontWeight={'bold'}
      >
        FR
      </Text>
    </Flex>
  )
}