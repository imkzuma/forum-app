import { useState, useLayoutEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Grid, GridItem, Skeleton, Stack, Text, useColorModeValue } from "@chakra-ui/react";

import CardListForum from "./card/CardListForum";
import { ForumApi } from "@/utils/api";

export default function ForumComponents() {
  const [pages, setPages] = useState<number>(1);
  const [data, setData] = useState<any>();
  const [totalPage, setTotalPage] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const response = await ForumApi.get(`/thread/?page=${pages}`);
        setData(response.data.data.threads)
        setTotalPage(response.data.data.pagination.totalPage)

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [pages]);

  const handlePrevPage = () => {
    if (pages > 1) {
      setPages(pages - 1);
    }
  }

  const handleNextPage = () => {
    if (pages >= 1 && totalPage && pages < totalPage) {
      setPages(pages + 1);
    }
  }

  const bgLoading = useColorModeValue('white', 'gray.800');

  return (
    <Grid
      gridTemplateColumns={'repeat(12, 1fr)'}
    >
      <GridItem
        colSpan={{
          base: 12,
          md: 8
        }}
      >
        <Stack spacing={5}>
          <Flex as="a" href="/forum/add"
            justifyContent={'space-between'}
            alignItems={'center'}
            py={5} px={{ base: 5, md: 10 }}
            bg={useColorModeValue('blue.500', 'blue.900')}
            rounded={'lg'}
            gap={5}
            border={'1px'}
            borderColor={useColorModeValue('blue.500', 'blue.600')}
          >
            <Stack spacing={1}>
              <Text fontSize={'xl'} fontWeight={'semibold'} color={'white'}>
                Create a new thread
              </Text>
              <Text
                fontSize={'sm'}
                color={useColorModeValue('gray.300', 'gray.500')}
              >
                Create the new thread here and share it with the world
              </Text>
            </Stack>
            <ChevronRightIcon fontSize={'3xl'} color={'white'} />
          </Flex>
          {loading && (
            Array.from({ length: 10 }).map((_, index) => {
              return (
                <Box key={index} bg={bgLoading} boxShadow={'2xl'} rounded={'md'} p={6}>
                  <Stack spacing={4}>
                    <Skeleton height="50px" />
                    <Skeleton height="50px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                  </Stack>
                </Box>
              )
            })
          )}
          {data?.length > 0
            ?
            data?.map((item: any, index: number) => {
              return (
                <CardListForum key={index}
                  Id={item.id}
                  Title={item.title}
                  PostDate={item.createdAt}
                  Content={item.content}
                  AccountUsername={item.AccountUsername}
                  like={generateRandomNumber(1, 100)}
                  dislike={generateRandomNumber(1, 100)}
                />
              )
            })
            : (
              <Text
                textAlign={'center'}
              >
                No Threads Yet.
              </Text>
            )
          }

          <Flex justifyContent={'space-between'} gap={5} alignItems={'center'} py={5}>
            <Text color={useColorModeValue('gray.500', 'gray.400')}>
              Page {pages} of {totalPage}
            </Text>
            <Flex gap={5}>
              <Button
                bg={useColorModeValue('blue.500', 'blue.700')}
                color={'white'}
                _hover={{
                  bg: useColorModeValue('blue.600', 'blue.800')
                }}
                isDisabled={pages === 1}
                onClick={handlePrevPage}
              >
                <ChevronLeftIcon
                  fontSize={'xl'}
                />
              </Button>
              <Button
                bg={useColorModeValue('blue.500', 'blue.700')}
                color={'white'}
                _hover={{
                  bg: useColorModeValue('blue.600', 'blue.800')
                }}
                onClick={handleNextPage}
                isDisabled={pages === totalPage}
              >
                <ChevronRightIcon
                  fontSize={'xl'}
                />
              </Button>
            </Flex>
          </Flex>
        </Stack>
      </GridItem>
    </Grid>
  )
}

