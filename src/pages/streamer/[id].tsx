import { TwipClipLogo } from "@/components/logo/TwipClipLogo";
import VideoCard from "@/components/card/VideoCard";
import { serverGetStreamerByName } from "@/fetchers/get-streamer";
import { useGetVods } from "@/fetchers/get-vods";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps(context: any) {
  const { id, tab, space } = context.query;
  const { host } = context.req.headers;

  if (!id || !host) {
    context.res.statusCode = 404;
    return {
      props: {
        statusCode: 404,
        streamer: null,
      },
    };
  } else if (Array.isArray(id)) {
    context.res.statusCode = 404;
    return {
      props: {
        statusCode: 404,
        streamer: null,
      },
    };
  }

  const isHttps = host.includes("localhost") ? false : true;
  const streamer = await serverGetStreamerByName(host, id, isHttps, space || 1);

  if (!streamer) {
    context.res.statusCode = 404;
    return {
      props: {
        statusCode: 404,
        streamer: null,
      },
    };
  }

  return {
    props: {
      statusCode: 200,
      streamer,
    },
  };
}

const StreamerPage = ({ streamer }: any) => {
  const router = useRouter();
  const { id, tab, space } = router.query;
  const isLightMode = useColorModeValue(true, false);

  const [currentTab, setCurrentTab] = useState(tab || "vod");

  const { data, error, isLoading } = useGetVods({
    page: 1,
    per_page: 1000,
    user_id: streamer ? (streamer?.id as string) : "undefined",
    space: Number(space) || 1,
  });

  return (
    <>
      <Head>
        <title>{`${streamer?.twitch_display_name} - Archivers`}</title>
        <meta
          name="description"
          content={`${streamer?.twitch_display_name} (${streamer?.twitch_name}) - Archivers`}
        />
        <meta
          property="og:title"
          content={`${streamer?.twitch_display_name} - Archivers`}
        />
        <meta
          property="og:description"
          content={`${streamer?.twitch_display_name} (${streamer?.twitch_name}) - Archivers`}
        />
        <meta property="og:image" content={streamer?.profile_image_url} />
        <meta
          property="og:url"
          content={`https://archivers.in/streamer/${streamer?.twitch_name}`}
        />
      </Head>
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

        <Flex mt={8} gap={2}>
          <Button
            colorScheme="blue"
            variant={currentTab === "vod" ? "solid" : "outline"}
            onClick={() => {
              setCurrentTab("vod");
              router.push(`/streamer/${id}?tab=vod`);
            }}
          >
            다시보기
          </Button>
          <Button
            colorScheme="blue"
            variant={currentTab === "clip" ? "solid" : "outline"}
            onClick={() => {
              window.open(
                `https://vod.twip.kr/creator/${streamer?.twitch_name}`
              );
            }}
          >
            <Flex gap={2}>
              <Box w={100}>
                <TwipClipLogo isLightMode={isLightMode} />
              </Box>
              <ExternalLinkIcon color={isLightMode ? "purple" : "white"} />
            </Flex>
          </Button>
          <Button
            isDisabled
            colorScheme="blue"
            variant={currentTab === "info" ? "solid" : "outline"}
            onClick={() => {
              setCurrentTab("info");
              router.push(`/streamer/${id}?tab=info`);
            }}
          >
            정보 (준비중)
          </Button>
        </Flex>

        {currentTab === "vod" ? (
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
            <SimpleGrid
              columns={5}
              spacing={5}
              minChildWidth="200px"
              w={"100%"}
            >
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
        ) : (
          <div></div>
        )}
      </Container>
    </>
  );
};

export default StreamerPage;
