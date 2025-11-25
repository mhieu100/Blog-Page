# 🚀 Full-Stack Blog Application

Ứng dụng blog full-stack với React frontend, Spring Boot backend, và PostgreSQL database.

## 📋 Tổng quan

- **Frontend**: React + Vite + TypeScript + TailwindCSS
- **Backend**: Spring Boot + Spring Security + JWT
- **Database**: PostgreSQL (Supabase)
- **Storage**: Cloudinary (Image uploads)
- **Deployment**: 
  - Frontend: Vercel → https://deloy-fullstack.vercel.app/
  - Backend: Render → https://be-app-86nz.onrender.com

## ✨ Tính năng

### User Features
- ✅ Xem danh sách bài viết
- ✅ Xem chi tiết bài viết
- ✅ Đăng ký / Đăng nhập
- ✅ Tạo bài viết mới với upload ảnh
- ✅ Quản lý bài viết của mình
- ✅ Xóa bài viết

### Admin Features
- ✅ Quản lý tất cả bài viết
- ✅ Duyệt/từ chối bài viết
- ✅ Quản lý người dùng
- ✅ Dashboard thống kê

### Security
- ✅ JWT Authentication
- ✅ Role-based Authorization (USER, ADMIN)
- ✅ Password encryption (BCrypt)
- ✅ CORS configuration
- ✅ Public endpoints cho GET requests

## 🏗️ Cấu trúc Project

```
deloy-fullstack/
├── backend/                 # Spring Boot application
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts

```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18
- Java 17
- Maven 3.9+
- Docker (cho deployment)

### Backend Setup

```bash
cd backend

# Copy environment file
cp .env.example .env
# Edit .env với thông tin của bạn

# Run với Maven
mvn spring-boot:run

# Hoặc với script
./run_local.sh
```

Backend sẽ chạy tại: `http://localhost:8080`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

## 📡 API Endpoints

### Public Endpoints (No Auth Required)
```
GET  /api/articles          - Lấy tất cả bài viết
GET  /api/articles/{id}     - Lấy chi tiết bài viết
POST /api/auth/register     - Đăng ký
POST /api/auth/login        - Đăng nhập
```

### Protected Endpoints (Auth Required)
```
POST   /api/articles        - Tạo bài viết mới
GET    /api/articles/my-articles - Lấy bài viết của mình
DELETE /api/articles/{id}   - Xóa bài viết
```

### Admin Endpoints (Admin Only)
```
GET    /api/admin/articles  - Lấy tất cả bài viết
PUT    /api/admin/articles/{id}/approve - Duyệt bài viết
DELETE /api/admin/articles/{id} - Xóa bài viết
GET    /api/admin/users     - Quản lý users
```

## 🔐 Environment Variables

### Backend (.env)
```env
DB_URL=jdbc:postgresql://your-db-host:5432/postgres
DB_USERNAME=postgres
DB_PASSWORD=your_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8080/api
```



## 🧪 Testing

### Test Backend
```bash
# Build
mvn clean package

# Run tests
mvn test

# Test API
curl http://localhost:8080/api/articles
```

### Test Frontend
```bash
# Build
npm run build

# Preview production build
npm run preview
```

## 📚 Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **TailwindCSS** - Styling
- **Lucide React** - Icons

### Backend
- **Spring Boot 3.2** - Framework
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - ORM
- **PostgreSQL** - Database
- **JWT** - Token-based auth
- **Cloudinary SDK** - Image storage
- **Lombok** - Boilerplate reduction

### DevOps
- **Docker** - Containerization
- **Vercel** - Frontend hosting
- **Render** - Backend hosting (Docker)
- **Supabase** - PostgreSQL database
- **Cloudinary** - Image storage

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Minh Hiếu**
- Website: [mhieu100.me](https://mhieu100.me)
- GitHub: [@mhieu100](https://github.com/mhieu100)

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- Vercel Platform

- Supabase
- Cloudinary

---

**Happy Coding! 🎉**
