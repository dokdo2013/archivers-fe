import { useGetLive } from "@/fetchers/get-live";
import { useGetStreamer } from "@/fetchers/get-streamer";
import { showBjName, showTime } from "@/utils/util";
import {
  AspectRatio,
  Box,
  Flex,
  Image,
  Img,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

const VideoTypeBadge = (type: any) => {
  return (
    <>
      <Box
        backgroundColor={type?.type === "vod" ? "blue.500" : "red.500"}
        position={"absolute"}
        color={"white"}
        borderRadius={"lg"}
        top={1}
        left={1}
        zIndex={99}
        fontSize={"sm"}
        className="px-2 py-1 block w-[-webkit-max-content] leading-[normal]"
      >
        {type?.type === "vod" ? "다시보기" : "LIVE"}
      </Box>
    </>
  );
};

const VideoCard = (video: any) => {
  const date = showTime(video?.start_at);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const link = `/vod/${video?.stream_id}`;

  const { data: streamer } = useGetStreamer(video?.streamer_id);
  // const { data: isLive } = useGetLive(streamer?.twitch_name);

  return (
    <Flex>
      <div key={video.id} className="w-full">
        <Link href={link} className="relative min-h-[140px]">
          <VideoTypeBadge type={video.is_live ? "live" : "vod"} />
          <Flex>
            {!isImgLoaded && (
              <AspectRatio ratio={16 / 9} w={"100%"}>
                <Skeleton borderRadius="lg" w={"100%"} h={"100%"} />
              </AspectRatio>
            )}
            <Img
              src={video.thumbnail_url}
              alt={video.title}
              borderRadius="lg"
              loading="lazy"
              onLoad={() => setIsImgLoaded(true)}
            />
          </Flex>
        </Link>
        <Flex direction={"row"} mt={2} gap={2}>
          <Link
            // href={
            //   isLive
            //     ? `https://twitch.tv/${streamer?.twitch_id}`
            //     : `/streamer/${streamer?.twitch_name}`
            // }
            href={`/streamer/${streamer?.twitch_name}`}
            className="min-w-[36px] min-h-[36px]"
          >
            <Img
              src={streamer?.profile_image_url}
              alt={streamer?.twitch_name}
              borderRadius="full"
              width={9}
              height={9}
              loading="lazy"
              // style={
              //   isLive ? { border: "2px solid #f56565", padding: "2px" } : {}
              // }
            />
          </Link>
          <Flex direction={"column"}>
            <Text noOfLines={2} className="hover:underline">
              <Link href={link}>{video.title}</Link>
            </Text>
            <Flex gap={2}>
              <Text fontSize="xs" className="hover:underline">
                <Link href={`/streamer/${streamer?.twitch_name}`}>
                  {streamer?.twitch_display_name}
                </Link>
              </Text>
              <Text fontSize="xs">{date}</Text>
            </Flex>
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
};

export default VideoCard;
