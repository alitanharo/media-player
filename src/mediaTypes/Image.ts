import { MediaFile, MediaStatus } from './index.js';

export class Image implements MediaFile {

    type: 'image' = 'image';
    src: string;
    status: MediaStatus;
    private DEFAULT_DURATION = 4000;
    private imageElement: HTMLImageElement;

    constructor(src: string) {
        this.src = src;
        this.imageElement = document.createElement('img')
        this.status = MediaStatus.Staged;
    }

    private setStatus(newStatus: MediaStatus) {
        this.status = newStatus;
    }

    public getStatus(): string {
        return this.status;
    }

    private setUpMediaFile(): void {
        if (this.imageElement) {
            this.imageElement.src = this.src;
            this.imageElement.alt = 'Image';
            this.imageElement.style.objectFit = 'cover';
            this.imageElement.style.display = 'none';
        }
    }

    public resize(): void {
        if (this.imageElement) {
            this.imageElement.width = window.innerWidth;
            this.imageElement.height = window.innerHeight;
        }
    }

    public async render(): Promise<void> {
        return new Promise((resolve, reject) => {
            const contentContainer = document.getElementById('content');
            this.setUpMediaFile();
            if (contentContainer) {
                contentContainer.appendChild(this.imageElement);
                this.resize();
                resolve();
            } else {
                reject(new Error('Image is not ready to render.'));
            }
        });
    }

    private getDuration(): number {
        return this.DEFAULT_DURATION;
    }

    public play(callback: () => void): void {
        const onHide = () => {
             this.imageElement.removeEventListener('load', onHide);
            this.imageElement.style.display = 'none';
            this.setStatus(MediaStatus.Ended);
            callback();
        };

        this.imageElement.addEventListener('load', onHide);
        setTimeout(() => {
            onHide();
        }, this.getDuration());
    }


    public async preload(): Promise<void> {
        try {
            this.render();
        } catch (error) {
            console.error('Error preloading image:', error);
            throw error;
        }
    }

    public getHtmlElement(): HTMLImageElement {
        return this.imageElement;
    }

    public visible(): void {
        const image = this.getHtmlElement()
        image.style.display = 'block';
        this.resize();
        this.setStatus(MediaStatus.ReadyToPlay)
    }
}

