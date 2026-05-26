# Student Management - Tổng quan dự án

## 1. Giới thiệu

Web App quản lý sinh viên dành cho Cố vấn học tập (CVHT) tại trường đại học. Hệ thống cho phép CVHT theo dõi thông tin, điểm số, tình trạng học vụ của sinh viên, đồng thời cung cấp kênh liên lạc realtime giữa CVHT và sinh viên.

**Bối cảnh:** Bài tập lớn môn INT3306 22 - Phát triển ứng dụng Web, Trường ĐH Công nghệ, ĐHQGHN (2021).

---

## 2. Kiến trúc tổng quan

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT (React)                     │
│  Port 3000 ── proxy ──> Server 8081                  │
│  Recoil (state) + Ant Design/MUI (UI) + Recharts     │
└───────────┬──────────────────────┬──────────────────┘
            │ HTTP/REST (Axios)    │ WebSocket (Socket.io)
            ▼                      ▼
┌───────────────────────┐  ┌──────────────────────────┐
│   Express Server      │  │   Socket.io Server       │
│   Port 8081           │  │   Port 5000              │
│   REST API + JWT Auth │  │   Chat + Notifications   │
└───────────┬───────────┘  └──────────┬───────────────┘
            │                          │
            ▼                          ▼
┌─────────────────────────────────────────────────────┐
│              MongoDB (Port 27017)                    │
│              Database: "test"                        │
│  Collections: users, logininfos, classes, scores,    │
│  svscorestables, subjects, semesters, chats,         │
│  messages, feeds, posts, comments                    │
└─────────────────────────────────────────────────────┘
```

---

## 3. Công nghệ sử dụng

| Layer | Công nghệ |
|-------|-----------|
| Frontend | React 17, Recoil (state management), Ant Design + MUI (UI), Recharts (biểu đồ) |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose ODM |
| Realtime | Socket.io (chat + notification) |
| Auth | JWT (JSON Web Token), SHA256 (hash password) |
| File Upload | express-fileupload, csvtojson |
| Export | json2xls (xuất Excel) |
| Email | Nodemailer (khôi phục mật khẩu) |

---

## 4. Cấu trúc thư mục

```
Student-Management/
├── client/                     # Frontend React
│   ├── src/
│   │   ├── App.jsx             # Root component, routing
│   │   ├── _actions/           # Recoil actions (API calls)
│   │   ├── _state/             # Recoil atoms (global state)
│   │   ├── _helpers/           # Auth wrapper, class wrapper, fetch utils
│   │   ├── _components/
│   │   │   ├── account/        # Login, Password Recovery
│   │   │   ├── bach_component/ # Chat UI (Messenger-style)
│   │   │   ├── chat/           # Chat page wrapper
│   │   │   ├── dashboard/      # Thống kê, biểu đồ
│   │   │   ├── dbportal/       # Quản lý CSDL (upload CSV)
│   │   │   ├── feed/           # Diễn đàn lớp học
│   │   │   ├── profile/        # Hồ sơ cá nhân
│   │   │   ├── studentInfoList/# Danh sách thông tin SV
│   │   │   ├── studentScoreList/# Bảng điểm SV
│   │   │   ├── subcomponents/  # Components dùng chung
│   │   │   ├── Nav.jsx         # Sidebar navigation
│   │   │   ├── ClassPicker.jsx # Drawer chọn lớp
│   │   │   └── PrivateRoute.jsx# Protected route
│   │   ├── home/
│   │   │   ├── Home.jsx        # Trang chủ CVHT
│   │   │   └── StuHome.jsx     # Trang chủ Sinh viên
│   │   └── users/              # Quản lý user (admin)
│   └── public/
│
├── server/                     # Backend Express
│   ├── server.js               # Entry point, khởi tạo Express + Socket.io
│   ├── configs/
│   │   └── Constants.js        # API paths, DB config, JWT secret
│   ├── routers/                # Route definitions
│   │   ├── auth.js             # POST /auth/login
│   │   ├── register.js         # POST /reg
│   │   ├── user.js             # GET/PUT /api/profile/:id
│   │   ├── class.js            # CRUD /api/classes/*
│   │   ├── chat.js             # GET /api/chat/*
│   │   ├── score.js            # GET/POST /api/scores/*
│   │   ├── upload.js           # POST /api/upload/*
│   │   ├── subject.js          # POST /api/subjects/*
│   │   ├── semester.js         # GET/POST /api/semesters/*
│   │   ├── admin.js            # GET /api/admin/*
│   │   └── public.js           # GET /public/data/:filename
│   ├── middleware/              # Business logic per domain
│   │   ├── auth-middleware/     # JWT validation, login logic
│   │   ├── class-middleware/    # Class CRUD, member management
│   │   ├── chat-middleware/     # Chat history
│   │   ├── score-middleware/    # Score import/query/export
│   │   ├── upload-middleware/   # File upload + CSV parsing
│   │   ├── user-middleware/     # Profile CRUD
│   │   ├── subject-middleware/  # Subject management
│   │   ├── semester-middleware/ # Semester management
│   │   └── admin-middleware/    # Admin operations
│   └── module/
│       ├── DBModule/            # MongoDB connection + Schemas
│       │   ├── DBConnection.js  # Mongoose init, model registration
│       │   └── Schemas/         # Mongoose schema definitions
│       └── IOModule/            # Socket.io logic
│           ├── IOConnection.js  # Socket server setup + room management
│           ├── IOAuthentication.js # Socket auth middleware
│           ├── HandleChatMessage.js # Realtime chat handler
│           └── HandleNotification.js # Push notifications
│
└── SampleData/                 # CSV files mẫu để import
```

---

## 5. Database Schema

### Users
```
User {
  name: String
  role: "student" | "teacher" | "admin"
  gender: "male" | "female"
  phone_number: String
  parent_number: String
  location: String
  date_of_birth: Number (timestamp)
  email: String (lowercase)
  vnu_id: String (unique) ← dùng làm username đăng nhập
}
```

### LoginInfo
```
LoginInfo {
  user_ref: ObjectId → User
  username: String
  password: String (SHA256 hashed)
  current_token: String (JWT)
  current_socket_id: String
}
```

### Class
```
Class {
  class_id: String (unique)
  class_name: String
  class_teacher: ObjectId → User
  class_members: [ObjectId] → User[]
  feed_ref: ObjectId → Feed
}
```

### Score & ScoresTable
```
Score {
  score: Number (0-10)
  subject: ObjectId → Subject
  semester_id: ObjectId → Semester
}

ScoresTable {
  user_ref: ObjectId → User
  scores: [ObjectId] → Score[]
  status: [String]   ← ["Chưa nộp học phí", "Chưa đủ tín", ...]
}
```

### Chat & Message
```
Chat {
  membersID: [ObjectId] → User[] (2 members per chat)
  messages: [ObjectId] → Message[]
}

Message {
  from: ObjectId → User
  to: ObjectId → User
  message: String
  createdDate: Number (timestamp)
}
```

### Feed, Post, Comment
```
Feed {
  class_ref: ObjectId → Class
  posts: [ObjectId] → Post[]
}

Post {
  from: ObjectId → User
  content: String
  comments: [ObjectId] → Comment[]
  created_date: Number (timestamp)
  liked: [ObjectId] → User[]
}

Comment {
  from: ObjectId → User
  content: String
  created_date: Number (timestamp)
}
```

### Subject & Semester
```
Subject {
  subject_name: String
  subject_code: String (unique)
  credits_number: Number
}

Semester {
  semester_id: String (unique)   ← VD: "20231"
  semester_name: String          ← VD: "Kì 1 - 2023-2024"
}
```

---

## 6. Hệ thống phân quyền (3 roles)

| Chức năng | Teacher (CVHT) | Student (SV) | Admin |
|-----------|:-:|:-:|:-:|
| Đăng nhập/Đăng xuất | x | x | x |
| Xem/sửa hồ sơ cá nhân | x | x | x |
| Khôi phục mật khẩu qua email | x | x | x |
| Tạo/quản lý lớp học | x | | |
| Thêm/xóa SV vào lớp | x | | |
| Xem thông tin liên lạc SV | x | | |
| Xem bảng điểm toàn lớp | x | | |
| Xuất bảng điểm Excel | x | | |
| Dashboard thống kê | x | | |
| Upload CSV (SV, điểm, kì học, môn học) | x | | |
| Nhắn tin realtime | x | x (chỉ với CVHT) | |
| Diễn đàn lớp (post/like/comment) | x | x | |
| Xem bảng điểm cá nhân | | x | |
| Xem thông tin CVHT | | x | |
| Quản lý tất cả users | | | x |

---

## 7. Luồng chức năng chi tiết

### 7.1. Luồng đăng nhập (Authentication)

```
Client                          Server
  │                               │
  ├─ POST /auth/login ──────────►│
  │  {username: vnu_id,           │
  │   password: plaintext}        │
  │                               ├─ Tìm User theo vnu_id
  │                               ├─ Tìm LoginInfo (user_ref + SHA256(password))
  │                               ├─ Tạo JWT token (expires 2 days)
  │                               ├─ Lưu token vào LoginInfo.current_token
  │◄─ {token: JWT} ──────────────┤
  │                               │
  ├─ Lưu token vào cookie ───────│
  ├─ Lưu userData vào localStorage│
  │                               │
  │  (Mọi request tiếp theo)      │
  ├─ Cookie: token=JWT ─────────►│
  │                               ├─ validateToken middleware
  │                               ├─ Tìm LoginInfo theo current_token
  │                               ├─ Populate user_ref
  │                               ├─ Gán req.senderVNUId, req.senderInstance
  │◄─ Response ──────────────────┤
```

### 7.2. Luồng quản lý lớp học

```
1. CVHT đăng nhập
2. Nhấn "Chọn lớp" → ClassPicker drawer mở ra
3. Nếu chưa có lớp:
   a. CVHT tạo lớp mới (POST /api/classes/create)
      → Server tạo Class + Feed cho lớp
   b. CVHT import SV vào lớp bằng CSV email
      (POST /api/classes/:classId/members/import)
      → Server tìm User theo email → thêm vào class_members
4. CVHT chọn lớp → URL chuyển sang /:classID/*
5. Sidebar hiện menu: Dashboard, Tin nhắn, Diễn đàn, Thông tin SV, Bảng điểm
```

### 7.3. Luồng xem & quản lý điểm

```
[Import điểm - không cần auth]
POST /api/scores/import + file CSV
  → Parse CSV: {vnu_id, subject_code, score, semester_id}
  → Tìm/tạo ScoresTable cho SV
  → Tạo Score record, link vào ScoresTable

[CVHT xem bảng điểm lớp]
GET /api/classes/:classId/members/scores
  → validateToken → findClassByClassId → validateClassTeacher
  → Lấy tất cả ScoresTable của class_members
  → Populate scores + subject + semester
  → Response: danh sách SV + điểm từng môn + status

[CVHT xuất Excel]
GET /api/scores/download/:classId/:semesterId
  → Tạo file XLS từ dữ liệu điểm → Download

[SV xem điểm cá nhân]
GET /api/scores/:userId
  → validateToken → checkTeacherOfVNUId
  → Trả về ScoresTable của SV đó

[Import trạng thái SV]
POST /api/status/import + file CSV
  → Parse CSV: {vnu_id, status}
  → Cập nhật ScoresTable.status
```

### 7.4. Luồng chat realtime

```
Client                    Socket.io Server              Client
(CVHT)                    Port 5000                     (SV)
  │                            │                          │
  ├─ connect(token) ──────────►│                          │
  │                            ├─ checkTokenValid         │
  │                            ├─ checkLoginInfo          │
  │                            ├─ Join rooms (class_id)   │
  │◄─ connected ──────────────┤                          │
  │                            │                          │
  ├─ emit('NewMessage', {     │                          │
  │    receiverVNUId,          │                          │
  │    message}) ─────────────►│                          │
  │                            ├─ Tìm/tạo Chat giữa 2 user│
  │                            ├─ Tạo Message record      │
  │                            ├─ Lưu vào Chat.messages   │
  │                            ├─ emit('NewMessage') ────►│
  │                            │   tới socket của receiver │
  │                            │                          │

[REST API bổ sung]
GET /api/chat/recent          → Danh sách chat gần đây
GET /api/chat/recentcontact   → Danh sách người liên hệ
GET /api/chat/:otherVNUId     → Lịch sử chat với 1 người
```

### 7.5. Luồng diễn đàn lớp (Feed)

```
[Đăng bài]
POST /api/classes/:classId/feed/add
  → Tạo Post → thêm vào Feed.posts
  → Socket.io notify tất cả members trong room (class_id)

[Xem bài]
GET /api/classes/:classId/feed/posts/get
  → Lấy Feed → populate tất cả Posts + from (author info)

[Like bài]
POST /api/classes/:classId/feed/:postId/likes/toogle
  → Toggle user trong Post.liked[]
  → Socket.io notify cập nhật

[Bình luận]
POST /api/classes/:classId/feed/:postId/comments/add
  → Tạo Comment → thêm vào Post.comments[]
  → Socket.io notify members
```

### 7.6. Luồng upload dữ liệu (CSV Import)

```
                    ┌──────────────────────────────────┐
                    │      POST + multipart/form-data   │
                    │      file: *.csv                  │
                    └───────────────┬──────────────────┘
                                    │
                    ┌───────────────▼──────────────────┐
                    │    handleUploadFile middleware     │
                    │    (express-fileupload → temp dir) │
                    └───────────────┬──────────────────┘
                                    │
              ┌─────────┬───────────┼───────────┬─────────────┐
              ▼         ▼           ▼           ▼             ▼
        /dscv       /dssv       /dsmh     /scores/import  /semesters
        (CVHT)      (SV)        (Môn)     (Điểm)         (Kì học)
              │         │           │           │             │
              ▼         ▼           ▼           ▼             ▼
        csvtojson → Parse rows → Validate → Create records → Response
                                             in MongoDB
```

### 7.7. Dashboard thống kê (chỉ CVHT)

```
Dữ liệu hiển thị:
├── Sĩ số lớp (tổng SV)
├── Bảng đếm: SV thiếu tín chỉ, chưa nộp HP, cảnh báo điểm
├── Biểu đồ GPA theo kì (Recharts)
│   └── Lọc theo kì học, khoảng GPA
├── Biểu đồ cảnh báo học vụ
└── Danh sách chi tiết SV (click để xem/nhắn tin)
```

---

## 8. API Endpoints

### Auth
| Method | Path | Mô tả | Auth |
|--------|------|--------|------|
| POST | `/auth/login` | Đăng nhập | No |
| POST | `/reg` | Đăng ký | No |
| POST | `/api/auth/forget_password` | Khôi phục MK qua email | No |

### User/Profile
| Method | Path | Mô tả | Auth |
|--------|------|--------|------|
| GET | `/api/profile/:profileId` | Xem profile | Yes |
| PUT | `/api/profile/edit/:profileId` | Sửa profile | Yes |

### Class
| Method | Path | Mô tả | Auth |
|--------|------|--------|------|
| POST | `/api/classes/create` | Tạo lớp | Yes (teacher) |
| GET | `/api/classes/me` | DS lớp của tôi | Yes |
| GET | `/api/classes/:classId` | Chi tiết lớp | Yes |
| POST | `/api/classes/:classId/members/add` | Thêm SV | Yes (teacher) |
| POST | `/api/classes/:classId/members/delete` | Xóa SV | Yes (teacher) |
| POST | `/api/classes/:classId/members/import` | Import SV (CSV) | Yes (teacher) |
| GET | `/api/classes/:classId/members/infors` | Thông tin SV lớp | Yes (teacher) |
| GET | `/api/classes/:classId/members/scores` | Điểm SV lớp | Yes (teacher) |

### Score
| Method | Path | Mô tả | Auth |
|--------|------|--------|------|
| POST | `/api/scores/import` | Import điểm (CSV) | No |
| POST | `/api/scores/add` | Thêm điểm 1 SV | No |
| GET | `/api/scores/:userId` | Điểm của 1 SV | Yes |
| GET | `/api/scores/download/:classId/:semesterId` | Xuất Excel | Yes (teacher) |
| POST | `/api/status/import` | Import trạng thái SV | No |

### Feed
| Method | Path | Mô tả | Auth |
|--------|------|--------|------|
| POST | `/api/classes/:classId/feed/add` | Đăng bài | Yes |
| GET | `/api/classes/:classId/feed/posts/get` | Lấy tất cả bài | Yes |
| GET | `/api/classes/:classId/feed/:postId` | Chi tiết bài | Yes |
| POST | `/api/classes/:classId/feed/:postId/likes/toogle` | Like/unlike | Yes |
| POST | `/api/classes/:classId/feed/:postId/comments/add` | Bình luận | Yes |
| GET | `/api/classes/:classId/feed/:postId/comments/get` | DS comments | Yes |

### Chat
| Method | Path | Mô tả | Auth |
|--------|------|--------|------|
| GET | `/api/chat/recent` | Chat gần đây | Yes |
| GET | `/api/chat/recentcontact` | Liên hệ gần đây | Yes |
| GET | `/api/chat/:otherVNUId` | Lịch sử chat | Yes |

### Upload/Import
| Method | Path | Mô tả | Auth |
|--------|------|--------|------|
| POST | `/api/upload/dscv` | Import DS CVHT | No |
| POST | `/api/upload/dssv` | Import DS SV | No |
| POST | `/api/upload/dsmh` | Import DS môn học | No |
| POST | `/api/upload/file` | Upload file | No |
| POST | `/api/semesters/upload` | Import kì học | Yes |

### Semester & Subject
| Method | Path | Mô tả | Auth |
|--------|------|--------|------|
| POST | `/api/semesters/add` | Thêm kì học | Yes |
| GET | `/api/semesters/all` | DS tất cả kì học | Yes |
| GET | `/api/semesters/:semesterId` | Chi tiết kì học | Yes |
| POST | `/api/subjects/add` | Thêm môn học | Yes |

### Admin
| Method | Path | Mô tả | Auth |
|--------|------|--------|------|
| GET | `/api/admin/users` | DS tất cả users | Yes (admin) |

---

## 9. Routing phía Client

### Khi chưa đăng nhập
| Path | Component |
|------|-----------|
| `/account/login` | Login |
| `/account/recover` | PasswordRecover |

### Khi đã đăng nhập (CVHT - Teacher)
| Path | Component | Mô tả |
|------|-----------|-------|
| `/` | Home | Trang chủ, chọn lớp |
| `/:classID/` | Home | Trang chủ lớp |
| `/:classID/dashboard` | Dashboard | Thống kê |
| `/:classID/studentinfo` | StudentInfoList | Thông tin SV |
| `/:classID/studentscore` | StudentScoreList | Bảng điểm |
| `/:classID/feed` | Feed | Diễn đàn |
| `/chat` | Chat | Nhắn tin |
| `/profile` | Profile | Hồ sơ cá nhân |
| `/dbportal` | DBPortal | Quản lý CSDL |

### Khi đã đăng nhập (Sinh viên)
| Path | Component | Mô tả |
|------|-----------|-------|
| `/stuhome` | StuHome | Trang chủ SV |
| `/:classID/feed` | Feed | Diễn đàn lớp |
| `/personalscore` | PersonalScore | Bảng điểm cá nhân |
| `/profile` | Profile | Hồ sơ cá nhân |

---

## 10. Ghi chú kỹ thuật

### Đặc điểm đáng lưu ý
- **Password** được hash bằng SHA256 (trong LoginInfoSchema setter), không dùng bcrypt
- **Login** dùng `vnu_id` làm username (tìm User theo vnu_id), không phải field `username` trong CSV
- **JWT** có thời hạn 2 ngày, secret key hardcode trong Constants.js
- **Socket.io** chạy trên port riêng (5000), dùng room theo `class_id`
- **Một số API upload không yêu cầu auth** (dscv, dssv, dsmh, scores/import, status/import)
- **Client proxy**: dev server proxy từ port 3000 → 8081
- **Node.js 17+** cần flag `NODE_OPTIONS=--openssl-legacy-provider` do react-scripts 4 dùng webpack cũ

### Hạn chế hiện tại
- Không có unit tests
- Không có API documentation (Swagger/OpenAPI)
- Không có Docker/containerization
- Không có CI/CD pipeline
- Dependencies đã cũ (React 17, 2021-era packages)
- Một số API upload thiếu authentication
- JWT secret key và email credentials hardcode trong source code
- Database name mặc định là "test" (Mongoose default)
