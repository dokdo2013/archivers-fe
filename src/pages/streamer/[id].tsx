import StreamerCard from "@/components/StreamerCard";
import VideoCard from "@/components/VideoCard";
import UpdateInfo from "@/constants/update.constant";
import { useGetLive } from "@/fetchers/get-live";
import { useGetNotices } from "@/fetchers/get-notices";
import { useGetStreamer, useGetStreamerByName } from "@/fetchers/get-streamer";
import { useGetStreamers } from "@/fetchers/get-streamers";
import { useGetTwapiName } from "@/fetchers/get-twapi-name";
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
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const StreamerPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: streamer, isLoading: isStreamerLoading } = useGetStreamerByName(
    id as string
  );

  const { data, error, isLoading } = useGetVods({
    page: 1,
    per_page: 1000,
    user_id: streamer ? (streamer?.id as string) : "undefined",
  });

  return (
    <>
      <Container p={4} maxW="container.lg">
        <Flex gap={3} align={"center"}>
          <a
            href={`https://twitch.tv/${streamer?.twitch_name}`}
            target="_blank"
          >
            <Avatar
              name={streamer?.twitch_name}
              src={streamer?.profile_image_url}
              size={"md"}
            />
          </a>
          <Flex wrap={"wrap"} align={"flex-end"} gap={2}>
            <Heading as="h1" size="lg">
              {streamer?.twitch_display_name}
            </Heading>
            <Text fontSize={"sm"} color={"gray.500"}>
              {streamer?.twitch_name}
            </Text>
          </Flex>
        </Flex>

        <Flex direction={"column"} w={"100%"} mt={8}>
          {isLoading && (
            <Flex align={"center"} justify="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Flex>
          )}
          <SimpleGrid columns={5} spacing={5} minChildWidth="200px" w={"100%"}>
            {data?.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
            {data &&
              data.length < 10 &&
              [...Array(10 - data.length)].map((_, i) => <Box key={i} />)}
          </SimpleGrid>

          {data && data.length === 0 ? (
            <Flex justify={"center"}>
              <Text>아직 다시보기가 없어요 😢</Text>
            </Flex>
          ) : (
            <></>
          )}
        </Flex>
      </Container>
    </>
  );
};

export default StreamerPage;
