import VideoCard from "@/components/VideoCard";
import UpdateInfo from "@/constants/update.constant";
import { useGetLive } from "@/fetchers/get-live";
import { useGetNotices } from "@/fetchers/get-notices";
import { useGetStreamer } from "@/fetchers/get-streamer";
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

const IndexPage = () => {
  const { data, error, isLoading } = useGetVideos({
    page: 1,
  });

  const { data: streamers, isLoading: isStreamerLoading } = useGetStreamer();

  const { data: notice, isLoading: isNoticeLoading } = useGetNotices({
    page: 1,
    per_page: 10,
  });

  const mainColor = useColorModeValue("gray.100", "gray.700");

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
        <Flex align={"center"} justify={"space-between"} mb={5}>
          <Heading as="h2" size="md">
            녹화 대상 스트리머 (총 {streamers?.length}명)
          </Heading>
          <Link href="/notice">
            <Button size="xs" variant={"outline"} colorScheme="blue">
              신청하기
            </Button>
          </Link>
        </Flex>

        {isStreamerLoading && <div>Loading...</div>}
        <Flex gap={2} mb={5} wrap={"wrap"} maxH={"140px"} overflow={"hidden"}>
          {streamers?.map((streamer) => (
            <Box
              key={streamer.id}
              className={`rounded-lg py-2 px-3`}
              bgColor={mainColor}
            >
              <Link href={`/streamer/${streamer.id}`}>
                <Flex gap={2} align={"center"}>
                  <Avatar
                    name={streamer.twitch_name}
                    src={streamer.profile_image_url}
                    size={"md"}
                  />
                  <Flex direction={"column"} gap={1}>
                    <Heading fontSize={"md"}>
                      {streamer.twitch_display_name}
                    </Heading>
                    <Text fontSize={"xs"} color={"gray.500"}>
                      {streamer.twitch_name}
                    </Text>
                  </Flex>
                </Flex>
              </Link>
            </Box>
          ))}
        </Flex>
        <SimpleGrid columns={5} spacing={5} minChildWidth="240px">
          {/* {data?.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))} */}
        </SimpleGrid>

        <Flex align={"center"} justify={"space-between"} mb={5}>
          <Heading as="h2" size="md">
            최신 다시보기
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
