import { useGetStreamer } from "@/fetchers/get-streamer";
import { showTime } from "@/utils/util";
import { AspectRatio, Box, Flex, Img, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const VideoTypeBadge = (type: {
  type: "vod" | "live" | "clip" | undefined;
}) => {
  let typeText = "";
  let typeColor = "";

  switch (type?.type) {
    case "vod":
      typeText = "다시보기";
      typeColor = "blue.500";
      break;
    case "live":
      typeText = "LIVE";
      typeColor = "red.500";
      break;
    case "clip":
      typeText = "클립";
      typeColor = "orange.500";
      break;
    default:
      typeText = "";
      break;
  }

  return (
    <>
      <Box
        backgroundColor={typeColor}
        position={"absolute"}
        color={"white"}
        borderRadius={"lg"}
        top={1}
        left={1}
        zIndex={99}
        fontSize={"sm"}
        className="px-2 py-1 block w-[-webkit-max-content] leading-[normal]"
      >
        {typeText}
      </Box>
    </>
  );
};

const getLiveThumbnailAddress = (streamer: any) => {
  return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${streamer?.twitch_name}-320x180.jpg`;
};

const VideoCard = (video: any) => {
  const date = showTime(video?.start_at);

  let link = video?.is_live
    ? `/live/${video?.stream_id}`
    : `/vod/${video?.stream_id}`;
  if (video?.space_id !== 1) {
    link += `?space=${video?.space_id}`;
  }

  let streamerLink = `/streamer/${video?.streamer_id}`;
  if (video?.space_id !== 1) {
    streamerLink += `?space=${video?.space_id}`;
  }

  const { data: streamer } = useGetStreamer(
    video?.streamer_id,
    video?.space_id
  );

  const isThumbnail = true;
  const thumbnailImageUrl = video.thumbnail_url.replace("public", "320x180");
  const imageUrl = video.is_live
    ? getLiveThumbnailAddress(streamer)
    : isThumbnail
    ? thumbnailImageUrl
    : video.thumbnail_url;

  return (
    <Flex>
      <div key={video.id} className="w-full">
        <Link href={link} className="relative min-h-[140px]">
          <VideoTypeBadge type={video.is_live ? "live" : "vod"} />
          <Flex>
            <AspectRatio ratio={16 / 9} w={"100%"}>
              <Image
                src={imageUrl}
                alt={video.title}
                fill
                className="rounded-lg bg-gray-100"
                loading="lazy"
              />
            </AspectRatio>
          </Flex>
        </Link>
        <Flex direction={"row"} mt={2} gap={2}>
          <Link
            // href={
            //   isLive
            //     ? `https://twitch.tv/${streamer?.twitch_id}`
            //     : `/streamer/${streamer?.twitch_name}`
            // }
            href={streamerLink}
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
                <Link href={streamerLink}>{streamer?.twitch_display_name}</Link>
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
