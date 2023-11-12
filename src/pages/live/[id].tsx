import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";

import {
  MediaCommunitySkin,
  MediaLiveIndicator,
  MediaOutlet,
  MediaPlayer,
} from "@vidstack/react";
import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
  Button,
} from "@chakra-ui/react";
import { serverGetVod } from "@/fetchers/get-vod";
import { serverGetStreamer } from "@/fetchers/get-streamer";
import { showTime } from "@/utils/util";
import Link from "next/link";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { RepeatClockIcon } from "@chakra-ui/icons";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = context.query;
  const id = query.id as string;
  let space = query.space ? Number(query.space) : 1;
  let { host } = context.req.headers;

  console.log(context.req.headers);

  if (!id || !host) {
    context.res.statusCode = 404;
    return {
      props: {
        statusCode: 404,
        vod: null,
        streamer: null,
      },
    };
  } else if (Array.isArray(id)) {
    context.res.statusCode = 404;
    return {
      props: {
        statusCode: 404,
        vod: null,
        streamer: null,
      },
    };
  }

  const isHttps = host.includes("localhost") ? false : true;
  const vod = await serverGetVod(host, id, isHttps);
  const streamer = await serverGetStreamer(
    host,
    vod?.streamer_id,
    isHttps,
    space
  );

  if (!vod || !streamer) {
    context.res.statusCode = 404;
    return {
      props: {
        statusCode: 404,
        vod: null,
        streamer: null,
      },
    };
  }

  // host remove port
  host = host.split(":")[0];

  // if not live -> redirect to vod
  if (!vod.is_live) {
    context.res.statusCode = 301;
    context.res.setHeader("Location", `/vod/${id}`);
    context.res.end();
    return {
      props: {
        statusCode: 301,
        vod,
        streamer,
        host,
      },
    };
  }

  return {
    props: {
      statusCode: 200,
      vod,
      streamer,
      host,
    },
  };
}

const LiveId = ({ vod, streamer, host }: any) => {
  const { id } = useRouter().query;

  // Media
  const [isSmall] = useMediaQuery("(min-width: 768px)", {
    ssr: true,
    fallback: true, // return false on the server, and re-evaluate on the client side
  });

  return (
    <div>
      <Head>
        <title>{`${vod?.title} - Archivers`}</title>
        <meta name="description" content={vod?.title} />
        <meta property="og:title" content={vod?.title} />
        <meta property="og:description" content={vod?.title} />
        <meta
          property="og:image"
          content={`https://archivers.app/api/og?type=vod&id=${id}`}
        />
        <meta property="og:url" content={`https://archivers.app/vod/${id}`} />
        <meta property="twitter:card" content={`${vod?.title} - Archivers`} />
        <meta
          property="twitter:url"
          content={`https://archivers.app/vod/${id}`}
        />
        <meta property="twitter:title" content={vod?.title} />
        <meta property="twitter:description" content={vod?.title} />
        <meta
          property="twitter:image"
          content={`https://archivers.app/api/og?type=vod&id=${id}`}
        />
      </Head>
      <Flex direction={isSmall ? "row" : "column"}>
        <div className="w-full">
          <div>
            <MediaPlayer
              streamType="ll-live"
              title={vod?.title}
              // src={`http://localhost:3000/video/stream/${id}/live.m3u8`}
              src={`https://archivers.app/media-api/video/stream/${id}/live.m3u8`}
              poster={vod?.thumbnail_url}
              // thumbnails="https://media-files.vidstack.io/sprite-fight/thumbnails.vtt"
              aspectRatio={16 / 9}
              autoplay
              crossorigin=""
              className="rounded-tl-none rounded-tr-none"
              // liveEdgeTolerance={20}
            >
              <MediaOutlet className={isSmall && "p-[calc(100vh-180px)_0_0_0]"}>
                <MediaLiveIndicator />
                {/* <MediaPoster alt="Girl walks into sprite gnomes around her friend on a campfire in danger!" /> */}
                {/* <track
              src="https://media-files.vidstack.io/sprite-fight/subs/english.vtt"
              label="English"
              srcLang="en-US"
              kind="subtitles"
              default
            />
            <track
              src="https://media-files.vidstack.io/sprite-fight/chapters.vtt"
              srcLang="en-US"
              kind="chapters"
              default
            /> */}
              </MediaOutlet>
              <MediaCommunitySkin />
            </MediaPlayer>

            <Box mt={3}>
              <Flex gap={2}>
                <Link href={`/streamer/${streamer?.twitch_name}`}>
                  <Avatar
                    name={streamer?.twitch_name}
                    src={streamer?.profile_image_url}
                    size={"md"}
                  />
                </Link>
                <Flex direction={"column"} gap={1}>
                  <Flex gap={2} flexWrap={"wrap"} align="center">
                    <Heading as="h1" size="md">
                      {vod?.title}
                    </Heading>
                    <Link href={`/vod/${id}`}>
                      <Button
                        colorScheme="red"
                        size="xs"
                        leftIcon={<RepeatClockIcon />}
                      >
                        실시간 다시보기
                      </Button>
                    </Link>
                  </Flex>

                  <Flex wrap={"wrap"} gap={1}>
                    <Link
                      href={`/streamer/${streamer?.twitch_name}`}
                      className="hover:underline"
                    >
                      <Text
                        fontSize={"md"}
                        color={"gray.500"}
                        fontWeight={"bold"}
                      >
                        {streamer?.twitch_display_name}
                      </Text>
                    </Link>

                    <Text fontSize={"md"} color={"gray.500"}>
                      ㆍ
                    </Text>

                    <Text fontSize={"md"} color={"gray.500"}>
                      {dayjs(vod?.start_at).format("YYYY/MM/DD HH:mm")}
                      {/* {showTime(vod?.start_at)} */}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex mt={2} align={"center"}></Flex>
            </Box>
          </div>
        </div>

        <div className={isSmall ? "h-[calc(100vh-64px)]" : "w-full h-[400px]"}>
          <iframe
            className={isSmall ? "h-full min-w-[340px]" : "w-full h-full mt-2"}
            src={`https://twitch.tv/embed/${
              streamer.twitch_name
            }/chat?${useColorModeValue("", "darkpopout")}&parent=${
              host || "archivers.app"
            }`}
          ></iframe>
        </div>

        {/* {vod?.is_live ? (
          <Alert status="warning" mt={3} borderRadius={"md"}>
            <AlertIcon />
            <AlertTitle>실시간 다시보기는 알파 버전입니다</AlertTitle>
            <AlertDescription>
              영상 부분 처리 속도에 따라 재생 시간이 최근에 가까울 수록 재생이
              되지 않거나 이상한 소리가 나오는 등 문제가 발생할 수 있습니다.
            </AlertDescription>
          </Alert>
        ) : (
          <div></div>
        )} */}
      </Flex>
    </div>
  );
};

export default LiveId;
