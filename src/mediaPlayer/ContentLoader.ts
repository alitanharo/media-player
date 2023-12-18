// ContentLoader.ts
import { MediaFile } from '../mediaTypes/index.js';
import { preloadMediaFile } from '../mediaModules/index.js';

export class ContentLoader {
    private loadedMediaFiles: Promise<MediaFile>[];
    private currentIndex: number;

    constructor(public playlist: string[]) {
        this.currentIndex = 0;
        this.loadedMediaFiles = this.playlist.map(file => preloadMediaFile(`/src/assets/${file}`));
    }

    async getMediaFiles(): Promise<MediaFile[]> {
        try {
            return await Promise.all(this.loadedMediaFiles);
        } catch (error) {
            console.error("Error loading media files:", error);
            return [];
        }
    }

    async getNextContent(): Promise<MediaFile> {
        if (this.loadedMediaFiles.length === 0) {
            throw new Error('Empty playlist ...');
        }
        const mediaFiles = await this.getMediaFiles();
        const mediaFile = mediaFiles[this.currentIndex];
        this.moveNext();
        return mediaFile;
    }

      moveNext(): void {
        this.currentIndex = (this.currentIndex + 1) % this.loadedMediaFiles.length;
    }
}
