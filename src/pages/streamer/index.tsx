import StreamerCard from "@/components/StreamerCard";
import VideoCard from "@/components/VideoCard";
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
import Link from "next/link";

const StreamerPage = () => {
  const { data, error, isLoading } = useGetVods({
    page: 1,
  });

  const { data: streamers, isLoading: isStreamerLoading } = useGetStreamers();

  const mainColor = useColorModeValue("gray.100", "gray.700");

  return (
    <>
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
            <StreamerCard streamer={streamer} key={streamer.id} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default StreamerPage;
