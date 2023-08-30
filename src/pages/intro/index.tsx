import { Button, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Link from "next/link";

const IntroIndex = () => {
  return (
    <Container maxW="1000px" mt={4}>
      <Heading as="h1" fontSize={"xl"}>
        서비스 안내
      </Heading>

      <Text fontSize={"md"} mt={4}>
        레븐 Portal 서비스는 세계최강 버츄얼 크루 레븐 멤버들의 방송과 콘텐츠를
        보다 편리하게 즐기기 위해 만들어진 서비스입니다. 본 서비스는 레븐 공식
        서비스가 아닌 개인이 만든 서비스입니다.
      </Text>

      {/* 메뉴 모음 */}
      <Heading as="h2" fontSize={"lg"} mt={8}>
        메뉴 바로가기
      </Heading>

      <SimpleGrid minChildWidth={"300px"} spacing={4} mt={4}>
        <Link href="/intro/detail">
          <Button w="100%">기능별 소개</Button>
        </Link>
        <Link href="/intro/roadmap">
          <Button w="100%">로드맵</Button>
        </Link>
        <Link href="/intro/update">
          <Button w="100%">업데이트 내역</Button>
        </Link>
        <Link href="/intro/report">
          <Button w="100%">버그 리포트 및 기능 제안</Button>
        </Link>
        <Link href="/intro/contribute">
          <Button w="100%">기여하기</Button>
        </Link>
        <Link href="/intro/about">
          <Button w="100%">개발자 정보</Button>
        </Link>
      </SimpleGrid>
    </Container>
  );
};

export default IntroIndex;
