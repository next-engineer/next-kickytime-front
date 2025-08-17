# next-kickytime-front

> Kickytime 프론트엔드 – React(리액트) + Vite(바이트) + TypeScript(타입스크립트) 기반 SPA. AWS Cognito 인증 연동, 백엔드 API 호출, S3 + CloudFront 배포.

- **프로젝트명**: Kickytime
- **프로젝트 기간**: 2025-08-01 \~ 2025-08-14

---

## 팀원

| 이름   | GitHub                                                                 |
| ------ | ---------------------------------------------------------------------- |
| 박민지 | [https://github.com/Mminzy22](https://github.com/Mminzy22)             |
| 하영현 | [https://github.com/deepInTheWoodz](https://github.com/deepInTheWoodz) |
| 이혜민 | [https://github.com/hyeminleeee](https://github.com/hyeminleeee)       |
| 구태연 | [https://github.com/taeyeon119](https://github.com/taeyeon119)         |
| 임정우 | [https://github.com/imjwoo](https://github.com/imjwoo)                 |

---

[![Docs: Wiki](https://img.shields.io/badge/docs-Wiki-0366d6)](https://github.com/next-engineer/next-kickytime-front/wiki)

> 자세한 운영/가이드는 GitHub **Wiki**를 참고하세요.

### [📚 Wiki 빠른 링크](https://github.com/next-engineer/next-kickytime-front/wiki)

---

## TL;DR

```bash
# 요구사항: Node.js(노드) 22+, npm(엔피엠)
cp .env.example .env                 # 환경 변수 채우기
npm ci                               # 의존성 설치
npm run dev                          # http://localhost:5173

# 프로덕션 빌드
npm run build                        # dist/ 산출물 생성
npm run preview                      # 로컬 미리보기(배포 에뮬)
```

---

## 1) 개요(Overview)

- **목표**: 관리자가 개설한 풋살 매칭 정보를 사용자에게 제공하고, 로그인 후 **참여/취소**가 가능한 UI 제공
- **인증**: AWS Cognito Hosted UI → Access Token 발급 → 백엔드에 `Authorization: Bearer <token>` 전달
- **라우팅**: React Router(리액트 라우터) 기반 SPA, `/callback`에서 인증 처리

---

## 2) 기술 스택(Tech Stack)

- **프레임워크**: React, Vite, TypeScript
- **상태 관리**: Zustand
- **UI**: MUI
- **품질**: ESLint(이에스린트), Prettier(프리티어), Husky(허스키) + lint-staged(린트-스테이지드)

---

## 3) 환경 변수(Environment Variables)

Vite는 **`VITE_` 접두사**가 붙은 변수만 클라이언트에 노출됩니다.

`.env.example` (예시)

```env
# API 엔드포인트
VITE_API_BASE_URL=http://localhost:8080/api/

# App
VITE_APP_NAME=Kickytime
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_USE_MOCK_DATA=false
VITE_DEBUG_MODE=true

# Cognito 설정
VITE_COGNITO_DOMAIN=your-domain.auth.ap-northeast-2.amazoncognito.com
VITE_COGNITO_CLIENT_ID=YOUR_CLIENT_ID
VITE_REDIRECT_URI=http://localhost:5173/callback
```

**주의 사항**

- 값은 배포 환경별로 `.env.production`, `.env.development` 등에 분리하세요.
- 민감 정보는 리포에 커밋하지 않습니다(예: GitHub Actions 시크릿 사용).

---

## 4) 실행/빌드/검사(Commands)

```bash
npm ci                # 의존성 설치
npm run dev           # 개발 서버(Hot Reload)
npm run build         # 프로덕션 빌드(dist/)
npm run preview       # 빌드 결과 미리보기
npm run lint          # ESLint 검사
npm run lint:fix      # ESLint 자동 고침
npm run format        # Prettier 포맷
npm run format:check  # 포맷 체크
```

---

## 5) 인증 흐름(Auth Flow)

1. 사용자가 **Cognito Hosted UI**로 이동해 로그인/회원가입
2. 로그인 성공 → **Access Token** 등 토큰이 리다이렉트 URI(`/callback`)로 전달
3. 프론트엔드에서 토큰을 저장(메모리/스토리지)
4. API 호출 시 `Authorization: Bearer <token>` 헤더 첨부

토큰 저장 방식과 만료 처리(리프레시 OR 재로그인)는 보안 정책에 맞춰 선택합니다.

---

## 6) API 연동(요약)

- 기본 베이스 URL: `VITE_API_BASE_URL`
- 주요 엔드포인트(백엔드 README/위키 참조)
  - `GET /matches`, `POST /matches/{id}/participants`, ...
  - `GET /users/me`

자세히 보기: [API 문서](https://github.com/next-engineer/next-kickytime-front/wiki/API-문서)

---

## 7) 배포(Deployment)

- **타깃**: S3 정적 호스팅 + CloudFront CDN 배포
- **캐시/무효화**: 정적 자산 캐시, 배포 후 **CloudFront Invalidation** 수행

---

## 8) 품질/자동화(Quality)

- **Husky** pre-commit 훅에서 `lint-staged`로 변경 파일만 ESLint/Prettier 실행
- PR 시 GitHub Actions에서 **포맷/린트/타입 체크** 실패 시 머지 불가

`.husky/pre-commit` 예시

```sh
#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

---

## 9) 개발 규칙 & 협업 가이드

- **브랜치 전략**: `main`, `develop`, `feature/*`, `hotfix/*` (보호 브랜치, PR 필수)
- **커밋 컨벤션**: Conventional Commits + Gitmoji
- **코드 스타일**: ESLint/Prettier, import 순서/unused 검사
- **PR/이슈 템플릿**: Wiki 제공 템플릿 사용

자세히 보기:

- [커밋 메시지 규칙](https://github.com/next-engineer/next-kickytime-front/wiki/커밋-메시지-규칙)
- [브랜치 전략](https://github.com/next-engineer/next-kickytime-front/wiki/브랜치-전략)
- [이슈 템플릿 가이드](https://github.com/next-engineer/next-kickytime-front/wiki/이슈-템플릿-가이드)
- [풀리퀘스트 템플릿](https://github.com/next-engineer/next-kickytime-front/wiki/풀리퀘스트-템플릿)
- [코드 스타일 자동화 설정](https://github.com/next-engineer/next-kickytime-front/wiki/코드-스타일-자동화-설정)
