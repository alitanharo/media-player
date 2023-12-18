import { MediaFile, MediaStatus } from "./index.js";

export class Video implements MediaFile {

    type: 'video' = 'video';
    src: string;
    status: MediaStatus;
    public videoElement: HTMLVideoElement;

    constructor(src: string) {
        this.src = src;
        this.videoElement = document.createElement('video');
        this.status = MediaStatus.Staged;
    }

    private setStatus(newStatus: MediaStatus) {
        this.status = newStatus;
    }

    public getStatus(): string {
        return this.status;
    }

    private setUpMediaFile(): void {
        if (this.videoElement) {
            this.videoElement.src = this.src;
            this.videoElement.autoplay = true;
            this.videoElement.muted = true;
            this.videoElement.playsInline = true;
            this.videoElement.style.objectFit = 'cover';
            this.videoElement.preload = 'auto';
            this.videoElement.style.display = 'none';
        }
    }

    public resize(): void {
        if (this.videoElement) {
            this.videoElement.width = window.innerWidth;
            this.videoElement.height = window.innerHeight;
        }
    }

    public async render(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const contentContainer = document.getElementById('content');
            this.setUpMediaFile();
            if (contentContainer) {
                contentContainer.appendChild(this.videoElement);
                this.resize();
                resolve();
            } else {
                reject(new Error('Content container is not ready to render.'));
            }
        });
    };

    public play(callback: () => void): void {
        const onEnded = () => {
            this.videoElement?.removeEventListener('ended', onEnded);
            this.videoElement.style.display = 'none';
            this.setStatus(MediaStatus.Ended);
            callback();
        };
        this.videoElement?.addEventListener('ended', onEnded);
        this.videoElement?.play();
    }

     public async preload(): Promise<void> {
        try {
            this.render();
        } catch (error) {
            console.error('Error preloading Video:', error);
            throw error;
        }
    }

    public getHtmlElement(): HTMLVideoElement {
        return this.videoElement;
    }

    public visible(): void {
        this.videoElement.style.display = 'block';
        this.setStatus(MediaStatus.ReadyToPlay);
        this.resize();
    }
}
