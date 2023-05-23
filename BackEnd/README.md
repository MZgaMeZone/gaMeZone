## gaMeZone API 명세서

### **유저 명세**

| Method | URI                                      | Description                   |
| ------ | ---------------------------------------- | ----------------------------- |
| POST   | /api/users/signup                        | 회원가입                      |
| POST   | /api/users/signup/emailDuplicateCheck    | 회원가입 시 이메일 중복검사   |
| POST   | /api/users/signup/nicknameDuplicateCheck | 회원가입 시 닉네임 중복검사   |
| POST   | /api/users/login                         | 로그인                        |
| GET    | /api/users                               | 사용자 정보 조회              |
| PUT    | /api/users                               | 사용자 정보 수정              |
| DELETE | /api/users                               | 사용자 정보 삭제              |
| GET    | /api/users/allUsers                      | 사용자 전체 정보 조회(관리자) |

### 게임 명세

| Method | URI                         | Description            |
| ------ | --------------------------- | ---------------------- |
| GET    | /api/games                  | 게임목록 전체조회      |
| GET    | /api/games/:id              | 게임ID로 게임내용 조회 |
| GET    | /api/games/categories/:name | 카테고리로 게임조회    |
| POST   | /api/games                  | 새 게임정보 등록       |
| PATCH  | /api/games/:id              | 게임정보 수정          |
| DELETE | /api/games                  | 등록된 게임 삭제       |

### 게임기록 명세

| Method | URI                            | Description                                              |
| ------ | ------------------------------ | -------------------------------------------------------- |
| GET    | /api/scores/games/:id          | 게임 ID로 기록 조회                                      |
| GET    | /api/scores/users/:id          | 유저 ID로 기록 조회                                      |
| POST   | /api/scores                    | 새 기록 등록                                             |
| DELETE | /api/scores/:id                | 기록 삭제 (부정한 방법으로 달성한 기록 말소용)           |
| GET    | /api/scores/:id/:option?num=10 | 랭킹데이터 검색(gameId, 정렬우선조건, 가져올 데이터갯수) |
| GET    | /api/scores/honors             | 명예의 전당 출력                                         |

### `<b>`게임 카테고리 명세 `</b>`

| Method | URI                 | Description       |
| ------ | ------------------- | ----------------- |
| GET    | /api/categories     | 카테고리 전체조회 |
| POST   | /api/categories     | 새 카테고리 등록  |
| PATCH  | /api/categories/:id | 카테고리 수정     |
| DELETE | /api/categories/:id | 카테고리 삭제     |

### 게시물 명세

| Method | URI                     | Description                 |
| ------ | ----------------------- | --------------------------- |
| GET    | /api/posts              | 자유게시판 전체 게시물 조회 |
| GET    | /api/posts/cert         | 인증게시판 전체 게시물 조회 |
| GET    | /api/posts/post/:postId | 특정 게시물 조회            |
| GET    | /api/posts/:userId      | 특정 유저의 게시물 조회     |
| POST   | /api/posts              | 새 게시물 생성              |
| PATCH  | /api/posts/:postId      | 특정 게시물 수정            |
| DELETE | /api/posts/:postId      | 특정 게시물 삭제            |

### 댓글 명세

| Method | URI                           | Description                  |
| ------ | ----------------------------- | ---------------------------- |
| GET    | /api/comments/post/:postId    | 특정 게시물의 모든 댓글 조회 |
| GET    | /api/comments/comment/:postId | 특정 댓글 조회               |
| GET    | /api/comments/:userId         | 특정 유저의 모든 댓글 조회   |
| POST   | /api/comments                 | 새로운 댓글 생성             |
| PATCH  | /api/comments/:commentId      | 특정 댓글 수정               |
| DELETE | /api/comments/:commentId      | 특정 댓글 삭제               |
