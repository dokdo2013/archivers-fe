import { useGetLive } from "@/fetchers/get-live";
import { getBjInfo, showBjName, showTime } from "@/utils/util";
import {
  AspectRatio,
  Box,
  Flex,
  Image,
  Img,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const VideoTypeBadge = (type: any) => {
  return (
    <>
      <Box
        backgroundColor={type?.type === "review" ? "blue.500" : "yellow.500"}
        position={"absolute"}
        color={"white"}
        borderRadius={"lg"}
        top={1}
        left={1}
        zIndex={99}
        fontSize={"sm"}
        className="px-2 py-1 block w-[-webkit-max-content] leading-[normal]"
      >
        {type?.type === "review" ? "다시보기" : "클립"}
      </Box>
    </>
  );
};

const VideoCard = (video: any) => {
  // const date = dayjs(video?.uploaded_at).format("YYYY/MM/DD HH:mm");
  const date = showTime(video?.uploaded_at);
  const bjName = showBjName(video?.bj_id);
  const bjInfo = getBjInfo(video?.bj_id);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const { data: isLive } = useGetLive(video?.bj_id);

  return (
    <Flex>
      <div key={video.id} className="w-full">
        <a href={video.link} target="_blank" className="relative min-h-[140px]">
          <VideoTypeBadge type={video.type} />
          <Flex>
            {!isImgLoaded && (
              <AspectRatio ratio={16 / 9} w={"100%"}>
                <Skeleton borderRadius="lg" w={"100%"} h={"100%"} />
              </AspectRatio>
            )}
            <Img
              src={video.thumbnail}
              alt={video.title}
              borderRadius="lg"
              loading="lazy"
              onLoad={() => setIsImgLoaded(true)}
            />
          </Flex>
        </a>
        <Flex direction={"row"} mt={2} gap={2}>
          <a
            href={
              isLive ? `https://play.afreecatv.com/${bjInfo?.id}` : bjInfo?.link
            }
            target="_blank"
            className="min-w-[36px] min-h-[36px]"
          >
            <Img
              src={bjInfo?.profile}
              alt={bjInfo?.name}
              borderRadius="full"
              width={9}
              height={9}
              loading="lazy"
              style={
                isLive ? { border: "2px solid #f56565", padding: "2px" } : {}
              }
            />
          </a>
          <Flex direction={"column"}>
            <Text noOfLines={2} className="hover:underline">
              <a href={video.link} target="_blank">
                {video.title}
              </a>
            </Text>
            <Flex gap={2}>
              <Text fontSize="xs" className="hover:underline">
                <a href={bjInfo?.link} target="_blank">
                  {bjName}
                </a>
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
