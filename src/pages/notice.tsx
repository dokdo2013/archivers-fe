import { useGetLive } from "@/fetchers/get-live";
import { useGetNotices } from "@/fetchers/get-notices";
import { getBjInfo, showTime } from "@/utils/util";
import { ChevronUpIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Container,
  Fade,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useWindowScroll } from "@mantine/hooks";
import dayjs from "dayjs";
import Link from "next/link";

const NoticePage = () => {
  const { data, isLoading } = useGetNotices({
    page: 1,
    per_page: 60,
  });

  const { data: liveBj } = useGetLive("all");
  const backgroundColor = useColorModeValue("gray.200", "gray.700");

  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Box>
      <Container maxW="800px" p={4}>
        <Heading as="h1" fontSize={"2xl"} mt={1}>
          최신 방송공지
        </Heading>

        {data?.map((notice: any, idx) => {
          const liveBjs = liveBj?.map((bj: any) => bj.bj_id);
          const isLive = liveBjs?.includes(notice.bj_id);

          return (
            <a
              key={idx}
              href={notice.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Box
                backgroundColor={backgroundColor}
                p={4}
                my={4}
                borderRadius="lg"
              >
                <Flex mb={4}>
                  <a
                    href={getBjInfo(notice.bj_id)?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Avatar
                      size="md"
                      src={getBjInfo(notice.bj_id)?.profile}
                      name={getBjInfo(notice.bj_id)?.name}
                      className="hover:opacity-75 transition-opacity"
                      style={
                        isLive
                          ? { border: "3px solid #f56565", padding: "2px" }
                          : {}
                      }
                      // border={liveBj?.includes(notice.bj_id) ? "2px" : "0px"}
                      // borderColor={"red.500"}
                      mr={2}
                    />
                  </a>
                  <Flex direction="column" gap={0.5}>
                    <a
                      href={getBjInfo(notice.bj_id)?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Text
                        fontWeight="bold"
                        fontSize="md"
                        className="hover:underline"
                      >
                        {getBjInfo(notice.bj_id)?.name}
                      </Text>
                    </a>
                    <Text fontSize="sm" color={"gray.500"}>
                      {showTime(notice.notice_at)} (
                      {dayjs(notice.notice_at).format("MM/DD HH:mm")})
                    </Text>
                  </Flex>
                </Flex>
                <Heading as="h2" fontSize={"xl"} mb={2}>
                  {notice.title}
                </Heading>
                <Flex justify={"space-between"} gap={4}>
                  <div
                    dangerouslySetInnerHTML={{ __html: notice.content }}
                  ></div>
                  {notice.thumbnail && (
                    <Image
                      src={notice.thumbnail}
                      alt={notice.title}
                      w={"150px"}
                      h={"150px"}
                      fit={"cover"}
                      borderRadius={"lg"}
                    />
                  )}
                </Flex>
              </Box>
            </a>
          );
        })}
      </Container>
      <Fade in={scroll.y > 100}>
        <IconButton
          size={"lg"}
          position={"fixed"}
          bottom={4}
          right={4}
          colorScheme="yellow"
          fontSize={"2xl"}
          isRound={true}
          icon={<ChevronUpIcon />}
          aria-label="맨 위로"
          onClick={() => {
            scrollTo({ y: 0 });
          }}
        />
      </Fade>
    </Box>
  );
};

export default NoticePage;
