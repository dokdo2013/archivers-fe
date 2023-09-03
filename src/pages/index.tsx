import VideoCard from "@/components/VideoCard";
import UpdateInfo from "@/constants/update.constant";
import { useGetLive } from "@/fetchers/get-live";
import { useGetNotices } from "@/fetchers/get-notices";
import { useGetVideos } from "@/fetchers/get-videos";
import { getBjInfo, getStreamingLink, showTime } from "@/utils/util";
import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const IndexPage = () => {
  const { data, error, isLoading } = useGetVideos({
    page: 1,
  });

  const { data: liveBj } = useGetLive("all");

  const { data: notice, isLoading: isNoticeLoading } = useGetNotices({
    page: 1,
    per_page: 10,
  });

  const mainColor = useColorModeValue("gray.200", "gray.700");

  // 업데이트 일자가 3일 이내
  const hasUpdate = dayjs().diff(dayjs(UpdateInfo[0].date), "day") < 3;

  return (
    <>
      {hasUpdate && (
        <Link href="/intro/update">
          <Alert status="info" flexWrap={"wrap"}>
            <AlertIcon />
            <Text as="span" fontWeight="bold">
              업데이트
            </Text>
            <Text as="span" ml={2}>
              {UpdateInfo[0].title}
            </Text>
            <Text
              as="span"
              ml={2}
              fontSize={"xs"}
              fontWeight={"normal"}
              color={"gray.500"}
            >
              {showTime(UpdateInfo[0].date)}
            </Text>
          </Alert>
        </Link>
      )}
      <Box p={4}>
        {liveBj && liveBj.length > 0 && (
          <Box mb={5}>
            <Heading as="h2" size="md" mb={5}>
              LIVE 방송중!
            </Heading>

            {/* <Flex direction={"row"} mt={2} gap={2} flexWrap={"wrap"}> */}
            <SimpleGrid
              columns={[1, 2, 3, 4, 6, 8]}
              spacing={2}
              // minChildWidth="180px"
              // maxBlockSize={"240px"}
            >
              {liveBj &&
                liveBj.length > 0 &&
                liveBj?.map((bj: any) => (
                  <a
                    href={`${getStreamingLink(
                      getBjInfo(bj?.bj_id)?.provider || "afreeca",
                      bj?.bj_id
                    )}`}
                    target="_blank"
                    className="min-w-[36px] min-h-[36px]"
                    key={bj?.id}
                  >
                    <Flex
                      backgroundColor={mainColor}
                      py={2}
                      px={3}
                      borderRadius="lg"
                      gap={2}
                    >
                      <Image
                        src={getBjInfo(bj?.bj_id)?.profile}
                        alt={getBjInfo(bj?.bj_id)?.name}
                        borderRadius="full"
                        border={"2px solid #f56565"}
                        p={"2px"}
                        width={14}
                        height={14}
                      />
                      <Flex direction={"column"} justify={"space-between"}>
                        <Text fontSize="xs" color="#f56565" fontWeight="bold">
                          LIVE
                        </Text>

                        <Text fontSize="lg" fontWeight={"bold"}>
                          {getBjInfo(bj?.bj_id)?.name}
                        </Text>
                        <Text fontSize="xs">
                          뱅온 {dayjs(bj?.updated_at).format("HH시 mm분")} ~
                        </Text>
                      </Flex>
                    </Flex>
                  </a>
                ))}
              {/* </Flex> */}
            </SimpleGrid>
          </Box>
        )}

        <Flex align={"center"} justify={"space-between"} mb={5}>
          <Heading as="h2" size="md">
            최신 방송공지
          </Heading>
          <Link href="/notice">
            <Button size="xs" variant={"outline"} colorScheme="blue">
              + 더 보기
            </Button>
          </Link>
        </Flex>

        <Box overflow={"hidden"}>
          <Flex direction={"row"} gap={2} wrap={"nowrap"} w="400vw" mb={5}>
            {notice?.map((notice: any) => {
              return (
                <a href={notice.link} target="_blank" key={notice.id}>
                  <Box
                    backgroundColor={mainColor}
                    p={4}
                    minW={"200px"}
                    h="100%"
                    maxH={"240px"}
                    borderRadius="lg"
                  >
                    <Flex mb={4}>
                      <a
                        href={getBjInfo(notice.bj_id)?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Avatar
                          src={getBjInfo(notice.bj_id)?.profile}
                          name={getBjInfo(notice.bj_id)?.name}
                          size={"md"}
                          style={
                            liveBj?.find(
                              (bj: any) => bj?.bj_id === notice?.bj_id
                            )
                              ? { border: "2px solid #f56565", padding: "2px" }
                              : {}
                          }
                        />
                      </a>
                      <Flex direction="column" ml={2} gap={0.5}>
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
                      <Text noOfLines={3}>
                        <div
                          className="break-all"
                          dangerouslySetInnerHTML={{ __html: notice.content }}
                        ></div>
                      </Text>
                      {notice.thumbnail && (
                        <Image
                          src={notice.thumbnail}
                          alt={notice.title}
                          w={"70px"}
                          h={"70px"}
                          borderRadius={"lg"}
                        />
                      )}
                    </Flex>
                  </Box>
                </a>
              );
            })}
          </Flex>
        </Box>

        <Flex align={"center"} justify={"space-between"} mb={5}>
          <Heading as="h2" size="md">
            최신 VOD
          </Heading>
          <Link href="/vod">
            <Button size="xs" variant={"outline"} colorScheme="blue">
              + 더 보기
            </Button>
          </Link>
        </Flex>

        {isLoading && <div>Loading...</div>}
        <SimpleGrid columns={5} spacing={5} minChildWidth="240px">
          {data?.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default IndexPage;
