import { Avatar, Box, Button, Fade, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import ShowReplyComponent from "./card/ShowReply";
import WriteReplyComponent from "./card/WriteReply";
import { useState } from "react";

export default
  function TreeComment({ AccountUsername, createdAt, id, content }: any) {
  const [reply, setReply] = useState<boolean>(false);
  const [showReply, setShowReply] = useState<boolean>(false);

  const btnBg = useColorModeValue('blue.500', 'blue.600');
  const btnBgHover = useColorModeValue('blue.500', 'blue.600');

  const textContent = useColorModeValue('gray.700', 'gray.400');
  const textDate = useColorModeValue('gray.400', 'gray.500');

  const bgCard = useColorModeValue('white', 'gray.800');
  const bgBorderCard = useColorModeValue('gray.200', 'gray.700');

  const handleReply = () => {
    setShowReply(false);
    setReply(!reply);
  }
  const handleShowReply = () => {
    setShowReply(!showReply);
  }

  return (
    <Box>
      <Stack
        spacing={5}
        bg={bgCard}
        p={{ base: 5, md: 10 }}
        rounded={'xl'}
        border={'1px'}
        borderColor={bgBorderCard}
      >
        <Flex
          justify={'start'}
          align={'start'}
          gap={5}
        >
          <Avatar name={AccountUsername} display={{ base: 'none', md: 'flex' }} />
          <Stack>
            <Flex gap={5}>
              <Avatar name={AccountUsername} display={{ base: 'flex', md: 'none' }} />
              <Stack spacing={0}>
                <Text fontWeight={'semibold'}>{AccountUsername}</Text>
                <Text color={textDate}>
                  {createdAt}
                </Text>
              </Stack>
            </Flex>
            <Text
              lineHeight={1.8}
              color={textContent}
              fontSize={{ base: 'sm', md: 'md' }}
            >
              {content}
            </Text>
          </Stack>
        </Flex>
        <Flex justify={'end'} align={'center'} gap={4}>
          <Button
            onClick={handleShowReply}
            size={{ base: 'sm', md: 'md' }}
          >
            Show Reply
          </Button>
          <Button
            bg={btnBg}
            color={'white'}
            _hover={{
              bg: btnBgHover
            }}
            onClick={handleReply}
            size={{ base: 'sm', md: 'md' }}
          >
            Reply
          </Button>
        </Flex>
      </Stack>
      <Stack spacing={2}>
        <Fade in={reply}>
          <Box
            pt={2}
            ps={{ base: 0, md: 20 }}
            display={reply ? 'block' : 'none'}
          >
            <WriteReplyComponent id={id} />
          </Box>
        </Fade>
        <Fade in={showReply}>
          <Box
            ps={{ base: 0, md: 20 }}
            display={showReply ? 'block' : 'none'}
          >
            <ShowReplyComponent id={id} />
          </Box>
        </Fade>
      </Stack>
    </Box>
  )
}