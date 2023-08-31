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

const IntroReport = () => {
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
            버그 리포트 및 기능 제안
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading as="h1" fontSize={"2xl"} mt={1}>
        버그 리포트 및 기능 제안
      </Heading>

      <Text fontSize={"md"} mt={4}>
        준비중입니다.
      </Text>
    </Container>
  );
};

export default IntroReport;
