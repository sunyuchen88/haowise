#!/bin/bash

# Production start script

# Exit on any error
set -e

# Check if the build exists
if [ ! -d ".next" ]; then
    echo "Build not found. Running build first..."
    npm run build
fi

# Start the Next.js production server
echo "Starting Next.js production server..."
npm start