import "@/styles/globals.css";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import Link from "next/link";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

interface Props {
  children: React.ReactNode;
}

const Links = [
  {
    name: "홈",
    href: "/",
    paths: ["/"],
  },
  {
    name: "피드",
    href: "/feed",
    paths: ["/feed"],
  },
  {
    name: "클립",
    href: "/clip",
    paths: ["/clip"],
  },
  {
    name: "다시보기",
    href: "/review",
    paths: ["/review"],
  },
  {
    name: "유튜브",
    href: "/youtube",
    paths: ["/youtube"],
  },
  {
    name: "방송 공지사항",
    href: "/notice",
    paths: ["/notice"],
  },
  {
    name: "서비스 안내",
    href: "/intro",
    paths: [
      "/intro",
      "/intro/detail",
      "/intro/roadmap",
      "/intro/update",
      "/intro/report",
      "/intro/contribute",
      "/intro/about",
    ],
  },
];

const NavLink = ({ data }: any) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const bgColor = useColorModeValue("gray.200", "gray.700");

  return (
    // <Link href={data.href}>
    <Box
      as={NextLink}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      // bg={currentPath === data.href ? bgColor : ""}
      bg={data.paths.includes(currentPath) ? bgColor : ""}
      href={data.href}
    >
      {data.name}
    </Box>
    // </Link>
  );
};

function AppLayout() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>LEAVEN Portal</title>
        <meta name="description" content="LEAVEN Portal" />
        <link rel="icon" href="https://multi.leaven.team/leaven.png" />
      </Head>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        position={"fixed"}
        width="100%"
        zIndex={999}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link href="/">
              <Flex align="center" gap={2}>
                <Image
                  src="https://multi.leaven.team/leaven.png"
                  alt="Leaven"
                  w={10}
                />
                <Heading as="h1" size="md">
                  레븐 Portal
                </Heading>
              </Flex>
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link, idx) => (
                <NavLink data={link} key={idx} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            {/* <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu> */}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link, idx) => (
                <NavLink data={link} key={idx} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AppLayout />
      <Box p={4} pt={"80px"}>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
