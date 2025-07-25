# 🍎 Fruit Shop - React Firebase E-commerce App

A modern, responsive fruit e-commerce application built with React, Firebase, and Vite. This application provides a complete shopping experience with user authentication, product management, shopping cart functionality, and a comprehensive billing system.

## ✨ Features

### 🔐 User Authentication
- User registration and login
- Firebase Authentication integration
- Protected routes for authenticated users
- Secure logout functionality

### 🛍️ Shopping Experience
- Browse fruit catalog with emoji icons
- Add fruits to shopping cart
- Adjust quantities in cart
- Remove items from cart
- Real-time cart updates

### 💳 Billing & Payment
- Comprehensive billing page
- Billing address form validation
- Multiple payment options:
  - Credit Card payment with form validation
  - PayPal integration ready
- Order summary display
- Secure checkout process

### 🎨 User Interface
- Modern, responsive design
- Animated background effects
- Mobile-friendly interface
- Toast notifications for user feedback
- Clean and intuitive navigation

## 🚀 Technologies Used

- **Frontend**: React 18, Vite
- **Backend**: Firebase (Authentication & Firestore)
- **Styling**: SCSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Notifications**: React Toastify
- **Build Tool**: Vite
- **Deployment**: Firebase Hosting

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nirmalkoswatta/fruitapp-react-firebase.git
   cd fruitapp-react-firebase
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Get your Firebase config and update `src/firebase.js`

4. **Environment Setup**
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── FruitDashboardCard.jsx    # Individual fruit card component
│   ├── FruitForm.jsx             # Form for adding/editing fruits
│   ├── FruitList.jsx             # List of fruits display
│   └── LogoutButton.jsx          # Logout functionality
├── pages/
│   ├── Cart.jsx                  # Shopping cart page
│   ├── Dashboard.jsx             # Admin dashboard
│   ├── FruitShop.jsx            # Main shop page
│   └── Billing.jsx              # Billing and payment page
├── store/
│   └── CartContext.jsx           # Cart state management
├── assets/                       # Static assets
├── App.jsx                       # Main app component
├── firebase.js                   # Firebase configuration
├── main.jsx                      # App entry point
└── index.scss                    # Global styles
```

## 🛒 Usage

### For Customers:
1. **Register/Login**: Create an account or sign in
2. **Browse Products**: View available fruits in the shop
3. **Add to Cart**: Click on fruits to add them to your cart
4. **Manage Cart**: Adjust quantities or remove items
5. **Checkout**: Proceed to billing page
6. **Payment**: Fill billing information and choose payment method
7. **Complete Purchase**: Process payment and receive confirmation

### For Administrators:
1. **Dashboard Access**: Access admin dashboard after login
2. **Manage Inventory**: Add, edit, or remove fruits
3. **Monitor Sales**: Track customer purchases

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to Firebase Hosting

## 🚀 Deployment

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

4. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 🛡️ Security Features

- Firebase Authentication for secure user management
- Protected routes to prevent unauthorized access
- Input validation on forms
- Secure payment form handling
- Environment variables for sensitive configuration

## 🎨 Customization

### Adding New Fruits
1. Navigate to the Dashboard page
2. Use the FruitForm component to add new fruits
3. Fruits are stored in Firestore and automatically appear in the shop

### Styling
- Main styles are in `src/index.scss`
- Component-specific styles can be added inline or in separate SCSS files
- Responsive design breakpoints are included

## 🐛 Troubleshooting

### Common Issues:

1. **Firebase Connection Issues**
   - Check your Firebase configuration in `src/firebase.js`
   - Ensure Firestore rules allow read/write access
   - Verify Authentication is enabled

2. **Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Update dependencies: `npm update`

3. **Styling Issues**
   - Check SCSS compilation
   - Verify import paths

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Firebase for backend services
- Vite for the fast build tool
- Contributors and testers

## 📞 Support

For support, email nirmalkoswatta@gmail.com or create an issue in this repository.

---

Made with ❤️ by [Nirmalkoswatta](https://github.com/Nirmalkoswatta)
