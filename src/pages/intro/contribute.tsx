import {
  Text,
  Container,
  Heading,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import Link from "next/link";

const IntroContribute = () => {
  return (
    <Container maxW="1000px" mt={4}>
      <Breadcrumb fontWeight="medium" fontSize="xs">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/intro">
            서비스 안내
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="#">
            기여하기
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading as="h1" fontSize={"2xl"} mt={1}>
        기여하기
      </Heading>

      <Text fontSize={"md"} mt={4}>
        레븐 Portal 서비스는 오픈소스 프로젝트입니다. 누구나 기여할 수 있습니다.
        기여하고 싶으신 분은{" "}
        <a href="https://github.com/dokdo2013/leaven-portal" target="_blank">
          <Text as="span" fontWeight="bold" color={"blue.500"}>
            GitHub 저장소
          </Text>
        </a>
        를 참고해주세요.
      </Text>
    </Container>
  );
};

export default IntroContribute;
