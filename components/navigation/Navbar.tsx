import { Flex, useColorModeValue, useColorMode, Button, Menu, MenuButton, MenuList, MenuGroup, MenuDivider, MenuItem, Avatar, IconButton, Stack, HStack, Switch, Text } from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { ForumLogoFull } from "../logo";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token-name');
    if (token) {
      setUsername(token);
    }
  }, []);

  return (
    <Flex
      pos={'sticky'} top={0} zIndex={1}
      w={'full'}
      h={14}
      py={10}
      bg={useColorModeValue('white', 'gray.800')}
      px={{
        base: 0,
        md: 10,
      }}
      align={'center'}
      justify={'space-between'}
    >
      <HStack ps={{ md: 5 }} spacing={{ base: 0, md: 3 }}>
        <IconButton
          aria-label='Hamburger-Icon'
          icon={<HamburgerIcon />}
          size={'lg'}
          display={{ base: 'flex', md: 'none' }}
          variant={'ghost'}
        />
        <ForumLogoFull />
      </HStack>

      <HStack
        pe={{ base: 5, lg: 10 }}
        spacing={{ base: 3, md: 7 }}
      >
        <HStack
          border={'1px'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          bg={useColorModeValue('gray.100', 'gray.900')}
          p={2}
          rounded={'full'}
        >
          <MoonIcon />
          <Switch id="color-change" onChange={toggleColorMode} />
          <SunIcon />
        </HStack>
        <Menu isLazy>
          <MenuButton>
            <Avatar
              size={{ base: 'sm', md: 'sm' }}
              name={username}
            />
          </MenuButton>
          <MenuList p={3} >
            <MenuItem
              as={Button}
              bg={'red'}
              color={'white'}
              _hover={{
                bg: 'red'
              }}
              onClick={() => router.replace('/auth/logout')}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  )
}