# 🚀 Deploy Frontend lên Vercel - Step by Step

**Thời gian**: ~10 phút  
**Prerequisites**: Backend đã deploy thành công trên Render ✅

---

## 📋 CHUẨN BỊ

### Lấy Backend URL

1. Vào Render Dashboard: https://dashboard.render.com/
2. Chọn backend service
3. Copy URL (dạng: `https://your-backend.onrender.com`)

---

## 🚀 DEPLOY LÊN VERCEL

### Bước 1: Truy cập Vercel

1. Mở: https://vercel.com/
2. Click **"Login"**
3. Chọn **"Continue with GitHub"**
4. Authorize Vercel

### Bước 2: Import Project

1. Click **"Add New..."** (góc trên phải)
2. Chọn **"Project"**
3. Tìm repository: **`deloy-fullstack`**
4. Click **"Import"**

### Bước 3: Configure Project

**Framework Preset**: `Vite` (auto-detect)

**Root Directory**: 
- Click **"Edit"**
- Chọn: `frontend`
- Click **"Continue"**

**Build Settings** (auto-filled):
```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Bước 4: Environment Variables

Click **"Environment Variables"**

Add biến:
```
Name: VITE_API_BASE_URL
Value: https://YOUR-BACKEND.onrender.com/api
```

**⚠️ QUAN TRỌNG**: 
- Thay `YOUR-BACKEND.onrender.com` bằng URL thật từ Render
- Phải có `/api` ở cuối!

**Example**:
```
VITE_API_BASE_URL=https://mhieu-backend.onrender.com/api
```

### Bước 5: Deploy

1. Click **"Deploy"**
2. Đợi build (~2-3 phút)
3. Xem logs

---

## ✅ VERIFY DEPLOYMENT

### Sau khi deploy thành công:

1. **Click "Visit"** để mở website
2. **Copy URL** (dạng: `https://your-project.vercel.app`)
3. **Test các chức năng**:
   - ✅ Xem danh sách bài viết
   - ✅ Xem chi tiết bài viết
   - ✅ Login
   - ✅ Tạo bài viết mới

---

## 🔧 CONFIGURE CUSTOM DOMAIN (Optional)

### Nếu có domain riêng (ví dụ: mhieu100.me):

1. **Vercel Dashboard** → Your Project → **Settings** → **Domains**
2. Click **"Add"**
3. Nhập domain: `mhieu100.me`
4. Click **"Add"**
5. **Configure DNS**:
   - Vào DNS provider
   - Add CNAME record:
     ```
     Type: CNAME
     Name: @
     Value: cname.vercel-dns.com
     ```
6. Đợi DNS propagate (~5-30 phút)
7. Vercel tự động cấp SSL certificate

---

## 🐛 TROUBLESHOOTING

### Build Failed

**Check**:
- Root Directory = `frontend` ✅
- Build Command = `npm run build` ✅
- Node version compatible

**Fix**:
- Vào Settings → General → Node.js Version
- Chọn: `18.x` hoặc `20.x`
- Redeploy

### API Calls Failed (CORS errors)

**Check**:
- `VITE_API_BASE_URL` có đúng không?
- Backend có chạy không?
- Backend CORS config có allow frontend domain không?

**Fix Backend CORS** (nếu cần):

File: `backend/src/main/java/com/mhieu100/blog/config/SecurityConfig.java`

Thêm frontend domain vào CORS:
```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList(
        "http://localhost:5173",
        "https://your-project.vercel.app",  // Add this
        "https://mhieu100.me"               // Add this if using custom domain
    ));
    // ... rest of config
}
```

### Environment Variable Not Working

**Check**:
- Biến phải bắt đầu với `VITE_` ✅
- Đã redeploy sau khi thêm env var chưa?

**Fix**:
- Vào Settings → Environment Variables
- Verify `VITE_API_BASE_URL` exists
- Deployments → Redeploy

---

## 📝 CHECKLIST

- [ ] Backend URL đã copy
- [ ] Vercel account created/logged in
- [ ] Project imported từ GitHub
- [ ] Root Directory = `frontend`
- [ ] Environment variable `VITE_API_BASE_URL` added
- [ ] Deploy successful
- [ ] Website accessible
- [ ] API calls working
- [ ] Login working
- [ ] Create article working

---

## 🎉 SUCCESS!

Sau khi hoàn thành:
- ✅ Backend: `https://your-backend.onrender.com`
- ✅ Frontend: `https://your-project.vercel.app`
- ✅ Full-stack app deployed!

---

## 🔄 AUTO-DEPLOY

Vercel tự động deploy khi bạn push code:

```bash
# Sau khi sửa frontend
cd frontend
# Make changes...
git add .
git commit -m "Update frontend"
git push origin main

# Vercel auto-deploys (~2 min)
```

---

## 📞 NEED HELP?

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support

---

**Good luck! 🚀**
