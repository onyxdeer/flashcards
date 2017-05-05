#!/bin/bash
# will need chmod permission to run this script
# pm2 start start.sh --name appNameYouLike
cd voice-server/server
export GOOGLE_APPLICATION_CREDENTIALS=/home/public/flashcards/googleSpeechKey.json
npm start

