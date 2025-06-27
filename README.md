# OSSCA Next.js Team2 프로젝트

## 📝 개요(Overview)
이 프로젝트는 **Next.js** 기반의 모던 웹 애플리케이션으로, 사용자 인증, 친구 관리, 할 일(ToDo) 관리 등 다양한 기능을 제공합니다. 최신 프론트엔드 기술과 클린 아키텍처, 효율적인 개발 프로세스를 도입하여, 유지보수성과 확장성을 극대화하는 것이 목표입니다.

---

## ❓ 문제의식(Problem Statement)
- 기존의 단순한 ToDo 서비스는 실시간 협업, 인증, 데이터 보안, 사용자 경험 등에서 한계가 있습니다.
- 본 프로젝트는 **실제 서비스 수준의 인증/인가**, **실시간 데이터 동기화**, **반응형 UI/UX**, **확장 가능한 구조**를 갖춘 ToDo/친구 관리 플랫폼을 구현하고자 합니다.
- 이를 통해 팀/개인 생산성 향상과, 모던 웹 개발의 베스트 프랙티스를 실습합니다.

---

## 🏗️ 사용 기술 (Technology)
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend:** Firebase Admin SDK, Firestore
- **인증:** Firebase Authentication (JWT 기반, 쿠키 저장)
- **CI/CD:** GitHub Actions
- **기타:** ESLint, Prettier, Conventional Commits

### 👾 시스템 아키텍처 (Architecture)

![image](https://github.com/user-attachments/assets/2edf992d-3d6f-4264-a049-8cf08e1374dc)


- **Browser(User):** 사용자가 브라우저에서 서비스에 접근합니다.
- **Next.js:**
  - **Middleware:** 인증 토큰을 검사하여 접근 제어를 수행합니다.
  - **Client-Side:** 사용자 인터페이스 및 클라이언트 로직을 담당합니다.
  - **Server-Side (BFF):** API 요청을 받아 서버에서 데이터 가공 및 인증 처리를 수행합니다.
- **Firebase:**
  - **Auth:** 회원가입/로그인 및 토큰 발급, 인증 처리
  - **DB (No-sql):** Firestore를 통한 데이터 저장 및 조회

> 각 계층은 토큰 기반 인증, API 통신, SSR/CSR, 데이터 동기화 등 역할에 따라 분리되어 있습니다.

---

## 📦 주요 폴더 구조

```
src/
  app/           # Next.js app 디렉토리 (라우트, API 등)
    (main)/      # 메인 대시보드, 페이지
    (auth)/      # 인증 관련 레이아웃
    api/         # RESTful API 엔드포인트
      friend/    # 친구 추가/조회 API
      todo/      # 할 일 관리 API
      user/      # 사용자 정보 API
      upload/    # 파일 업로드 API
      find-user/ # 사용자 검색 API
    login/       # 로그인 페이지
    register/    # 회원가입 페이지
  components/    # UI 및 기능별 컴포넌트
    src/
      main/      # 대시보드, 할 일, 친구 목록 등 주요 UI
        todolist/ # 할 일 추가/폼 등 서브컴포넌트
      friends/   # 친구 관련 컴포넌트
      login/     # 로그인 관련 컴포넌트
      register/  # 회원가입 관련 컴포넌트
      ui/        # 공통 UI 컴포넌트(버튼, 카드 등)
  lib/           # 백엔드/유틸리티 라이브러리
    backend/     # 서버/DB 연동, 인증, Firestore 액션
      firebase-admin.ts # 서버용 Firebase Admin SDK
      read-firebase.ts  # Firestore 읽기 유틸
      write-firebase.ts # Firestore 쓰기 유틸
      auth-actions.ts   # 인증 관련 액션
    firebase.ts         # 클라이언트용 Firebase SDK
    utils.ts            # 공통 유틸 함수
```

---

## ✨ 주요 기능
- **회원가입/로그인:** Firebase Authentication 기반, JWT 토큰을 쿠키에 저장하여 SSR/CSR 모두 인증 지원
- **친구 관리:** 친구 추가, 친구 목록 조회 API 및 UI
- **할 일 관리:** 할 일 추가/삭제/완료 상태 변경, 개별 상태 동기화, 서버 반영
- **반응형 UI/UX:** Tailwind CSS, Shadcn UI 활용
- **CI/CD:** GitHub Actions로 자동화된 빌드/테스트/배포

---

## 🚀 시작하기

### 개발 서버 실행
```bash
npm install
npm run dev
```

### CI/CD 파일 정의
[cicd.yml](https://github.com/chan3785/2025-OSSCA-Next.js-team2/blob/main/.github/workflows/cicd.yml)

---

# git flow 구현
> https://danielkummer.github.io/git-flow-cheatsheet/index.ko_KR.html


