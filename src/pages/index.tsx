import StreamerCard from "@/components/card/StreamerCard";
import VideoCard from "@/components/card/VideoCard";
import StreamerCardSkeleton from "@/components/skeleton/StreamerCardSkeleton";
import VideoCardSkeleton from "@/components/skeleton/VideoCardSkeleton";
import UpdateInfo from "@/constants/update.constant";
import { useGetLive } from "@/fetchers/get-live";
import { useGetNotices } from "@/fetchers/get-notices";
import { useGetStreamers } from "@/fetchers/get-streamers";
import { useGetVods } from "@/fetchers/get-vods";
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
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const IndexPage = () => {
  const router = useRouter();
  let query = router.query;
  const space = query.space ? Number(query.space) : 1;
  const spaceParam = space === 1 ? "" : `?space=${space}`;

  const { data, error, isLoading } = useGetVods({
    page: 1,
    space,
  });

  const { data: streamers, isLoading: isStreamerLoading } =
    useGetStreamers(space);

  return (
    <>
      <Head>
        <title>아카이버스 - Archivers</title>
        <meta
          name="description"
          content="무료 트위치 다시보기 서비스 아카이버스. 스트리머나 매니저가 신청하면 무료 트위치 다시보기 녹화 & 실시간 다시보기 서비스를 제공합니다."
        />
      </Head>
      <Box p={4}>
        <Flex align={"center"} justify={"space-between"} mb={5} wrap={"wrap"}>
          <Heading as="h2" size="md">
            녹화 대상 스트리머 ({streamers?.length}명)
          </Heading>
          <Flex gap={2}>
            <Link href="https://tgd.kr/s/seju22/71871184" target="_blank">
              <Button size="xs" variant={"solid"} colorScheme="blue">
                신청하기
              </Button>
            </Link>
            <Link href="/streamer">
              <Button size="xs" variant={"outline"} colorScheme="blue">
                + 더 보기
              </Button>
            </Link>
          </Flex>
        </Flex>

        {/* {isStreamerLoading && <div>Loading...</div>} */}
        <Flex gap={2} mb={5} wrap={"wrap"} maxH={"140px"} overflow={"hidden"}>
          {isStreamerLoading
            ? [...Array(8)].map((_, i) => <StreamerCardSkeleton key={i} />)
            : streamers?.map((streamer) => (
                <StreamerCard
                  streamer={streamer}
                  key={streamer.id}
                  space={space}
                />
              ))}
          {/* {streamers?.map((streamer) => (
            <StreamerCard streamer={streamer} key={streamer.id} />
          ))} */}
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

        <SimpleGrid columns={5} spacing={5} minChildWidth="240px">
          {isLoading
            ? [...Array(40)].map((_, i) => <VideoCardSkeleton key={i} />)
            : data?.map((video) => <VideoCard key={video.id} {...video} />)}

          {/* For Dummy Space */}
          {data &&
            data.length < 10 &&
            [...Array(10 - data.length)].map((_, i) => <Box key={i} />)}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default IndexPage;
