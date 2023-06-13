import { useState, useEffect } from 'react';
import { Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { ForumApi } from '@/utils/api';
import TreeComment from '@/components/forum/TreeComment';

export default function ShowReplyComponent({ id }: { id: number | string }) {
  const [dataComment, setDataComment] = useState<any>();

  const bgCard = useColorModeValue('white', 'gray.800');
  const bgBorderCard = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    if (id) {
      const getComment = async () => {
        try {
          const response = await ForumApi.get(`/comment/${id}`);
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
      {dataComment?.length > 0
        ? dataComment?.map((item: any, index: number) => {
          return (
            <TreeComment key={index}
              AccountUsername={item.AccountUsername}
              id={item.id}
              content={item.content}
              createdAt={item.createdAt}
            />
          )
        })

        : (
          <Box
            w={'full'}
            border={'1px'}
            borderColor={bgBorderCard}
            rounded={'lg'}
            p={5}
            bg={bgCard}
          >
            <Text align={'center'} color={'gray.500'}>
              No Reply
            </Text>
          </Box>
        )
      }
    </Stack>
  )
}