# Leaven VOD

세계 최강 버츄얼 크루 Leaven의 VOD와 클립들을 한 군데서 모아서 보여주기 위한 사이트

[https://vod.leaven.team](https://vod.leaven.team)

## 특징
- 정기적인 크롤링을 통해 데이터를 자체 DB에 수집한다
- 주기적인 확인을 거쳐 삭제되거나 비공개 처리된 영상을 삭제한다

## 내부 구현
### 기술 스택
- Framework : Next.js
- Design System : Chakra UI & Tailwind CSS
- Data Fetch : SWR
- Database : Supabase (Database, Auth)

### 크롤링 방법
- 아프리카TV 내부 API를 따와서 Next API로 엔드포인트를 만들고, Kubernetes 내부에서 호출하는 Cronjob으로 실행시킨다.
- 외부를 통한 접근을 막기 위해 Cloudflare 단에서 접근을 제한한다. (내부 호출은 Cloudflare를 안 타니까 차단되지 않는다)

### CI/CD
- [쿠버네티스 클러스터](https://github.com/dokdo2013/haenu-cluster)에 배포
- Github Actions에서 Docker Build해서 Docker Hub에 업로드
- Github Actions에서 GitOps Repo에 이미지 태그 변경하면 ArgoCD가 트리거되어 파드 배포
