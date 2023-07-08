# react-native-test

react-native 과제 구현 레포지토리 입니다.

## 실행 방법

```
cd ./Mymo
npm install
npm run ios
```

## 핵심 기능 (구현여부)

1. Data Storage ( ✅ with Realm)

    ```text
    The candidate should choose a suitable data storage solution for offline data persistence, such as SQLite, AsyncStorage, or Realm. They should design and implement a data model that represents the app's data entities and relationships.
    ```

2. Offline Data Access ( ✅ )

    ```text
    The candidate should develop functionality that allows users to access and modify offline data when there is no internet connection. This includes features like creating, reading, updating, and deleting data records within the app.
    ```

3. Data Synchronization ( ❌ )
    ```text
    When an internet connection is available, the candidate should implement synchronization logic to update the local data with the latest changes from the remote server. This may involve using APIs, websockets, or other methods to retrieve and send data between the app and the server.
    ```
4. Conflict Resolution ( ❌ )
    ```text
    It is essential to handle conflicts that may arise when offline changes conflict with changes made on the server. The candidate should implement conflict resolution mechanisms to ensure data integrity and consistency.
    ```
5. Offline Status Handling ( ❌ )
    ```text
    The candidate should implement user interface components or indicators to notify users about their offline status and provide feedback on the synchronization process.
    ```

## 구현 순서

-   ✨ prettier, typescript
-   ✨ usePrepare
-   📦️ styled-component
-   ✨ theming
-   📦️ realm
-   ✨ realm CRUD
-   ♻️ refactor with context api
-   📦️ i18next
-   ✨ transition

## To Do List

-   task로 된 네이밍 note로 수정
-   백엔드 개발
-   네트워크 레이어 구현
-   메모 피드 무한스크롤 구현
-   content 타입 block 방식으로 변경
