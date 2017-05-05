#!/bin/bash
cd /voice-server/server
export GOOGLE_APPLICATION_CREDENTIALS=/home/public/flashcards/googleSpeechKey.json
npm start



# pm2 start start.sh --name appNameYouLike