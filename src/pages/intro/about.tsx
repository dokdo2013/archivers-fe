import {
  Text,
  Container,
  Heading,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  SimpleGrid,
  Button,
  Box,
  Image,
  useColorModeValue,
  AspectRatio,
} from "@chakra-ui/react";
import Link from "next/link";

const IntroAbout = () => {
  return (
    <Container maxW="1000px" p={4}>
      <Breadcrumb fontWeight="medium" fontSize="xs">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/intro">
            서비스 안내
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="#">
            개발자 정보
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading as="h1" fontSize={"2xl"} mt={1}>
        개발자 정보
      </Heading>

      <Text fontSize={"md"} mt={4}>
        Developed & Designed by{" "}
        <a href="https://github.com/dokdo2013" target="_blank">
          <Text as="span" fontWeight="bold" color={"blue.500"}>
            도연
          </Text>
        </a>
        <Text mt={1}>
          비즈니스 문의 :{" "}
          <a href="mailto:hyeonwoo5342@gmail.com">hyeonwoo5342@gmail.com</a>
        </Text>
      </Text>

      <Heading as="h2" fontSize={"lg"} mt={10}>
        개발자가 만든 다른 레븐 관련 서비스
      </Heading>

      <SimpleGrid spacing={4} mt={4} columns={[1, 1, 1, 2]}>
        <Link href="https://minigame.leaven.team" target="_blank">
          <Flex
            w="100%"
            backgroundColor={useColorModeValue("gray.200", "gray.700")}
            p={4}
            borderRadius={"xl"}
            minH={"130px"}
          >
            <AspectRatio ratio={1 / 1} minW="100px" h="100px">
              <Image src="https://multi.leaven.team/leaven.png" alt="Leaven" />
            </AspectRatio>
            <Flex direction="column" ml={4}>
              <Heading as="h3" fontSize={"lg"}>
                나와 가장 잘 맞는 레븐 멤버는?
              </Heading>
              <Text fontSize={"sm"} mt={2}>
                간단한 질문에 답변하며 나와 가장 잘 맞는 레븐 멤버를 알아보는
                유사 MBTI 미니게임입니다.
              </Text>
              <Text fontSize={"sm"} mt={2}>
                https://minigame.leaven.team
              </Text>
            </Flex>
          </Flex>
        </Link>

        <Link href="https://music.c6h12o6.kr" target="_blank">
          <Flex
            w="100%"
            backgroundColor={useColorModeValue("gray.200", "gray.700")}
            p={4}
            borderRadius={"xl"}
            minH={"130px"}
          >
            <AspectRatio ratio={1 / 1} minW="100px" h="100px">
              <Image
                src="https://camo.githubusercontent.com/2004d47ac22062484064998bb81472c31373b142f5a1d5307690d5a572da26f5/68747470733a2f2f7374617469632d63646e2e6a74766e772e6e65742f656d6f7469636f6e732f76322f3330343433343738342f7374617469632f6c696768742f322e30"
                alt="Leaven"
              />
            </AspectRatio>
            <Flex direction="column" ml={4}>
              <Heading as="h3" fontSize={"lg"}>
                포도당 노래책
              </Heading>
              <Text fontSize={"sm"} mt={2}>
                레븐 멤버 포도당의 노래책 웹사이트입니다.
              </Text>
              <Text fontSize={"sm"} mt={2}>
                https://music.c6h12o6.kr
              </Text>
            </Flex>
          </Flex>
        </Link>

        <Link href="https://gell.leaven.team" target="_blank">
          <Flex
            w="100%"
            backgroundColor={useColorModeValue("gray.200", "gray.700")}
            p={4}
            borderRadius={"xl"}
            minH={"130px"}
          >
            <AspectRatio ratio={1 / 1} minW="100px" h="100px">
              <Image
                src="https://raw.githubusercontent.com/dokdo2013/beadyo97-gellgell/main/src/gellgell.png"
                alt="Leaven"
              />
            </AspectRatio>
            <Flex direction="column" ml={4}>
              <Heading as="h3" fontSize={"lg"}>
                gellgell 게임
              </Heading>
              <Text fontSize={"sm"} mt={2}>
                구슬요 팬게임 gellgell입니다.
              </Text>
              <Text fontSize={"sm"} mt={2}>
                https://gell.leaven.team
              </Text>
            </Flex>
          </Flex>
        </Link>

        <Link href="https://junharry.com" target="_blank">
          <Flex
            w="100%"
            backgroundColor={useColorModeValue("gray.200", "gray.700")}
            p={4}
            borderRadius={"xl"}
            minH={"130px"}
          >
            <AspectRatio ratio={1 / 1} minW="100px" h="100px">
              <Image
                src="https://camo.githubusercontent.com/b2800222164d94729a79a5cdb73c46d50b1bbabdcf9ae820722fd29cd6f7ad8c/68747470733a2f2f696d61676564656c69766572792e6e65742f6c522d7a306666384656653179644569396e632d35512f63353532343431662d663736342d346536372d636433662d3136323164613138316130302f69636f6e323030"
                alt="Leaven"
              />
            </AspectRatio>
            <Flex direction="column" ml={4}>
              <Heading as="h3" fontSize={"lg"}>
                전해리 방송일정
              </Heading>
              <Text fontSize={"sm"} mt={2}>
                레븐 멤버 전해리의 방송일정을 확인할 수 있는 서비스입니다.
              </Text>
              <Text fontSize={"sm"} mt={2}>
                https://junharry.com
              </Text>
            </Flex>
          </Flex>
        </Link>

        <Link href="https://test.junharry.com" target="_blank">
          <Flex
            w="100%"
            backgroundColor={useColorModeValue("gray.200", "gray.700")}
            p={4}
            borderRadius={"xl"}
            minH={"130px"}
          >
            <AspectRatio ratio={1 / 1} minW="100px" h="100px">
              <Image
                src="https://camo.githubusercontent.com/b2800222164d94729a79a5cdb73c46d50b1bbabdcf9ae820722fd29cd6f7ad8c/68747470733a2f2f696d61676564656c69766572792e6e65742f6c522d7a306666384656653179644569396e632d35512f63353532343431662d663736342d346536372d636433662d3136323164613138316130302f69636f6e323030"
                alt="Leaven"
              />
            </AspectRatio>
            <Flex direction="column" ml={4}>
              <Heading as="h3" fontSize={"lg"}>
                해리배치고사
              </Heading>
              <Text fontSize={"sm"} mt={2}>
                레븐 멤버 전해리의 방송 1주년을 기념하기 위해 만든 테스트 게임.
              </Text>
              <Text fontSize={"sm"} mt={2}>
                https://test.junharry.com
              </Text>
            </Flex>
          </Flex>
        </Link>

        <Link href="https://multi.leaven.team" target="_blank">
          <Flex
            w="100%"
            backgroundColor={useColorModeValue("gray.200", "gray.700")}
            p={4}
            borderRadius={"xl"}
            minH={"130px"}
          >
            <AspectRatio ratio={1 / 1} minW="100px" h="100px">
              <Image src="https://multi.leaven.team/leaven.png" alt="Leaven" />
            </AspectRatio>
            <Flex direction="column" ml={4}>
              <Heading as="h3" fontSize={"lg"}>
                레븐 멀티트위치
              </Heading>
              <Text fontSize={"sm"} mt={2}>
                레븐 멤버들의 멀티 플랫폼 방송을 한 곳에서 볼 수 있는
                서비스입니다.
              </Text>
              <Text fontSize={"sm"} mt={2}>
                https://multi.leaven.team
              </Text>
            </Flex>
          </Flex>
        </Link>
      </SimpleGrid>
    </Container>
  );
};

export default IntroAbout;
