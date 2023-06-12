import { Box, Button, Flex, Grid, GridItem, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import CardListForum from "./card/CardListForum";
import { faker } from "@faker-js/faker";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState, useLayoutEffect } from "react";
import { ForumApi } from "@/utils/api";

// const data = [
//   { id: 1, slug: faker.string.uuid(), title: faker.music.songName(), content: faker.lorem.paragraph(15), postDate: faker.date.month(), tag: faker.music.genre(), username: faker.person.middleName(), like: 10, dislike: 2, comment: 2 },
//   { id: 2, slug: faker.string.uuid(), title: faker.music.songName(), content: faker.lorem.paragraph(15), postDate: faker.date.month(), tag: faker.music.genre(), username: faker.person.middleName(), like: 10, dislike: 2, comment: 2 },
//   { id: 3, slug: faker.string.uuid(), title: faker.music.songName(), content: faker.lorem.paragraph(15), postDate: faker.date.month(), tag: faker.music.genre(), username: faker.person.middleName(), like: 10, dislike: 2, comment: 2 },
//   { id: 4, slug: faker.string.uuid(), title: faker.music.songName(), content: faker.lorem.paragraph(15), postDate: faker.date.month(), tag: faker.music.genre(), username: faker.person.middleName(), like: 10, dislike: 2, comment: 2 },
// ];

export default function ForumComponents() {
  const [pages, setPages] = useState<number>(1);
  const [data, setData] = useState<any>();
  const [totalPage, setTotalPage] = useState<number>();

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await ForumApi.get(`/thread/?page=${pages}`);
        setData(response.data.data.threads)
        setTotalPage(response.data.data.pagination.totalPage)
        console.log(response.data);
      } catch (error) {
        console.log(error);
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
                  like={21}
                  dislike={2}
                />
              )
            })
            : 'No data'
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

