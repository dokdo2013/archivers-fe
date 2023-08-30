import VideoCard from "@/components/VideoCard";
import { useGetLive } from "@/fetchers/get-live";
import { useGetVideos, useGetVideosInfinite } from "@/fetchers/get-videos";
import { getBjInfo } from "@/utils/util";
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect } from "react";

const Feed = () => {
  // const { data, error, isLoading } = useGetVideos({
  //   page: 1,
  //   per_page: 10,
  // });

  const { data, size, setSize, error, isLoading } = useGetVideosInfinite({
    type: "all",
    per_page: 10,
  });

  const backgroundColor = useColorModeValue("gray.200", "gray.700");

  const { data: liveBj } = useGetLive("all");

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <Container maxW="900px" mt={2}>
        <Heading as="h2" size="md">
          피드 (Beta)
        </Heading>
        <Text fontSize={"md"} mt={2} mb={8}>
          아직은 최신순으로만 정렬되어 있습니다. 추후에는 트위터 피드처럼 정렬이
          가능하도록 업데이트할 예정입니다.
        </Text>

        <div>
          {data?.map((videos: any, idx) => {
            return (
              <div key={idx}>
                {videos?.map((video: any) => {
                  console.log("test", video);

                  const date = dayjs(video?.uploaded_at).format(
                    "YYYY/MM/DD HH:mm"
                  );
                  const bjName = getBjInfo(video?.bj_id)?.name;
                  const bjInfo = getBjInfo(video?.bj_id);
                  const isLive = liveBj?.find(
                    (bj: any) => bj?.bj_id === video?.bj_id
                  );

                  return (
                    <Box
                      key={video.id}
                      backgroundColor={backgroundColor}
                      p={4}
                      mb={4}
                      borderRadius={"lg"}
                    >
                      <AspectRatio ratio={16 / 9}>
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://vod.afreecatv.com/player/${video?.video_id}/embed?showChat=false&autoPlay=false&mutePlay=false`}
                          allowFullScreen={true}
                          allow="clipboard-write"
                        ></iframe>
                      </AspectRatio>
                      <Flex direction={"row"} mt={3} gap={2}>
                        <a
                          href={
                            isLive
                              ? `https://play.afreecatv.com/${bjInfo?.id}`
                              : bjInfo?.link
                          }
                          target="_blank"
                          className="min-w-[36px] min-h-[36px]"
                        >
                          <Image
                            src={bjInfo?.profile}
                            alt={bjInfo?.name}
                            borderRadius="full"
                            width={12}
                            height={12}
                            style={
                              isLive
                                ? {
                                    border: "2px solid #f56565",
                                    padding: "2px",
                                  }
                                : {}
                            }
                          />
                        </a>
                        <Flex direction={"column"} gap={0.5}>
                          <Text
                            fontSize="lg"
                            noOfLines={2}
                            className="hover:underline"
                          >
                            <a href={video.link} target="_blank">
                              {video.title}
                            </a>
                          </Text>
                          <Flex gap={2}>
                            <Text fontSize="sm" className="hover:underline">
                              <a href={bjInfo?.link} target="_blank">
                                {bjName}
                              </a>
                            </Text>
                            <Text fontSize="sm">{date}</Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Box>
                  );
                })}
              </div>
            );
          })}
          <Button onClick={() => setSize(size + 1)} w={"100%"} my={4}>
            더보기
          </Button>
        </div>

        {/* {data?.map((video: any) => {
          console.log("test", video);

          const date = dayjs(video?.uploaded_at).format("YYYY/MM/DD HH:mm");
          const bjName = getBjInfo(video?.bj_id)?.name;
          const bjInfo = getBjInfo(video?.bj_id);
          const isLive = liveBj?.find((bj: any) => bj?.bj_id === video?.bj_id);

          return (
            <Box
              key={video.id}
              backgroundColor={backgroundColor}
              p={4}
              mb={4}
              borderRadius={"lg"}
            >
              <AspectRatio ratio={16 / 9}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://vod.afreecatv.com/player/${video?.video_id}/embed?showChat=false&autoPlay=false&mutePlay=false`}
                  allowFullScreen={true}
                  allow="clipboard-write"
                ></iframe>
              </AspectRatio>
              <Flex direction={"row"} mt={3} gap={2}>
                <a
                  href={
                    isLive
                      ? `https://play.afreecatv.com/${bjInfo?.id}`
                      : bjInfo?.link
                  }
                  target="_blank"
                  className="min-w-[36px] min-h-[36px]"
                >
                  <Image
                    src={bjInfo?.profile}
                    alt={bjInfo?.name}
                    borderRadius="full"
                    width={12}
                    height={12}
                    style={
                      isLive
                        ? { border: "2px solid #f56565", padding: "2px" }
                        : {}
                    }
                  />
                </a>
                <Flex direction={"column"} gap={0.5}>
                  <Text fontSize="lg" noOfLines={2} className="hover:underline">
                    <a href={video.link} target="_blank">
                      {video.title}
                    </a>
                  </Text>
                  <Flex gap={2}>
                    <Text fontSize="sm" className="hover:underline">
                      <a href={bjInfo?.link} target="_blank">
                        {bjName}
                      </a>
                    </Text>
                    <Text fontSize="sm">{date}</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          );
        })} */}
      </Container>
      {/* <SimpleGrid columns={5} spacing={5} minChildWidth="240px"></SimpleGrid> */}
    </div>
  );
};

export default Feed;
