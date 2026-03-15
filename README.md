# Todo App

## 📱 Mobile Application (Android)

A simple React Native Todo App built with Expo.

## Features

- Add, Edit, Delete Tasks
- Persist data using AsyncStorage
- Voice Input (OpenAI Whisper) to add tasks
- Clean UI

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure OpenAI API (for Voice):**
   Open `src/components/VoiceFAB.js` and replace `YOUR_OPENAI_API_KEY` with your actual API key.

3. **Run the app:**
   ```bash
   npx expo start
   ```

## Notes

- The voice recording feature requires microphone permissions.
- Voice transcription uses OpenAI API, so an internet connection is required.

You can test the mobile version of this LMS/Todo app directly on your Android device.

1. **Download the APK:**

- [https://expo.dev/accounts/olamijidev/projects/todo-app/builds/c972ff45-21b2-4c29-9765-6d42b4725c61]

  **Copy Repo:**

```bash
https://github.com/bello682/To-Do-List-App-Task.git
```

2. **Install:** You may need to "Allow installation from unknown sources" in your Android settings.
3. **Features:** Supports real-time task syncing with the Node.js backend and AI-powered voice task creation via Whisper AI.
