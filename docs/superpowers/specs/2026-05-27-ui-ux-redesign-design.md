# UI/UX Redesign - Design Spec

## Overview

Redesign toàn bộ giao diện Student Management Web App theo phong cách **friendly & colorful** (tham khảo Google Classroom). Giữ nguyên tech stack React 17 + Ant Design 4 + Recoil. Chỉ thay đổi UI (JSX, CSS, theme), không đụng business logic hay dependencies.

**Approach:** Ant Design CSS Override + Layout Rewrite
- Override Ant Design classes bằng CSS (không dùng Less vì react-scripts 4 không support)
- Viết lại layout chung (Header, Sidebar, Content wrapper)
- Từng trang giữ logic cũ, chỉ thay đổi cách render

**Target:** Desktop only (>= 1024px)

---

## 1. Color Palette

| Vai trò | Màu | Mã hex | Sử dụng |
|---------|------|--------|---------|
| Primary | Xanh lá tươi | `#4CAF50` | Buttons, links, active states, primary actions |
| Primary Light | Xanh nhạt | `#E8F5E9` | Background highlight, card hover, active menu item |
| Primary Dark | Xanh đậm | `#2E7D32` | Header logo, emphasis text |
| Secondary | Cam ấm | `#FF9800` | Badges, warnings nhẹ, accent |
| Danger | Đỏ hồng | `#E53935` | Error states, cảnh báo nghiêm trọng, điểm thấp |
| Info | Xanh dương | `#42A5F5` | Thông tin, links phụ, info badges |
| Background | Xám rất nhạt | `#F5F5F5` | Page background |
| Card BG | Trắng | `#FFFFFF` | Card backgrounds |
| Text Primary | Xám đậm | `#333333` | Text chính |
| Text Secondary | Xám nhạt | `#757575` | Text phụ, labels, placeholders |

## 2. Typography

- **Font family:** Giữ Ant Design default (`-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial`)
- **Headings:** Bold
  - h1: 28px
  - h2: 24px
  - h3: 20px
  - h4: 16px
- **Body:** 14px (Ant Design default)
- **Small text:** 12px

## 3. Shared Design Tokens

| Token | Giá trị | Ghi chú |
|-------|---------|---------|
| Border Radius (cards) | `12px` | Tạo cảm giác friendly, rounded |
| Border Radius (buttons, inputs) | `8px` | Nhẹ hơn cards |
| Border Radius (pill) | `24px` | Chat input, tags |
| Box Shadow (default) | `0 2px 8px rgba(0,0,0,0.08)` | Cards ở trạng thái bình thường |
| Box Shadow (hover) | `0 4px 12px rgba(0,0,0,0.12)` | Cards khi hover |
| Transition | `all 0.2s ease` | Hover animations |
| Content max-width | `1200px` | Centered trong content area |
| Content padding | `24px` | Padding xung quanh content |
| Sidebar width | `240px` | Fixed width |
| Header height | `64px` | Sticky top |

## 4. Ant Design Theme Override

Override bằng CSS specificity (do react-scripts 4 không support Less customization natively, và không muốn thêm craco/rewired dependencies):

Tạo file `client/src/theme/global.css` override Ant Design classes:

```css
/* Primary color */
.ant-btn-primary { background: #4CAF50; border-color: #4CAF50; border-radius: 8px; }
.ant-btn-primary:hover { background: #43A047; border-color: #43A047; }

/* Cards */
.ant-card { border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.ant-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.12); }

/* Inputs */
.ant-input, .ant-select-selector { border-radius: 8px !important; }

/* Tables */
.ant-table { border-radius: 12px; overflow: hidden; }

/* Menu */
.ant-layout-sider { background: #FFFFFF; border-right: 1px solid #E0E0E0; }
.ant-menu { background: #FFFFFF; }
.ant-menu-item-selected { background: #E8F5E9 !important; border-left: 3px solid #4CAF50; }

/* Tags */
.ant-tag { border-radius: 24px; }

/* Header */
.ant-layout-header { background: #FFFFFF; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
```

## 5. Layout Structure

### 5.1 Header

- Background: trắng `#FFFFFF` + shadow nhẹ
- Sticky top, z-index cao
- Trái: Logo icon (graduation cap) xanh lá + text "Student Advisor" bold
- Giữa: Tên lớp hiện tại (hoặc "Chưa chọn lớp")
- Phải: Notification bell icon + Avatar tròn user (hoặc icon default)

### 5.2 Sidebar

- Background: trắng `#FFFFFF`, border-right `1px solid #E0E0E0`
- Không collapsible (fixed 240px) - đơn giản hóa
- Menu items: Icon (24px, có màu riêng) + Label text
- Active item: background `#E8F5E9`, border-left 3px `#4CAF50`
- Hover: background `#F5F5F5`
- Logout ở cuối sidebar, tách biệt bằng divider

**Icon colors theo menu item:**

| Menu item | Icon color | Icon |
|-----------|-----------|------|
| Trang chủ | `#4CAF50` | HomeOutlined |
| Dashboard | `#42A5F5` | DashboardOutlined |
| Tin nhắn | `#7E57C2` | MessageOutlined |
| Diễn đàn | `#FF9800` | BellOutlined |
| Thông tin SV | `#26C6DA` | InfoCircleOutlined |
| Bảng điểm | `#66BB6A` | TableOutlined |
| Quản lý CSDL | `#78909C` | UploadOutlined |
| Hồ sơ cá nhân | `#42A5F5` | UserOutlined |
| Đăng xuất | `#E53935` | LogoutOutlined |

### 5.3 Content Area

- Background: `#F5F5F5`
- Padding: 24px
- Max-width: 1200px, centered (`margin: 0 auto`)

## 6. Page Designs

### 6.1 Login Page

**Layout:** Không có Header/Sidebar. Full page, card căn giữa cả ngang lẫn dọc.

- Background: gradient nhẹ `#E8F5E9` → `#FFFFFF`
- Card: width 420px, border-radius 16px, shadow lớn `0 8px 24px rgba(0,0,0,0.12)`
- Logo: graduation cap icon 48px xanh lá `#4CAF50`, centered
- Title: "Student Advisor" (h2, bold), subtitle "Đăng nhập hệ thống" (text secondary)
- Input fields: prefix icon (UserOutlined, LockOutlined), border-radius 8px, height 44px
- Button "Đăng nhập": full-width, height 44px, background `#4CAF50`, border-radius 8px, font-size 16px
- Link "Quên mật khẩu?": text secondary, centered dưới button

### 6.2 Home Page (Teacher)

**Greeting:** "Xin chào, {tên}! 👋" (h2)

**Welcome Card:**
- Full-width, gradient background (xanh lá nhạt → trắng)
- Hiển thị: Vai trò, Lớp hiện tại
- Button "Đổi lớp" / "Chọn lớp" ở góc phải card

**Shortcut Cards:** CSS Grid 4 cột, gap 16px
- Mỗi card: border-radius 16px, shadow nhẹ
- Top stripe 4px (màu riêng mỗi card)
- Icon lớn 36px (màu tương ứng) + Tên chức năng (bold, 16px)
- Hover: `transform: scale(1.03)` + shadow đậm hơn + transition 0.2s

**Cards:**
1. Dashboard (blue `#42A5F5`)
2. Bảng điểm (green `#66BB6A`)
3. Tin nhắn (purple `#7E57C2`)
4. Diễn đàn (orange `#FF9800`)
5. Thông tin SV (cyan `#26C6DA`)
6. Quản lý CSDL (gray `#78909C`)
7. Hồ sơ cá nhân (blue `#42A5F5`)

### 6.3 Home Page (Student)

**Greeting:** "Xin chào, {tên}! 👋" (h2)

**Welcome Card:** Giống teacher, nhưng thêm thông tin CVHT (tên, SĐT, email) bên trong.

**Shortcut Cards:** Grid 4 cột
1. Diễn đàn (orange)
2. Nhắn tin CVHT (purple)
3. Bảng điểm cá nhân (green)
4. Hồ sơ cá nhân (blue)

### 6.4 Dashboard (Teacher only)

**Header row:** "Dashboard" (h2) + Select filter kì học ở phải

**Stat Cards:** Grid 4 cột, gap 16px
- Mỗi card: border-left 4px màu accent + icon + số lớn (36px, bold) + label nhỏ
- Card 1: Sĩ số (green `#4CAF50`, icon 👥)
- Card 2: Thiếu tín chỉ (orange `#FF9800`, icon ⚠️)
- Card 3: Thiếu học phí (red `#E53935`, icon 💰)
- Card 4: GPA trung bình lớp (blue `#42A5F5`, icon 📈)

**Biểu đồ GPA:**
- Full-width card, border-radius 12px
- Title: "Phân bố GPA" + filter controls
- Recharts BarChart hoặc AreaChart
- Màu gradient xanh lá (`#4CAF50` → `#81C784`)
- Tooltip styled theo theme

**Bảng cảnh báo học vụ:**
- Full-width card
- Title: "Danh sách cảnh báo"
- Ant Design Table với:
  - Cột: STT, Tên, VNU ID, Status, Hành động
  - Status: Ant Design Tag component
    - "Chưa nộp học phí" → Tag đỏ
    - "Chưa đủ tín" → Tag cam
  - Hành động: Button "Nhắn tin" nhỏ (outline green)
- Table wrapper: border-radius 12px
- Zebra striping: `#FAFAFA` cho odd rows
- Row hover: `#E8F5E9`

### 6.5 Bảng điểm SV (StudentScoreList)

**Header row:** "Bảng điểm sinh viên" (h2) + Select kì học + Button "Xuất Excel" (green, icon DownloadOutlined)

**Table:**
- Wrapper card border-radius 12px
- Zebra striping `#FAFAFA`
- Row hover: `#E8F5E9`
- Điểm < 5: text `#E53935` + background `#FFEBEE`
- Điểm >= 8: text `#2E7D32` + background `#E8F5E9`
- Status column: Tag components (đỏ/cam giống Dashboard)
- Action column: Button "Xem chi tiết" + "Nhắn tin"

### 6.6 Thông tin liên hệ SV (StudentInfoList)

**Header row:** "Thông tin liên hệ" (h2) + Search input (icon SearchOutlined, border-radius 8px) + Button "Thêm sinh viên" (green)

**Table:**
- Style giống StudentScoreList
- Cột: Avatar (tròn 32px, placeholder icon) + Tên + VNU ID + Email + SĐT + Địa chỉ
- Action: Button "Nhắn tin" (outline green) + "Xóa" (outline red)
- Filter/search highlighting cho text match

### 6.7 Chat

**Layout:** 2 cột trong content area

```
┌─ Conversations (300px) ──┬─ Messages (fill) ──────────┐
│ [🔍 Tìm kiếm...]        │  Header: Avatar + Tên       │
│                           │  ─────────────────────────  │
│  ● Nguyễn Văn A          │                             │
│    "Tin nhắn cuối..."     │  [bubble xám] Xin chào     │
│                           │         Chào thầy [bubble  │
│  ○ Trần Thị B            │                    xanh lá] │
│    "OK ạ"                 │                             │
│                           │  ─────────────────────────  │
│                           │  [💬 Nhập tin nhắn... ] [➤] │
└───────────────────────────┴────────────────────────────┘
```

**Conversation List (trái):**
- Search bar top: border-radius 24px (pill), background `#F5F5F5`
- Mỗi item: Avatar tròn 40px + Tên (bold) + preview tin cuối (text secondary, 1 dòng ellipsis)
- Active conversation: background `#E8F5E9`
- Unread indicator: dot xanh lá 8px

**Messages (phải):**
- Header: Avatar 36px + Tên người chat
- Tin nhắn gửi: background `#4CAF50`, text trắng, border-radius `16px 16px 4px 16px`, align right
- Tin nhắn nhận: background `#F5F5F5`, text `#333333`, border-radius `16px 16px 16px 4px`, align left
- Timestamp nhỏ (12px, text secondary) dưới mỗi nhóm tin
- Input bar: border-radius 24px (pill), background `#F5F5F5`, nút gửi tròn 36px xanh lá

### 6.8 Diễn đàn (Feed)

**Layout:** Single column, max-width 680px, centered

**Compose area (top):**
- Card: avatar tròn + textarea "Bạn muốn chia sẻ gì?" (border-radius 12px)
- Button "Đăng bài" xanh lá, xuất hiện khi focus textarea

**Post Card:**
- Border-radius 12px
- Header: Avatar tròn 40px + Tên (bold) + Thời gian (text secondary)
- Content: text 14px, padding 16px
- Footer: Like button (heart icon, đổi xanh lá khi liked, hiện số likes) + Comment button (hiện số comments)
- Comment section (khi mở):
  - Background `#FAFAFA`, indent 16px trái
  - Mỗi comment: Avatar nhỏ 28px + Tên bold + content + thời gian
  - Input comment: border-radius 24px (pill)

### 6.9 Profile

**Layout:** Card centered, max-width 600px

- Avatar area: Tròn 80px, centered, icon UserOutlined lớn nếu không có ảnh
- Background nhẹ phía sau avatar (gradient xanh nhạt, height 120px)
- Form: 2 cột cho fields ngắn (tên/VNU ID, SĐT/email), 1 cột cho fields dài (địa chỉ)
- Labels: trên input, text secondary 12px
- Inputs: border-radius 8px, height 40px
- Button group: "Lưu thay đổi" (green filled) + "Đổi mật khẩu" (green outline)

### 6.10 Quản lý CSDL (DBPortal)

**Layout:** Tab hoặc Card grid cho các loại upload

**Tabs (Ant Design Tabs):** CVHT | Sinh viên | Môn học | Kì học | Điểm | Trạng thái

**Mỗi tab content:**
- Title mô tả: "Upload danh sách cố vấn học tập (CSV)"
- Upload area: border dashed 2px `#4CAF50`, border-radius 12px, height 200px, centered content
  - Icon CloudUploadOutlined 48px xanh lá
  - Text "Kéo thả file CSV vào đây hoặc nhấn để chọn"
  - Text phụ "Hỗ trợ file .csv, tối đa 50MB"
- Upload result: Ant Design Alert component
  - Success: green alert + danh sách items imported
  - Fail: red alert + chi tiết lỗi

### 6.11 Class Picker (Drawer)

- Drawer từ bên phải, width 400px
- Title: "Chọn lớp học"
- Mỗi lớp: Card border-radius 12px, hiện tên lớp + số SV
- Card active (lớp đang chọn): border 2px `#4CAF50` + background `#E8F5E9`
- Button "Tạo lớp mới" ở cuối: green outline, full-width

---

## 7. File Structure (new/modified)

```
client/src/
├── theme/
│   └── global.css          # NEW - Ant Design overrides + design tokens
├── App.jsx                  # MODIFIED - new layout structure
├── _components/
│   ├── Nav.jsx              # MODIFIED - white sidebar, colored icons
│   ├── ClassPicker.jsx      # MODIFIED - new card styles
│   ├── account/
│   │   └── Login.jsx        # MODIFIED - centered card, new styling
│   ├── dashboard/
│   │   ├── Dashboard.jsx    # MODIFIED - stat cards grid, remove wrapper card
│   │   ├── GPADash.jsx      # MODIFIED - chart colors, card style
│   │   └── StatisticBoard.jsx # MODIFIED - table styling, tags
│   ├── studentScoreList/
│   │   ├── StudentScoreList.jsx  # MODIFIED - header + filter layout
│   │   └── StudentScore-table.js # MODIFIED - table styling, score colors
│   ├── studentInfoList/
│   │   ├── StudentInfoList.jsx   # MODIFIED - header + search
│   │   └── StudentInfoList-table.js # MODIFIED - table styling
│   ├── chat/
│   │   └── Chat.jsx         # MODIFIED - styling wrapper
│   ├── bach_component/       # MODIFIED - message bubbles, conversation list
│   ├── feed/
│   │   ├── Feed.jsx          # MODIFIED - post cards, compose area
│   │   └── Feed.css          # MODIFIED - new styles
│   ├── profile/
│   │   └── Profile-form.jsx  # MODIFIED - centered card, avatar area
│   └── dbportal/
│       ├── DBPortal.jsx      # MODIFIED - tabs layout
│       └── UploadForm.jsx    # MODIFIED - drag & drop zone
├── home/
│   ├── Home.jsx              # MODIFIED - shortcut cards grid
│   └── StuHome.jsx           # MODIFIED - shortcut cards grid
└── index.css                 # MODIFIED - import global.css, base styles
```

## 8. Implementation Notes

- **Không đổi dependencies** - Không thêm/bớt packages, giữ nguyên Ant Design 4, React 17, Recoil
- **Không đổi business logic** - State management, API calls, routing logic giữ nguyên
- **CSS override approach** - Vì react-scripts 4 không support Less customization dễ dàng, dùng CSS specificity override thay vì Less variables
- **Inline styles → CSS classes** - Di chuyển inline styles hiện tại sang CSS classes trong global.css hoặc component-specific CSS files
- **Giữ Ant Design components** - Vẫn dùng Card, Table, Button, Menu, Drawer, Tag, Select... chỉ override styles
