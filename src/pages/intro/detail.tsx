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

const IntroDetail = () => {
  return (
    <Container maxW="1000px" mt={4} p={4}>
      <Breadcrumb fontWeight="medium" fontSize="xs">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/intro">
            서비스 안내
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="#">
            기능별 소개
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading as="h1" fontSize={"2xl"} mt={1}>
        기능별 소개
      </Heading>

      <Text fontSize={"md"} mt={4}>
        준비중입니다.
      </Text>
    </Container>
  );
};

export default IntroDetail;
