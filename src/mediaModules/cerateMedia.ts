import { getMedia } from './index.js';
import { MediaFile, Video, Image, Html } from '../mediaTypes/index.js';

export const createMedia = (file: string): MediaFile => {
    const fileType = getMedia(file);

    switch (fileType) {
        case 'video':
            return new Video(file);
        case 'image':
            return  new Image (file);
        case 'html':
            return new Html (file);
        default:
            throw new Error(`Unsupported file type: ${file}`);
    }
};
