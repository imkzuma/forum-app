import CardDetailForum from "./card/CardDetailForum";
import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import WriteCommentComponent from './card/WriteComment';
import ViewComment from "./card/ViewComment";
import { ForumApi } from "@/utils/api";
import { useLayoutEffect, useState } from 'react';


export default function DetailForumComponents({ id }: { id: number | string }) {
  const [hasComment, setHasComment] = useState<boolean>(false);
  const [dataThread, setDataThread] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await ForumApi.get(`/thread/${id}`);
        if (response.status === 200) {
          setDataThread(response.data.data.threads);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();

    const getComments = async () => {
      try {
        const response = await ForumApi.get(`/comment/${id}`);
        if (response.status === 200) {
          const comments = response.data.data.comments;
          if (comments.length === 0) {
            setHasComment(false);
          }
          else if (comments.length > 0) {
            setHasComment(true);
          }
        }
      } catch (error) {
      }
    }
    getComments();

  }, [id]);

  return (
    <Stack spacing={5} px={{ base: 0, lg: 20 }} py={10}>
      <Flex as="a" href="/" justify={{ base: "space-between", md: 'start' }} align={'center'} gap={3}>
        <ChevronLeftIcon fontSize={'3xl'} />
        <Text>Detail Threads</Text>
        <ChevronLeftIcon bg={'transparent'} color={'transparent'} />
      </Flex>

      <CardDetailForum
        Id={dataThread?.id}
        Title={dataThread?.title}
        AccountUsername={dataThread?.AccountUsername}
        PostDate={dataThread?.createdAt}
        Content={dataThread?.content}
        like={generateRandomNumber(1, 100)}
        dislike={generateRandomNumber(1, 100)}
      />

      <WriteCommentComponent id={id} />

      {!hasComment
        ? (
          <Text
            py={10}
            textAlign={'center'}
            color={'gray.500'}
          >
            No Comments Yet.
          </Text>
        )
        : (
          <ViewComment id={id as string} />
        )
      }
    </Stack >
  )
}