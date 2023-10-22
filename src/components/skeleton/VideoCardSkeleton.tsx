import { AspectRatio, Flex, Skeleton } from "@chakra-ui/react";

const VideoCardSkeleton = () => {
  return (
    <Flex>
      <div className="w-full">
        <div className="relative min-h-[140px]">
          <Flex>
            <AspectRatio ratio={16 / 9} w={"100%"}>
              <Skeleton width="100%" height="100%" borderRadius={"0.5rem"} />
            </AspectRatio>
          </Flex>
        </div>
        <Flex direction={"row"} mt={2} gap={2}>
          <div className="min-w-[36px] min-h-[36px]">
            <Skeleton width="100%" height="100%" borderRadius="100px" />
          </div>
          <Flex direction={"column"} gap={1}>
            <Skeleton width="120px" height="17.5px" />
            <Flex gap={2}>
              <Skeleton width="60px" height="13px" />
              <Skeleton width="40px" height="13px" />
            </Flex>
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
};

export default VideoCardSkeleton;
