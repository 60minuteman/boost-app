# Boost App 🚀

This is a React Native [Expo](https://expo.dev) project with [Expo Router](https://docs.expo.dev/router/introduction/) for file-based routing, created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## 📋 Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

## 🚀 Get started

1. **Install dependencies**

   ```bash
   yarn install
   ```

2. **Start the development server**

   ```bash
   yarn start
   ```

3. **Run on specific platforms**

   ```bash
   # iOS
   yarn ios
   
   # Android
   yarn android
   
   # Web
   yarn web
   ```

## 📁 Project Structure

```
boost-app/
├── app/                    # File-based routing directory
│   ├── (tabs)/            # Tab navigation group
│   │   ├── _layout.tsx    # Tab layout configuration
│   │   ├── index.tsx      # Home tab screen
│   │   └── explore.tsx    # Explore tab screen
│   ├── _layout.tsx        # Root layout
│   └── +not-found.tsx     # 404 page
├── assets/                # Static assets (images, fonts)
├── components/            # Reusable React components
├── constants/             # App constants (colors, etc.)
├── hooks/                 # Custom React hooks
└── scripts/               # Build and utility scripts
```

## 🧭 Navigation with Expo Router

This project uses **Expo Router** for navigation, which provides:

- **File-based routing**: Routes are automatically generated based on file structure
- **TypeScript support**: Fully typed navigation
- **Deep linking**: Built-in support for URL-based navigation
- **Tab navigation**: Pre-configured bottom tab navigation

### Adding new screens

1. **Create a new screen file** in the `app/` directory:
   ```typescript
   // app/profile.tsx
   import { View, Text } from 'react-native';
   
   export default function ProfileScreen() {
     return (
       <View>
         <Text>Profile Screen</Text>
       </View>
     );
   }
   ```

2. **Navigation** is automatic - access via `/profile`

3. **For tab screens**, add to `app/(tabs)/` directory

### Programmatic navigation

```typescript
import { router } from 'expo-router';

// Navigate to a screen
router.push('/profile');

// Navigate with parameters
router.push('/user/123');

// Go back
router.back();
```

## 🛠️ Development

- **Linting**: `yarn lint`
- **Type checking**: TypeScript is configured with path aliases (`@/` points to root)
- **Hot reloading**: Enabled by default in development

## 📱 Platform Support

- ✅ iOS
- ✅ Android  
- ✅ Web
- ✅ New Architecture enabled

## 🎨 Styling & Theming

- Dark/Light theme support built-in
- Platform-specific styling
- Expo Vector Icons included
- Haptic feedback components

## 📚 Learn more

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router documentation](https://docs.expo.dev/router/introduction/)
- [React Native documentation](https://reactnative.dev/)

## 🤝 Join the community

- [Expo on GitHub](https://github.com/expo/expo)
- [Discord community](https://chat.expo.dev)
