# RGT_ASSIGNMET

## 프로젝트 소개

온라인 서점을 위한 웹 애플리케이션.  
이 애플리케이션으로 검색하고, 상세 정보를 보고 편집하며, 각 책의 판매 수량을 확인할수 있습니다.

프론트엔드는 Next.js로 구현했으며, 백엔드 부분은 Next.js api routes로 구현했습니다.
DB는 MOGODB를 사용하였습니다.


## 기술 스택

<p>
<img src="https://img.shields.io/badge/typescript-3178C6?&logo=typescript&logoColor=white"  alt="typescript">
<img src="https://img.shields.io/badge/pnpm-F69220?&logo=pnpm&logoColor=white" alt="pnpm">
<img src="https://img.shields.io/badge/Next.js-000000?&logo=Next.js&logoColor=white"  alt="Next.js">
<img src="https://img.shields.io/badge/TanStackQuery-FF4154?&logo=ReactQuery&logoColor=white" alt="TanStackQuery">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?&logo=tailwindcss&logoColor=white" alt="tailwindcss">
<img src="https://img.shields.io/badge/shadcnui-000000?&logo=shadcnui&logoColor=white" alt="shadcnui">
<img src="https://img.shields.io/badge/zod-3E67B1?&logo=zod&logoColor=white" alt="zod">
<img src="https://img.shields.io/badge/eslint-4B32C3?&logo=eslint&logoColor=white" alt="eslint">
<img src="https://img.shields.io/badge/MongoDB-47A248?&logo=MongoDB&logoColor=white" alt="MongoDB">
<img src="https://img.shields.io/badge/vercel-000000?&logo=vercel&logoColor=white" alt="vercel">
</p>

## 구현 기능

### 1. 프론트엔드 (Next.js)

1.  책 목록 페이지 구현

- 페이지네이션 적용 (한 페이지당 10개 항목)
- 제목과 저자로 필터링할 수 있는 검색 기능 구현

2. 책 상세 정보 페이지/뷰 구현
3. 책 추가/제거 및 수량 조절 기능

### 2. 백엔드 (Next.js API routes)

1. 데이터베이스와 통신하는 기본적인 RESTful API 설계 및 구현

- 책 목록 조회 (GET/api/books)
- 책 상세 정보 조회 (GET /api/books/ id)
- 책 추가 (POST /api/books)
- 책 정보 수정 (PUT /api/books/:id)
- 책 삭제 (DELETE/api/books/:id)



## 프로젝트 아키텍쳐

![alt text](image.png)


## 프로젝트 상세 설명
- 외부와 소통하는 액션 코드들은 actions폴더에 fetchBooks.ts에 모두 모아 전반적인 코드에서 액션을 따로 분리하여 배치하였습니다.
- 페이지네이션과 필터링을 통한 검색기능과 같은 계산들은 hooks로 빼두어 따로 관리하였습니다. 또한 useMemo를 통해 계산 결과 캐싱하여, 비용이 많이 드는 계산의 결과를 메모이제이션하여 불필요한 재계산을 방지하도록 했습니다.
- 백엔드 역할을 하는 api routes 들은 pages/api/books에서 처리하도록 했습니다.
- 프로젝트 반응 속도를 높이기 위해 배포 vercel.json의 `regions`를 "icn1"(인천)으로 설정했습니다.
- 전체적 타입관리는 zod를 통해서 하여 데이터 검증과 타입 안전성을 강화하였습니다.

## DB

![alt text](image-1.png)

## 실행 방법

```sh
$ git clone https://github.com/theo-jin/RGT_assignment.git
$ pnpm install
$ pnpm run dev
```

## 배포 링크

241207 현재 배포는 되어있으나 배포환경에서 작동하지 못합니다. 로컬에서는 정상 작동중입니다. 감사합니다.
241208 배포환경에서 정상작동되지 않았던 문제 해결했습니다.

https://rgt-assignment.vercel.app/
