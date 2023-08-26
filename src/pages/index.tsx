import VideoCard from "@/components/VideoCard";
import { useGetVideos } from "@/fetchers/get-videos";
import { Button, Flex, Image, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const IndexPage = () => {
  // pagination with query
  const router = useRouter();
  const { page } = router.query;

  const { data, error, isLoading } = useGetVideos({
    page: Number(page) || 1,
  });

  useEffect(() => {
    if (!page) {
      router.push("/?page=1");
    }
  }, [page]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <SimpleGrid columns={5} spacing={5} minChildWidth="240px">
        {data?.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </SimpleGrid>

      <Flex justify={page === "1" ? "flex-end" : "space-between"} mt={10}>
        {page !== "1" && (
          <Button
            onClick={() => router.push(`/?page=${Number(page) - 1}`)}
            justifyContent={""}
          >
            ← 이전 페이지
          </Button>
        )}
        {data?.length && data?.length === 60 && (
          <Button onClick={() => router.push(`/?page=${Number(page) + 1}`)}>
            다음 페이지 →
          </Button>
        )}
      </Flex>
    </div>
  );
};

export default IndexPage;
