import { Divider, MenuGroup, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function SidebarNavigation() {
  const router = useRouter();
  const activeColor = useColorModeValue('blue.500', 'blue.500');
  const inactiveColor = useColorModeValue('gray.400', 'gray.500');

  return (
    <Stack spacing={5}>
      <Text fontWeight={'semibold'}>Forum Pages</Text>
      <Stack spacing={3}>
        <Text as="a"
          href="/"
          w={'fit-content'}
          color={
            router.pathname === '/'
              ? activeColor
              : inactiveColor
          }
        >
          Home
        </Text>
        <Text as="a"
          href="/popular"
          w={'fit-content'}
          color={
            router.pathname === '/popular'
              ? activeColor
              : inactiveColor
          }
        >
          Popular
        </Text>
        <Text as="a"
          href="/recent"
          w={'fit-content'}
          color={
            router.pathname === '/recent'
              ? activeColor
              : inactiveColor
          }
        >
          Recent
        </Text>
        <Text as="a"
          href="/post"
          w={'fit-content'}
          color={
            router.pathname === '/post'
              ? activeColor
              : inactiveColor
          }
        >
          My Post
        </Text>
        <Text as="a"
          href="/forum/add"
          w={'fit-content'}
          color={
            router.pathname === '/forum/add'
              ? activeColor
              : inactiveColor
          }
        >
          Add Forum
        </Text>
      </Stack>
    </Stack>
  )
}