import {
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

const IntroIndex = () => {
  return (
    <Container maxW="1000px" p={4}>
      <Heading as="h1" fontSize={"xl"}>
        문의
      </Heading>

      <Text fontSize={"md"} mt={4}>
        Archivers 서비스에 대한 문의/답변은{" "}
        <a
          href="https://tgd.kr/s/seju22"
          target="_blank"
          className="text-blue-500"
        >
          트게더(https://tgd.kr/s/seju22)
        </a>
        에서 진행됩니다. 트게더 공지사항을 읽은 뒤 적절한 게시판에 글을
        남겨주시면 확인 후 답변드리겠습니다. 혼자서 운영하는 서비스라 답변이
        다소 늦을 수 있으니 양해 부탁드립니다.
      </Text>

      <SimpleGrid minChildWidth={"200px"} spacing={4} mt={4}>
        <a href="https://tgd.kr/s/seju22?category=71867638" target="_blank">
          <Button w="100%">공지사항</Button>
        </a>
        <a href="https://tgd.kr/s/seju22?category=71867644" target="_blank">
          <Button w="100%">다시보기 신청</Button>
        </a>
        <a href="https://tgd.kr/s/seju22?category=71867650" target="_blank">
          <Button w="100%">문의하기</Button>
        </a>
        <a href="https://tgd.kr/s/seju22?category=71867653" target="_blank">
          <Button w="100%">버그제보/건의</Button>
        </a>
      </SimpleGrid>

      {/* 메뉴 모음 */}
      <Heading as="h1" fontSize={"xl"} mt={10}>
        후원
      </Heading>

      <Text fontSize={"md"} mt={4}>
        Archivers 서비스는 개발자의 사비와 여러분의 후원금으로 운영되고
        있습니다. 가능한 무료로 많은 스트리머의 다시보기를 남겨드리기 위해
        여러분의 후원이 꼭 필요합니다. 더 많은 스트리머의 다시보기를 안정적으로
        제공하기 위해 아래의 TWIP 링크에서 후원해주시면 감사하겠습니다.
      </Text>

      <Flex align={"center"} justify={"center"}>
        <a href="https://twip.kr/seju22" target="_blank">
          <Button w="100%" mt={4} colorScheme="purple" px={10}>
            TWIP으로 후원하기
          </Button>
        </a>
      </Flex>

      <Heading as="h2" fontSize={"md"} mt={8}>
        Special Thanks to
      </Heading>

      <Text fontSize={"md"} mt={4}>
        <Text as="span" fontSize="sm" color={"gray"}>
          (여기에 후원자 명단이 들어갈 예정입니다.)
        </Text>
      </Text>
    </Container>
  );
};

export default IntroIndex;
