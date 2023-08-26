# Leaven Portal

버츄얼 최강크루 Leaven의 대부분을 모아서 보여주기 위한 사이트입니다. '아무 손 대지 않아도 돌아가는 사이트'가 되는게 최종 목표입니다.

[https://leaven.team](https://leaven.team)

## 특징
- 백엔드 서버를 따로 두지 않고 Next.js만으로 모든 비즈니스 로직을 처리합니다.
- 정기적인 크론성 작업을 통해 데이터가 자동으로 적재되고, 만료 처리될 수 있도록 합니다.

## 내부 구현
### 기술 스택
- Framework : Next.js
- Design System : Chakra UI & Tailwind CSS
- Data Fetch : SWR
- Database : Supabase (Database, Auth)

### 크롤링 방법
- 아프리카TV 내부 API를 따와서 Next API로 엔드포인트를 만들고, Kubernetes 내부에서 호출하는 Cronjob으로 실행시킵니다.
- 외부를 통한 접근을 막기 위해 Cloudflare 단에서 접근을 제한합니다. (내부 호출은 Cloudflare를 안 타니까 차단되지 않음)

### CI/CD
- [쿠버네티스 클러스터](https://github.com/dokdo2013/haenu-cluster)에 배포
- Github Actions에서 Docker Build해서 Docker Hub에 업로드
- Github Actions에서 GitOps Repo에 이미지 태그 변경하면 ArgoCD가 트리거되어 파드 배포
