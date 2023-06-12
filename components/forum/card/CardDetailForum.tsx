import { Avatar, Box, Button, Divider, Fade, Flex, HStack, Heading, Icon, Stack, Tag, Text, useColorModeValue } from "@chakra-ui/react"
import parse from 'html-react-parser';
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';

interface CardListForumProps {
  Id: number;
  Title: string;
  PostDate: string;
  Content: string;
  AccountUsername: string;
  like: number;
  dislike: number;
}

export default function CardListForum({ Id, Title, like, dislike, PostDate, Content, AccountUsername }: CardListForumProps) {
  const router = useRouter();

  const [isLiked, setIsLiked] = useState<any>([]);
  const [isDisliked, setIsDisliked] = useState<any>([]);
  const [id, setId] = useState<number>();
  const [title, setTitle] = useState<string>();
  const [postDate, setPostDate] = useState<string>();
  const [content, setContent] = useState<string>();
  const [accUsername, setAccUsername] = useState<string>();
  const [readMore, setReadMore] = useState<boolean>(false);

  useLayoutEffect(() => {
    setId(Id);
    setTitle(Title);
    setPostDate(PostDate);
    setContent(Content);
    setAccUsername(AccountUsername)

    setIsLiked({ id: id, like: like, liked: false });
    setIsDisliked({ id: id, dislike: dislike, disliked: false });

  }, [AccountUsername, Content, Id, PostDate, Title, dislike, id, like]);

  const BtnLiked = () => {
    if (isDisliked.disliked) {
      setIsDisliked((prevDisliked: any) => ({
        ...prevDisliked,
        dislike: prevDisliked.disliked ? prevDisliked.dislike - 1 : prevDisliked.dislike + 1,
        disliked: !prevDisliked.disliked,
      }));
    }
    setIsLiked((prevLiked: any) => ({
      ...prevLiked,
      like: prevLiked.liked ? prevLiked.like - 1 : prevLiked.like + 1,
      liked: !prevLiked.liked,
    }));
  }

  const BtnDisliked = () => {
    if (isLiked.liked) {
      setIsLiked((prevLiked: any) => ({
        ...prevLiked,
        like: prevLiked.liked ? prevLiked.like - 1 : prevLiked.like,
        liked: false,
      }));
    }

    setIsDisliked((prevDisliked: any) => ({
      ...prevDisliked,
      dislike: prevDisliked.disliked ? prevDisliked.dislike - 1 : prevDisliked.dislike + 1,
      disliked: !prevDisliked.disliked,
    }));
  };

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      rounded={{ base: 'lg', md: 'xl' }}
      p={{ base: 5, md: 8 }}
      py={{ base: 8, md: 8 }}
      border={'1px'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      as={motion.div}

    >
      <Stack spacing={5}>
        <Stack spacing={3}>
          <Heading color={useColorModeValue('gray.700', 'white')}>
            {title}
          </Heading>
          <Divider />
        </Stack>
        <Flex align={'center'} justify={'space-between'}>
          <HStack spacing={4}>
            <Avatar
              name={AccountUsername}
              rounded={'lg'}
            />
            <Stack spacing={0}>
              <Text fontWeight={'semibold'}>{AccountUsername}</Text>
              <Text
                color={useColorModeValue('gray.400', 'gray.500')}
              >
                {postDate}
              </Text>
            </Stack>
          </HStack>
        </Flex>
        <Text
          color={useColorModeValue('gray.500', 'gray.400')}
          lineHeight={1.8}
        >
          {parse(content ? content : '')}
        </Text>
        <Flex align={'center'} justify={'space-between'}>
          <HStack spacing={5}>
            <Flex alignItems={'center'} gap={0}>
              <Button variant={'unstyled'} p={0} onClick={BtnLiked}>
                {isLiked.liked
                  ? <Icon as={AiFillLike} fontSize={'20px'} key={isLiked.id} />
                  : <Icon as={AiOutlineLike} fontSize={'20px'} key={isLiked.id} />
                }
              </Button>
              <Text fontSize={'14px'} color={'#909090'}>
                {isLiked.like}
              </Text>
            </Flex>
            <Flex alignItems={'center'} gap={0}>
              <Button variant={'unstyled'} p={0} onClick={BtnDisliked}>
                {isDisliked.disliked
                  ? <Icon as={AiFillDislike} fontSize={'20px'} key={isDisliked.id} />
                  : <Icon as={AiOutlineDislike} fontSize={'20px'} key={isDisliked.id} />
                }
              </Button>
              <Text fontSize={'14px'} color={'#909090'}>
                {isDisliked.dislike}
              </Text>
            </Flex>
          </HStack>

        </Flex>
      </Stack>
    </Box>
  )
}