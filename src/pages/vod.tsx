import VideoCard from "@/components/VideoCard";
import { useGetVideos } from "@/fetchers/get-videos";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  useColorModeValue,
  useMediaQuery,
  Text,
  Spinner,
  Fade,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDebouncedValue, useWindowScroll } from "@mantine/hooks";
import { ChevronUpIcon } from "@chakra-ui/icons";
import leaven from "@/constants/leaven.constant";

const VodPage = () => {
  // pagination with query
  const router = useRouter();
  const { page } = router.query;
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebouncedValue(searchKeyword, 200);
  const [searchOptions, setSearchOptions] = useState({
    type: "all",
    bj_id: [] as string[],
    sort: "reg_date", // reg_date, view_cnt
    sort_type: "desc", // asc, desc
  });

  const { data, error, isLoading } = useGetVideos({
    type: searchOptions.type,
    page: Number(page) || 1,
    bj_id:
      searchOptions.bj_id.length > 0 ? searchOptions.bj_id.join(",") : "all",
    sort: searchOptions.sort,
    sort_type: searchOptions.sort_type,
    keyword: debouncedSearchKeyword,
  });

  useEffect(() => {
    if (!page && page === "") {
      router.push("?page=1");
    }
  }, [page, router]);

  // Media
  const [isSmall] = useMediaQuery("(min-width: 1088px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });

  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Box p={4}>
      <Flex
        flexWrap={"nowrap"}
        justifyContent={"space-between"}
        gap={4}
        direction={isSmall ? "row" : "column"}
      >
        <Box
          backgroundColor={useColorModeValue("gray.100", "gray.700")}
          p={4}
          borderRadius={"lg"}
          minW={"280px"}
          maxW={isSmall ? "340px" : "100%"}
          // w={"fit-content"}
          h={"fit-content"}
          pos={isSmall ? "sticky" : "static"}
          top={isSmall ? "80px" : "0"}
        >
          <Heading as="h2" fontSize={"lg"} mb={4}>
            📺 VOD 분류
          </Heading>

          <Flex gap={2} flexWrap={"wrap"} mb={2}>
            <Button
              colorScheme="yellow"
              size={"sm"}
              variant={searchOptions.type === "all" ? "solid" : "outline"}
              onClick={() => {
                const newSearchOptions = { ...searchOptions };
                newSearchOptions.type = "all";
                setSearchOptions(newSearchOptions);
              }}
            >
              전체
            </Button>
            <Button
              colorScheme="yellow"
              size={"sm"}
              variant={searchOptions.type === "clip" ? "solid" : "outline"}
              onClick={() => {
                const newSearchOptions = { ...searchOptions };
                newSearchOptions.type = "clip";
                setSearchOptions(newSearchOptions);
              }}
            >
              클립
            </Button>
            <Button
              colorScheme="yellow"
              size={"sm"}
              variant={searchOptions.type === "review" ? "solid" : "outline"}
              onClick={() => {
                const newSearchOptions = { ...searchOptions };
                newSearchOptions.type = "review";
                setSearchOptions(newSearchOptions);
              }}
            >
              다시보기
            </Button>
            <Button
              colorScheme="yellow"
              size={"sm"}
              variant={searchOptions.type === "youtube" ? "solid" : "outline"}
              onClick={() => {
                const newSearchOptions = { ...searchOptions };
                newSearchOptions.type = "youtube";
                setSearchOptions(newSearchOptions);
              }}
            >
              유튜브
            </Button>
          </Flex>

          <Text fontSize="xs" color="gray.500" mb={2}>
            목록 중 1개를 선택해주세요 (중복 불가)
          </Text>

          <Heading as="h2" fontSize={"lg"} mt={8} mb={4}>
            💎 멤버별 분류
          </Heading>

          <Flex gap={2} flexWrap={"wrap"} mb={2}>
            <Button
              colorScheme="yellow"
              size={"sm"}
              variant={searchOptions.bj_id.length === 0 ? "solid" : "outline"}
              onClick={() => {
                const newSearchOptions = { ...searchOptions };
                newSearchOptions.bj_id = [];
                setSearchOptions(newSearchOptions);
              }}
            >
              전체
            </Button>
            {leaven.map((member) => (
              <Button
                key={member.id}
                colorScheme="yellow"
                size={"sm"}
                variant={
                  searchOptions.bj_id.includes(member.id) ? "solid" : "outline"
                }
                onClick={() => {
                  const newSearchOptions = { ...searchOptions };
                  if (newSearchOptions.bj_id.includes(member.id)) {
                    newSearchOptions.bj_id = newSearchOptions.bj_id.filter(
                      (id) => id !== member.id
                    );
                  } else {
                    newSearchOptions.bj_id.push(member.id);
                  }
                  setSearchOptions(newSearchOptions);
                }}
              >
                {member.name}
              </Button>
            ))}
          </Flex>

          <Text fontSize="xs" color="gray.500" mb={2}>
            VOD를 볼 멤버를 선택해주세요 (중복 가능)
          </Text>

          <Heading as="h2" fontSize={"lg"} mt={8} mb={4}>
            🚥 정렬
          </Heading>

          <Flex gap={2} flexWrap={"wrap"} mb={2}>
            <Button
              colorScheme="yellow"
              size={"sm"}
              variant={
                searchOptions.sort === "reg_date" &&
                searchOptions.sort_type === "desc"
                  ? "solid"
                  : "outline"
              }
              onClick={() => {
                const newSearchOptions = { ...searchOptions };
                newSearchOptions.sort = "reg_date";
                newSearchOptions.sort_type = "desc";
                setSearchOptions(newSearchOptions);
              }}
            >
              최신순
            </Button>
            <Button
              colorScheme="yellow"
              size={"sm"}
              variant={
                searchOptions.sort === "reg_date" &&
                searchOptions.sort_type === "asc"
                  ? "solid"
                  : "outline"
              }
              onClick={() => {
                const newSearchOptions = { ...searchOptions };
                newSearchOptions.sort = "reg_date";
                newSearchOptions.sort_type = "asc";
                setSearchOptions(newSearchOptions);
              }}
            >
              오래된순
            </Button>
            <Button
              colorScheme="yellow"
              size={"sm"}
              variant={searchOptions.sort === "view_cnt" ? "solid" : "outline"}
              onClick={() => {
                const newSearchOptions = { ...searchOptions };
                newSearchOptions.sort = "view_cnt";
                newSearchOptions.sort_type = "desc";
                setSearchOptions(newSearchOptions);
              }}
            >
              조회수순
            </Button>
          </Flex>

          <Text fontSize="xs" color="gray.500" mb={2}>
            정렬 방식을 선택해주세요 (중복 불가)
          </Text>

          <Heading as="h2" fontSize={"lg"} mt={8} mb={4}>
            🔍 제목 검색
          </Heading>

          <Input
            placeholder="제목을 입력해주세요"
            mb={2}
            color={useColorModeValue("gray.700", "gray.200")}
            borderColor={useColorModeValue("yellow.400", "yellow.200")}
            variant={"filled"}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />

          <Text fontSize="xs" color="gray.500" mb={2}>
            검색할 키워드를 입력해주세요. 입력하면 자동으로 적용됩니다.
          </Text>
        </Box>

        <Flex direction={"column"} w={"100%"}>
          {isLoading && (
            <Flex align={"center"} justify="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Flex>
          )}
          <SimpleGrid columns={5} spacing={5} minChildWidth="240px" w={"100%"}>
            {data?.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </SimpleGrid>
          <Flex
            justify={
              page === "1" || page === undefined ? "flex-end" : "space-between"
            }
            my={10}
          >
            {page !== "1" && page !== undefined && (
              <Button
                onClick={() => router.push(`?page=${Number(page) - 1}`)}
                justifyContent={""}
              >
                ← 이전 페이지
              </Button>
            )}
            {data?.length && data?.length === 60 && (
              <Button
                onClick={() => router.push(`?page=${Number(page || 1) + 1}`)}
              >
                다음 페이지 →
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>

      <Fade in={scroll.y > 100}>
        <IconButton
          size={"lg"}
          position={"fixed"}
          bottom={4}
          right={4}
          colorScheme="yellow"
          fontSize={"2xl"}
          isRound={true}
          icon={<ChevronUpIcon />}
          aria-label="맨 위로"
          onClick={() => {
            scrollTo({ y: 0 });
          }}
        />
      </Fade>
    </Box>
  );
};

export default VodPage;
