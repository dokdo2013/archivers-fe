import StreamerCard from "@/components/card/StreamerCard";
import VideoCard from "@/components/card/VideoCard";
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
  Container,
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

const StreamerPage = () => {
  const router = useRouter();
  let query = router.query;
  const space = query.space ? Number(query.space) : 1;

  const { data: streamers, isLoading: isStreamerLoading } =
    useGetStreamers(space);

  const mainColor = useColorModeValue("gray.100", "gray.700");

  return (
    <>
      <Head>
        <title>아카이버스 스트리머 - Archivers</title>
      </Head>

      <Container p={4} maxW="container.lg">
        <Flex align={"center"} justify={"space-between"} mb={5} wrap={"wrap"}>
          <Heading as="h1" size="md">
            녹화 대상 스트리머 ({streamers?.length}명)
          </Heading>
          <Link href="https://tgd.kr/s/seju22/71871184" target="_blank">
            <Button size="sm" variant={"solid"} colorScheme="blue">
              신청하기
            </Button>
          </Link>
        </Flex>

        {isStreamerLoading && <div>Loading...</div>}
        <SimpleGrid minChildWidth={"160px"} spacing={2} mt={4}>
          {streamers?.map((streamer) => (
            <StreamerCard streamer={streamer} key={streamer.id} space={space} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default StreamerPage;
