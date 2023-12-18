# Multimedia Player


## Table of Contents

- [Overview](#Overview)
- [Features](#features)
- [Technical Details](#Technical-Details)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)



## Overview

The Media Player App is a modern web application designed to provide a seamless and immersive media playback experience. It supports various media types, including videos, images, and HTML content. Built with TypeScript, the app leverages web technologies to create a dynamic and responsive media player.

## Features

- **Playlist Management:** Create and manage playlists with different types of media files.
- **Media Player Functionality:** Play, and handle end-of-media events.
- **Content Loading:** Dynamically load media files from the playlist.
- **Media Types:** Support for videos, images, and HTML content.
- **Fullscreen Mode:** Toggle fullscreen mode(F11) for an immersive viewin experience.
- **Mouse Interaction:** Responsive handling of mouse movements.
- **Responsive Design:** Adapt to window resizes for a seamless user experience.
- **Preloading Media:** Enhance performance by preloading media files.
- **Loading Screen:** Provide visual feedback with a loading screen during content loading.

## Technical-Details

- **Tech Stack:**
  - TypeScript
  - JavaScript (ES6+)
  - HTML5
  - CSS
- **Modular Structure:** Organized codebase with modular components (Player, ContentLoader, Media Types).
- **Error Handling:** Graceful error handling during media file loading.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/alitanharo/media-player.git

Navigate to the project directory:

cd multimedia-player
Install dependencies:
npm install

## Usage
Build and start the project:
npm start

Open your web browser and visit http://localhost:3000 to see the app in action press F11 to full screen mood.
Enjoy playing different types of media using the multimedia player!

## Project Structure
src/: Contains the TypeScript source code.
mediaPlayer/: Module for media player functionality.
mediaTypes/: Classes representing different media types (Video, Image, Html).
mediaModules/: Utility functions for media handling.
index.ts: Entry point for the application.
index.html: HTML file to load the multimedia player.
package.json: Project configuration and dependencies.
tsconfig.json: TypeScript configuration.
Dependencies
typescript: TypeScript compiler for type-checking and transpilation.
Scripts
npm run build: Build the TypeScript code.

## Dependencies

- **TypeScript:** This project is written in TypeScript, a superset of JavaScript that adds static typing.

  ```json
  "devDependencies": {
      "typescript": "^5.3.2"
  }


## Contributing
Contributions are welcome! If you have ideas for improvements or find issues, please open an issue or submit a pull request.