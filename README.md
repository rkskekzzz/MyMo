# MyMo

오프라인-온라인 동기화 가능한 메모📝 어플리케이션 입니다:)

## 구현 환경

-   macOS Ventura 13.3.1
-   Xcode 14.1

## 테스트 기기

-   iPhone 14 Pro Max (iOS 16.1) simulator
-   iPhone 14 Pro (iOS 16.1) simulator
-   iphone SE (iOS 16.1) simulator

## 실행 방법

### Backend

```shell
docker-compose up -d
```

### Frontend

```shell
cd ./Mymo
yarn
npx pod-install ios
yarn ios
```

<br><br>

## 디렉토리 구조 & 네이밍 규칙

```shell
.
├── MyMo            # Frontend
│   ├── App.tsx     # App Entry Point
│   ├── android
│   ├── ios
│   └── src
│       ├── api
│       ├── components
│       ├── context
│       ├── hooks
│       ├── i18n
│       ├── interface
│       ├── models
│       ├── theme
│       └── utils
└── MyMoServer      # Backend
    ├── env
    └── src
        ├── app.ts  # App Entry Point
        ├── config
        ├── controllers
        ├── db
        ├── interface
        ├── modules
        ├── routes
        └── services
```

```shell
*.tsx       # React Component
*.type.ts   # Typescript Type
*.styled.ts # Styled Component
*.const.ts  # Constant Value
```

## 핵심 기능 (구현여부)

1. Data Storage ( ✅ with Realm)

2. Offline Data Access ( ✅ )

3. Data Synchronization ( ✅ )

4. Conflict Resolution ( ✅ )

5. Offline Status Handling ( ✅ )

<br><br>

## 구현 순서

-   ✨ prettier, typescript
-   ✨ usePrepare
-   📦️ styled-component
-   ✨ theming
-   📦️ realm
-   ✨ realm CRUD
-   ♻️ refactor with context api
-   📦️ i18next
-   🎉 backend project init
-   📦️ @tanstack/react-query
-   📦️ axios
-   🎨 memo CRUD, navigation hook
-   ✨ syncedAt, deletedAt added
-   ♻️ delete DTO changed
-   ♻️ Memo -> Note rename
-   ✨ **Sync One** action added
-   💄 styling
-   ♻️ code refactor
-   ✨ **Sync All** action added
-   💄 styling
-   ♻️ code refactor

<br><br>

## To Do List

-   로컬 검색 기능 구현
-   content 타입 block 방식으로 변경(title 없애고 content의 내용이 있는 첫번째 블록을 title로 사용)
