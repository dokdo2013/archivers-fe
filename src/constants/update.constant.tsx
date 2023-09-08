import { ListItem, UnorderedList } from "@chakra-ui/react";

const UpdateInfo = [
  {
    date: "2023-09-08 12:00",
    title: "비에타 공지게시판 변경 반영",
    content: (
      <div>
        <UnorderedList>
          <ListItem>
            비에타 공지 게시판이 변경되어 전체 공지사항 업데이트가 되지 않는
            문제를 해결하였습니다.
          </ListItem>
        </UnorderedList>
      </div>
    ),
  },
  {
    date: "2023-09-03 17:30",
    title: "방송공지 기능 추가",
    content: (
      <div>
        <UnorderedList>
          <ListItem>
            이제 아프리카TV 방송국에 공지가 올라오면 레븐 Portal에서도 확인할 수
            있습니다. 상단 방송공지 탭에서 확인할 수 있습니다.
          </ListItem>
          <ListItem>
            메인 페이지에 최신 방송공지가 표시되도록 업데이트되었습니다.
          </ListItem>
          <ListItem>
            iOS 브라우저에서 클립/다시보기 Badge가 표시되지 않던 오류가
            수정되었습니다.
          </ListItem>
          <ListItem>
            이미지 로딩시 레이아웃이 깨지던 문제를 수정했습니다.
          </ListItem>
        </UnorderedList>
      </div>
    ),
  },
  {
    date: "2023-09-03 10:00",
    title: "VOD 리스트 페이지 고도화",
    content: (
      <div>
        <UnorderedList>
          <ListItem>
            기존에 클립, 다시보기, VOD를 각각 별도의 페이지로 나누어 보여주던
            것을 통합하여 한 페이지에서 모두 볼 수 있도록 고도화되었습니다.
          </ListItem>
          <ListItem>
            VOD 분류, 멤버별 분류, 정렬, 검색 등의 기능이 VOD 페이지에
            추가되었습니다.
          </ListItem>
        </UnorderedList>
      </div>
    ),
  },
  {
    date: "2023-09-02 00:30",
    title: "www.leaven.team 주소 접속불가 현상 수정",
    content: (
      <div>
        <UnorderedList>
          <ListItem>
            www.leaven.team 주소로 접속되지 않던 오류가 수정되었습니다.
          </ListItem>
        </UnorderedList>
      </div>
    ),
  },
  {
    date: "2023-09-01 23:00",
    title: "서비스 안내 페이지 일부 업데이트",
    content: (
      <div>
        <UnorderedList>
          <ListItem>
            서비스 안내 페이지 내 로드맵 페이지가 개발되었습니다.
          </ListItem>
          <ListItem>
            서비스 안내 페이지 내 버그 리포트 및 기능 제안 페이지가
            개발되었습니다.
          </ListItem>
          <ListItem>미개발된 페이지에 안내가 추가되었습니다.</ListItem>
        </UnorderedList>
      </div>
    ),
  },
  {
    date: "2023-08-31 22:00",
    title: "[신규 기능] 피드 업데이트",
    content: (
      <div>
        <UnorderedList>
          <ListItem>
            피드 기능이 새로 추가되었습니다. 피드 기능은 SNS처럼 스크롤을 통해
            새로 올라온 콘텐츠들을 감상할 수 있습니다. 현재 베타 버전으로 앞으로
            다양한 업데이트가 진행될 예정입니다.
          </ListItem>
          <ListItem>서비스 안내 탭이 계속 업데이트되고 있습니다.</ListItem>
          <ListItem>
            서비스 라이센스가 GNU GPL v3로 확정 공표되었습니다.
          </ListItem>
          <ListItem>
            트위치 생방송 여부도 확인할 수 있도록 업데이트되었습니다.
          </ListItem>
        </UnorderedList>
      </div>
    ),
  },
  {
    date: "2023-08-27 22:00",
    title: "레븐 Portal로 서비스명 변경",
    content: (
      <div>
        <UnorderedList>
          <ListItem>
            기존 Leaven VOD 서비스에서 레븐 Portal로 서비스명이 변경되었습니다.
          </ListItem>
          <ListItem>클립/다시보기 메뉴가 추가되었습니다.</ListItem>
          <ListItem>
            메인 페이지에 라이브 중인 멤버가 보이도록 업데이트되었습니다.
          </ListItem>
        </UnorderedList>
      </div>
    ),
  },
  {
    date: "2023-08-26 18:00",
    title: "베타 첫 버전 출시!",
    content: (
      <div>
        <UnorderedList>
          <ListItem>
            첫 베타 버전이 출시되었습니다. 이제 레븐 멤버들의 방송과 콘텐츠를
            더욱 편리하게 즐길 수 있습니다.
          </ListItem>
          <ListItem>
            라이브 중인 멤버를 메인페이지와 영상 카드에서 확인할 수 있습니다.
          </ListItem>
        </UnorderedList>
      </div>
    ),
  },
];

export default UpdateInfo;
