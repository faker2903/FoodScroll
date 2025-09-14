# FoodScroll - Social Video Sharing Platform for Food Content
(LIVE DEMO : http://food-scroll-k7td.vercel.app)

A TikTok-like social video sharing platform specifically designed for food content, where food partners can upload cooking videos and users can discover, like, and save their favorite food content.

## 🚀 Features

### For Users
- **Video Feed**: Scroll through an endless feed of food videos with auto-play functionality
- **User Authentication**: Secure registration and login system
- **Interactive Actions**: Like, save, and comment on food videos
- **Saved Content**: View all your saved food videos in a dedicated section
- **Food Partner Profiles**: Explore food partner profiles with their uploaded content and business details

### For Food Partners
- **Content Creation**: Upload food videos with descriptions and details
- **Business Profile**: Showcase business information including address, contact details, and statistics
- **Analytics**: Track total meals served and customers reached
- **Content Management**: Manage uploaded food content and view engagement metrics

### Technical Features
- **Auto-play Videos**: Videos automatically play when 60% visible using Intersection Observer API
- **Responsive Design**: Mobile-first design that works across all devices
- **File Upload**: Support for video uploads up to 100MB using Multer and cloud storage
- **Real-time Updates**: Like and save counts update in real-time
- **Protected Routes**: Role-based access control for different user types

## 🛠️ Technology Stack

### Frontend
- **React.js** - User interface library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling and responsive design
- **Intersection Observer API** - Video auto-play functionality

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Multer** - File upload handling
- **UUID** - Unique identifier generation

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/foodscroll.git
   cd foodscroll
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the server directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/foodscroll
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   ```

5. **Start the development servers**
   
   Backend server (from server directory):
   ```bash
   npx nodemon server.js
   ```
   
   Frontend server (from client directory):
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/user/register` - User registration
- `POST /api/auth/user/login` - User login
- `GET /api/auth/user/logout` - User logout
- `POST /api/auth/food-partner/register` - Food partner registration
- `POST /api/auth/food-partner/login` - Food partner login
- `GET /api/auth/food-partner/logout` - Food partner logout

### Food Content
- `GET /api/food` - Get all food items
- `POST /api/food` - Create new food item (Food partners only)
- `POST /api/food/like` - Like/unlike a food item
- `POST /api/food/save` - Save/unsave a food item
- `GET /api/food/save` - Get user's saved food items

### Food Partners
- `GET /api/food-partner/:id` - Get food partner profile by ID

## 🔐 Authentication & Authorization

The application uses JWT-based authentication with role-based access control:

- **Users**: Can view content, like, save, and comment on videos
- **Food Partners**: Can create content and manage their business profile
- **Protected Routes**: Middleware ensures only authenticated users can access protected endpoints

## 📱 Key Components

### ReelFeed Component
- Manages video playback using Intersection Observer API
- Handles like, save, and comment interactions
- Provides seamless scrolling experience with auto-play functionality

### Video Upload System
- Drag-and-drop file upload interface
- File validation and size limits
- Cloud storage integration for scalable video hosting

### Authentication System
- Secure password hashing with bcrypt
- JWT token management with HTTP-only cookies
- Role-based middleware for route protection

## 🎯 Future Enhancements

- [ ] Comment system implementation
- [ ] Search and filter functionality
- [ ] Push notifications for interactions
- [ ] Advanced analytics dashboard for food partners
- [ ] Video editing capabilities
- [ ] Social sharing features
- [ ] Mobile application development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Prem Kumar Mondal**
- GitHub: [@faker2903](https://github.com/faker2903)
- Email: ace2903722@gmail.com

## 🙏 Acknowledgments

- React.js community for excellent documentation
- MongoDB team for the powerful database solution
- Express.js team for the minimal web framework
- All open-source contributors who made this project possible

---

⭐ If you found this project helpful, please give it a star on GitHub!
