#!/bin/bash

# Production deployment script

# Exit on any error
set -e

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
    echo "You can now start the production server with: npm start"
else
    echo "Build failed!"
    exit 1
fi