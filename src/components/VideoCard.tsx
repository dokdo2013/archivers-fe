import { useGetLive } from "@/fetchers/get-live";
import { getBjInfo, showBjName, showTime } from "@/utils/util";
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
  const bjInfo = getBjInfo(video?.bj_id);

  const { data: isLive } = useGetLive(video?.bj_id);

  return (
    <Flex>
      <div key={video.id}>
        <a href={video.link} target="_blank" className="relative">
          <VideoTypeBadge type={video.type} />
          <Image src={video.thumbnail} alt={video.title} borderRadius="lg" />
        </a>
        <Flex direction={"row"} mt={2} gap={2}>
          <a
            href={
              isLive ? `https://play.afreecatv.com/${bjInfo.id}` : bjInfo?.link
            }
            target="_blank"
            className="min-w-[36px] min-h-[36px]"
          >
            <Image
              src={bjInfo?.profile}
              alt={bjInfo?.name}
              borderRadius="full"
              width={9}
              height={9}
              style={
                isLive ? { outline: "2px solid #f56565", padding: "2px" } : {}
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
