import { showBjName, showTime } from "@/utils/util";
import { Flex, Image, Tag, Text } from "@chakra-ui/react";

const VideoTypeBadge = (type: any) => {
  return (
    <>
      <Tag
        size="sm"
        colorScheme={type?.type === "review" ? "blue" : "yellow"}
        borderRadius="lg"
        position={"absolute"}
        variant="solid"
        top={1}
        left={1}
      >
        {type?.type === "review" ? "다시보기" : "클립"}
      </Tag>
      {/* {type?.type === "review" ? (
        <div className="absolute bg-indigo-500 text-white rounded-md px-2 py-1 text-sm top-1 left-1">
          다시보기
        </div>
      ) : (
        <div className="absolute bg-amber-500 text-white rounded-md px-2 py-1 text-sm top-1 left-1">
          클립
        </div>
      )} */}
    </>
  );
};

const VideoCard = (video: any) => {
  // const date = dayjs(video?.uploaded_at).format("YYYY/MM/DD HH:mm");
  const date = showTime(video?.uploaded_at);
  const bjName = showBjName(video?.bj_id);

  return (
    <Flex>
      <a href={video.link} target="_blank" className="relative">
        <div key={video.id}>
          <VideoTypeBadge type={video.type} />
          <Image src={video.thumbnail} alt={video.title} borderRadius="lg" />
          <Text noOfLines={2}>{video.title}</Text>
          <Flex gap={2}>
            <Text fontSize="xs">{bjName}</Text>
            <Text fontSize="xs">{date}</Text>
          </Flex>
        </div>
      </a>
    </Flex>
  );
};

export default VideoCard;
