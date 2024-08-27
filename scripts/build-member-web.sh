#!/bin/bash

# Define the project path and target directory
PROJECT_PATH="/Users/vishalacharya/Documents/node-projects/fitflow/app-member"
BUILD_COMMAND="pnpm build:web"
BUILD_DIR="$PROJECT_PATH/dist"
TARGET_DIR="$(pwd)/member-web-build"

# Function to run a command and check for errors
run_command() {
    echo "Running: $1"
    eval $1
    if [ $? -ne 0 ]; then
        echo "Error: Command failed - $1"
        exit 1
    fi
}

# Function to copy files from source to destination
copy_files() {
    echo "Copying files from $1 to $2..."
    mkdir -p "$2"
    cp -r "$1"/* "$2"
    if [ $? -ne 0 ]; then
        echo "Error: Failed to copy files."
        exit 1
    fi
}

# Main script execution
echo "Starting the build process..."
run_command "cd $PROJECT_PATH && $BUILD_COMMAND"

echo "Ensuring target directory $TARGET_DIR exists..."
mkdir -p "$TARGET_DIR"

echo "Copying build files to $TARGET_DIR..."
copy_files "$BUILD_DIR" "$TARGET_DIR"

echo "Build and copy process completed successfully!"

