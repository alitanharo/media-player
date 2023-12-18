//index.ts

import { App } from './App.js';

const playlist = [
  'content.html',
  'video1.mp4',
  'image3.jpg',
  'image2.jpg',
  'video2.mp4',
  'video3.mp4',
  'image4.jpg',
  'video5.mp4',
  'image1.jpg',
  'video4.mp4',
];

document.addEventListener('DOMContentLoaded', () => {
  const app = new App(playlist);
  app.run();
});


