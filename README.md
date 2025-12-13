# Todo App

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
