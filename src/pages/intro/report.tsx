import {
  Text,
  Container,
  Heading,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";

const IntroReport = () => {
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
            버그 리포트 및 기능 제안
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading as="h1" fontSize={"2xl"} mt={1}>
        버그 리포트 및 기능 제안
      </Heading>

      {/* <Text fontSize={"md"} mt={4}>
        준비중입니다.
      </Text> */}
      <Box my={6}>
        <iframe
          width="100%"
          height="400px"
          src="https://tally.so/embed/mVQxNy?alignLeft=1&hideTitle=1&dynamicHeight=1"
        ></iframe>
      </Box>
    </Container>
  );
};

export default IntroReport;
