import { ListItem, UnorderedList } from "@chakra-ui/react";

const UpdateInfo = [
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
