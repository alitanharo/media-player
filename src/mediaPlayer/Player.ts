// Player.ts
import { ContentLoader } from '../mediaPlayer/index.js';
import { MediaFile } from '../mediaTypes/index.js';

export class Player {

    public mediaFile: MediaFile | null = null;

    constructor(private contentLoader: ContentLoader) { }

    private async playNextContent(): Promise<void> {
        const mediaFile = this.contentLoader.getNextContent();
        const currentStatus = this.mediaFile?.status;
        (await mediaFile).visible();
        if (currentStatus) {
            if (currentStatus === 'ended' && (await mediaFile).status === 'ready_to_play') {
                this.playMediaFile(await mediaFile)
            }
        } else {
            this.playMediaFile(await mediaFile)
        }
    }

    private playMediaFile(mediaFile: MediaFile): void {
        const contentElement = document.getElementById('content');
        if (contentElement) {
            this.mediaFile = mediaFile;
            this.handleWindowResize();
            this.mediaFile.play(() => this.playNextContent())

        }
    }

    public startLoop(): void {
        this.playNextContent();
    }

    public handleKeyPress(event: KeyboardEvent): void {
        if (event.key === 'F11') {
            this.toggleFullscreen();
        };

    }

    public toggleFullscreen(): void {
        const contentElement = document.getElementById('content');

        if (!contentElement) {
            console.error('Content element with ID "content" not found.');
            return;
        }

        if (document.fullscreenEnabled) {
            if (!document.fullscreenElement) {
                contentElement.requestFullscreen().catch((error) => {
                    console.error('Error entering fullscreen mode:', error);
                });
            } else {
                document.exitFullscreen();
            }
        } else {
            console.error('Fullscreen API is not supported in this browser.');
        }
    }


    handleWindowResize(): void {
        this.mediaFile?.resize();
    }

    errorHandler(): void {
        const mediaHtmlElement = this.mediaFile?.getHtmlElement();
        if (mediaHtmlElement) {
            mediaHtmlElement.addEventListener('error', (error) => {
                throw new Error(`Error loading at ${this.mediaFile?.type} Element: ${error}`)

            })
        }

    }
}