import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";

import {
  MediaCommunitySkin,
  MediaLiveIndicator,
  MediaOutlet,
  MediaPlayer,
  MediaPoster,
} from "@vidstack/react";
import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Spinner,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useGetVod } from "@/fetchers/get-vod";
import { useGetStreamer } from "@/fetchers/get-streamer";
import { showTime } from "@/utils/util";
import Link from "next/link";

const VodId = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: vod, error, isLoading } = useGetVod(id as string);
  const {
    data: streamer,
    error: streamerError,
    isLoading: isStreamerLoading,
  } = useGetStreamer(vod?.streamer_id);

  return (
    <div>
      <Container maxW="container.xl" p={0}>
        {vod ? (
          <MediaPlayer
            title={vod?.title}
            // src={`http://localhost:3000/video/stream/${id}.m3u8`}
            src={`https://archivers.app/media-api/video/stream/${id}.m3u8`}
            poster={vod?.thumbnail_url}
            // thumbnails="https://media-files.vidstack.io/sprite-fight/thumbnails.vtt"
            aspectRatio={16 / 9}
            crossorigin=""
          >
            <MediaOutlet>
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
        ) : (
          <div></div>
        )}

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
              <Heading as="h1" size="md">
                {vod?.is_live ? (
                  <Badge colorScheme="red" fontSize={"md"} mr={2}>
                    LIVE
                  </Badge>
                ) : (
                  <div></div>
                )}
                {vod?.title}
              </Heading>

              <Flex wrap={"wrap"} gap={1}>
                <Link
                  href={`/streamer/${streamer?.twitch_name}`}
                  className="hover:underline"
                >
                  <Text fontSize={"md"} color={"gray.500"} fontWeight={"bold"}>
                    {streamer?.twitch_display_name}
                  </Text>
                </Link>

                <Text fontSize={"md"} color={"gray.500"}>
                  ㆍ
                </Text>

                <Text fontSize={"md"} color={"gray.500"}>
                  {showTime(vod?.start_at)}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex mt={2} align={"center"}></Flex>
        </Box>

        {vod?.is_live ? (
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
        )}
      </Container>
    </div>
  );
};

export default VodId;
