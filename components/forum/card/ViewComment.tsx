import { useState, useEffect } from 'react';
import { Flex, Stack, Tag, Text } from "@chakra-ui/react";
import { ForumApi } from '@/utils/api';
import TreeComment from '@/components/forum/TreeComment';

export default function ViewComment({ id }: { id: number | string }) {
  const [dataComment, setDataComment] = useState<any>();

  useEffect(() => {
    if (id) {
      const getComment = async () => {
        try {
          const response = await ForumApi.get(`/comment/${id}`)

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
      <Text as={Flex} gap={2}>
        <Tag
          rounded={'full'}
          bg={'blue.500'}
          color={'white'}
          textAlign={'center'}
        >
          {dataComment?.length}
        </Tag>
        Comments
      </Text>
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