import { useState, useEffect } from 'react';
import { Avatar, Box, Button, Fade, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import WriteCommentComponent from './WriteComment';
import WriteReplyComponent from './WriteReply';
import { ForumApi } from '@/utils/api';
import ShowReplyComponent from './ShowReply';

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
        p={10}
        rounded={'xl'}
        border={'1px'}
        borderColor={bgBorderCard}
      >
        <Flex
          justify={'start'}
          align={'start'}
          gap={5}
        >
          <Avatar name={AccountUsername} />
          <Stack>
            <Stack spacing={0}>
              <Text fontWeight={'semibold'}>{AccountUsername}</Text>
              <Text color={textDate}>
                {createdAt}
              </Text>
            </Stack>
            <Text
              lineHeight={1.8}
              color={textContent}
              fontSize={{ base: 'sm', md: 'md' }}
            >
              {content}
            </Text>
          </Stack>
        </Flex>
        <Flex justify={'end'} align={'center'} gap={5}>
          <Button
            onClick={handleShowReply}
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
          >
            Reply
          </Button>
        </Flex>
      </Stack>
      <Fade in={reply}>
        <Box
          py={4}
          ps={{ base: 0, md: 20 }}
          display={reply ? 'block' : 'none'}
        >
          <WriteReplyComponent id={id} />
        </Box>
      </Fade>
      <Fade in={showReply}>
        <Box
          py={4}
          ps={{ base: 0, md: 20 }}
          display={showReply ? 'block' : 'none'}
        >
          <ShowReplyComponent id={id} />
        </Box>
      </Fade>
    </Box>
  )
}

export default function ViewComment({ id }: { id: number | string }) {
  const [dataComment, setDataComment] = useState<any>();

  useEffect(() => {
    if (id) {
      const getComment = async () => {
        try {
          const response = await ForumApi.get(`/comment/${id}`)
          console.log(response)
          if (response.status === 200) {
            setDataComment(response.data.data.comments);
          }
        } catch (error) {
          console.log(error);
        }
      }
      getComment();
    }
  }, [id]);

  return (
    <Stack spacing={4}>
      <Text>Comments</Text>
      {dataComment?.map((item: any, index: number) => {
        return (
          <TreeComment key={index}
            AccountUsername={item.AccountUsername}
            id={item.id}
            content={item.content}
            createdAt={item.createdAt}
          />
        )
      })}
    </Stack>
  )
}