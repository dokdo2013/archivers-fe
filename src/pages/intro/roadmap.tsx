import {
  Text,
  Container,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import Link from "next/link";

const IntroRoadmap = () => {
  return (
    <Container maxW="1000px" p={4}>
      <Breadcrumb fontWeight="medium" fontSize="xs">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/intro">
            서비스 안내
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="#">
            로드맵
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading as="h1" fontSize={"2xl"} mt={1}>
        로드맵
      </Heading>

      <Text mt={4}>
        로드맵은 개발 중인 기능과 개발 예정인 기능을 보여주는 페이지입니다. 혼자
        개발하다보니 작업 일정 등은 예정보다 지연될 수 있습니다. 또 아래 목록에
        없는 기능이 추가될 수도 있습니다. 유연하게 처리할 예정이니 이 점 양해
        부탁드립니다.
      </Text>

      <Box mt={8}>
        <Heading as="h2" fontSize={"xl"} mb={4}>
          🚀 현재 개발 중인 기능
        </Heading>

        <Text mb={8}>
          <Text mb={2}>
            아래 기능들은 현재 개발 중이며, 완료되는 대로 서비스에 적용될
            예정입니다.
          </Text>
          <UnorderedList>
            <ListItem>삭제된 영상을 자동으로 감지하여 DB에서 삭제</ListItem>
            <ListItem>
              클립 명예의전당 - 매일 생성된 클립들 중 최고 조회수
            </ListItem>
            <ListItem>통합검색 기능</ListItem>
          </UnorderedList>
        </Text>

        <Heading as="h2" fontSize={"xl"} mb={4}>
          👀 개발 예정인 기능
        </Heading>

        <Text mb={8}>
          <Text mb={2}>
            아래 기능들은 개발 예정이며, 우선순위에 따라 개발될 예정입니다.
          </Text>
          <UnorderedList>
            <ListItem>유튜브 영상 지원</ListItem>
            <ListItem>멤버별 페이지 제작</ListItem>
            <ListItem>VOD 리스트 페이지 페이지네이션 기능 추가</ListItem>
            <ListItem>로그인 기능 (로그인 수단 미확정)</ListItem>
            <ListItem>
              피드 고도화 (SNS 형식) - 로그인 기능이 선행 작업
            </ListItem>
            <ListItem>플레이리스트 기능 - 로그인 기능이 선행 작업</ListItem>
            <ListItem>트위치 멤버 클립 지원 (유달린)</ListItem>
            <ListItem>
              기존 트위치 시절 클립 지원 (허락하는 멤버 한정, 트윕 클립)
            </ListItem>
            <ListItem>
              클립 이상형월드컵 기능 - 플레이리스트 기능이 선행 작업
            </ListItem>
            <ListItem>커뮤니티 기능 - 로그인 기능이 선행 작업</ListItem>
            <ListItem>레븐 방송일정 캘린더 표시</ListItem>
            <ListItem>방송공지 페이지 고도화</ListItem>
          </UnorderedList>
        </Text>

        <Heading as="h2" fontSize={"xl"} mb={4}>
          🤔 검토 중인 기능
        </Heading>

        <Text mb={8}>
          <Text mb={2}>
            아래 기능들은 개발이 확정되지 않았으며, 검토 중인 기능입니다.
          </Text>
          <UnorderedList>
            <ListItem>실시간 채팅 기능</ListItem>
            <ListItem>안드로이드/iOS 모바일 앱 제작</ListItem>
            <ListItem>개인화 추천 기능</ListItem>
            <ListItem>클립/다시보기 시청 페이지</ListItem>
            <ListItem>클립/다시보기 시청 기록</ListItem>
            <ListItem>클립/다시보기 댓글/좋아요 등 커뮤니티 기능</ListItem>
            <ListItem>클립 시청 끝나면 다음 클립 이어서 재생</ListItem>
          </UnorderedList>
        </Text>
      </Box>
    </Container>
  );
};

export default IntroRoadmap;
