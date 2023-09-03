import UpdateInfo from "@/constants/update.constant";
import {
  Text,
  Container,
  Heading,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Badge,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import Link from "next/link";

const IntroUpdate = () => {
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
            업데이트 내역
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading as="h1" fontSize={"2xl"} mt={1}>
        업데이트 내역
      </Heading>

      <Box mt={6}>
        <Accordion defaultIndex={[0]} allowMultiple>
          {UpdateInfo.map((info, idx) => {
            // 7일 이내의 업데이트는 NEW 뱃지 표시
            const isNew = dayjs().diff(dayjs(info.date), "day") <= 7;

            return (
              <AccordionItem key={idx}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      {info.title}
                      <Flex align="center">
                        <Text fontSize={"sm"} color={"gray.500"}>
                          {info.date}
                        </Text>
                        {isNew && (
                          <Badge ml={2} colorScheme="green" borderRadius={"lg"}>
                            NEW
                          </Badge>
                        )}
                      </Flex>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>{info.content}</AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Box>
    </Container>
  );
};

export default IntroUpdate;
