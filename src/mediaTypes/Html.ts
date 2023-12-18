import { MediaFile, MediaStatus } from './index.js';

export class Html implements MediaFile {

    type: 'html' = 'html';
    src: string;
    status: MediaStatus;
    private DEFAULT_DURATION = 7000;
    public iframeElement: HTMLIFrameElement;

    constructor(src: string) {
        this.src = src;
        this.iframeElement = document.createElement('iframe');
        this.status = MediaStatus.Staged;
    }

    private setStatus(newStatus: MediaStatus) {
        this.status = newStatus;
    }

    public getStatus(): string {
        return this.status;
    }

    private setUpMediaFile(): void {
        if (this.iframeElement) {
            this.iframeElement.src = this.src;
            this.iframeElement.frameBorder = '0';
            this.iframeElement.allowFullscreen = true;
            this.iframeElement.style.display = 'none';
        }
    }

    public resize(): void {
        if (this.iframeElement) {
            this.iframeElement.width = `${window.innerWidth}px`;
            this.iframeElement.height = `${window.innerHeight}px`;
        }
    }

    public async render(): Promise<void> {
        return new Promise((resolve) => {
            const contentContainer = document.getElementById('content');
            this.setUpMediaFile()
            resolve();
            if (contentContainer) contentContainer?.appendChild(this.iframeElement);
            this.resize();
        });
    }

    getDuration(): number {
        return this.DEFAULT_DURATION;
    }

    public play(callback: () => void): void {
        const onHide = () => {
            this.iframeElement.style.display = 'none';
            this.setStatus(MediaStatus.Ended);
            callback();
        };
        setTimeout(onHide, this.getDuration());
    }

    public async preload(): Promise<void> {
        try {
            this.render();
        } catch (error) {
            console.error('Error preloading iframe:', error);
            throw error;
        }
    }

    public getHtmlElement(): HTMLIFrameElement {
        return this.iframeElement;
    }

    public visible(): void {
        this.iframeElement.style.display = 'block';
        this.resize();
        this.setStatus(MediaStatus.ReadyToPlay)
    }
}
