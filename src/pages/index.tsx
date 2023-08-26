import VideoCard from "@/components/VideoCard";
import { useGetLive } from "@/fetchers/get-live";
import { useGetVideos } from "@/fetchers/get-videos";
import { getBjInfo } from "@/utils/util";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

const IndexPage = () => {
  // pagination with query
  const router = useRouter();
  const { page } = router.query;

  const { data, error, isLoading } = useGetVideos({
    page: Number(page) || 1,
  });

  const { data: liveBj } = useGetLive("all");
  const mainColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    if (!page && page === "") {
      router.push("/?page=1");
    }
  }, [page, router]);

  return (
    <div>
      {liveBj && liveBj.length > 0 && (
        <Box mb={5}>
          <Heading as="h2" size="md" mb={5}>
            LIVE 방송중!
          </Heading>

          <Flex direction={"row"} mt={2} gap={2}>
            {liveBj &&
              liveBj.length > 0 &&
              liveBj?.map((bj: any) => (
                <a
                  href={`https://play.afreecatv.com/${bj?.bj_id}`}
                  target="_blank"
                  className="min-w-[36px] min-h-[36px]"
                  key={bj?.id}
                >
                  <Flex
                    backgroundColor={mainColor}
                    py={2}
                    px={3}
                    borderRadius="lg"
                    gap={2}
                  >
                    <Image
                      src={getBjInfo(bj?.bj_id)?.profile}
                      alt={getBjInfo(bj?.bj_id)?.name}
                      borderRadius="full"
                      border={"2px solid #f56565"}
                      p={"2px"}
                      width={14}
                      height={14}
                    />
                    <Flex direction={"column"} justify={"space-between"}>
                      <Text fontSize="xs" color="#f56565" fontWeight="bold">
                        LIVE
                      </Text>

                      <Text fontSize="lg" fontWeight={"bold"}>
                        {getBjInfo(bj?.bj_id)?.name}
                      </Text>
                      <Text fontSize="xs">
                        뱅온 {dayjs(bj?.updated_at).format("HH시 mm분")} ~
                      </Text>
                    </Flex>
                  </Flex>
                </a>
              ))}
          </Flex>
        </Box>
      )}

      <Heading as="h2" size="md" mb={5}>
        최신 영상
      </Heading>
      {isLoading && <div>Loading...</div>}
      <SimpleGrid columns={5} spacing={5} minChildWidth="240px">
        {data?.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </SimpleGrid>

      <Flex
        justify={
          page === "1" || page === undefined ? "flex-end" : "space-between"
        }
        mt={10}
      >
        {page !== "1" && page !== undefined && (
          <Button
            onClick={() => router.push(`/?page=${Number(page) - 1}`)}
            justifyContent={""}
          >
            ← 이전 페이지
          </Button>
        )}
        {data?.length && data?.length === 60 && (
          <Button
            onClick={() => router.push(`/?page=${Number(page || 1) + 1}`)}
          >
            다음 페이지 →
          </Button>
        )}
      </Flex>
    </div>
  );
};

export default IndexPage;
