## gaMeZone API 명세서

### `<b>`게임 명세 `</b>`

| Method | URI              | Description         |
| ------ | ---------------- | ------------------- |
| GET    | /api/games       | 게임목록 전체조회   |
| GET    | /api/games/:name | 카테고리로 게임조회 |
| POST   | /api/games       | 새 게임정보 등록    |
| PATCH  | /api/games/:id   | 게임정보 수정       |
| DELETE | /api/games       | 등록된 게임 삭제    |

### `<b>`게임기록 명세 `</b>`

| Method | URI                     | Description         |
| ------ | ----------------------- | ------------------- |
| GET    | /api/scores/games/:id   | 게임목록 전체조회   |
| GET    | /api/scores/users/:id   | 카테고리로 게임검색 |
| POST   | /api/scores             | 새 게임정보 등록    |
| PATCH  | /api/scores/:id         | 게임정보 수정       |
| DELETE | /api/scores/:id/:option | 게임정보 삭제       |

### `<b>`게임 카테고리 명세 `</b>`

| Method | URI                 | Description       |
| ------ | ------------------- | ----------------- |
| GET    | /api/categories     | 카테고리 전체조회 |
| POST   | /api/categories     | 새 카테고리 등록  |
| PATCH  | /api/categories/:id | 카테고리 수정     |
| DELETE | /api/categories/:id | 카테고리 삭제     |

### `<b>`게시물 명세 `</b>`

| Method | URI                | Description             |
| ------ | ------------------ | ----------------------- |
| GET    | /api/posts         | 전체 게시물 조회        |
| GET    | /api/posts/:userId | 특정 유저의 게시물 조회 |
| POST   | /api/posts         | 새 게시물 생성          |
| PATCH  | /api/posts/:postId | 특정 게시물 수정        |
| DELETE | /api/posts/:postId | 특정 게시물 삭제        |

### `<b>`댓글 명세 `</b>`

| Method | URI                        | Description                  |
| ------ | -------------------------- | ---------------------------- |
| GET    | /api/comments/post/:postId | 특정 게시물의 모든 댓글 조회 |
| GET    | /api/comments/:userId      | 특정 유저의 모든 댓글 조회   |
| POST   | /api/comments              | 새로운 댓글 생성             |
| PATCH  | /api/comments/:commentId   | 특정 댓글 수정               |
| DELETE | /api/comments/:commentId   | 특정 댓글 삭제               |
