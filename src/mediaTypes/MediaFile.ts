// MediaFile.ts
export interface MediaFile {
    type: 'video' | 'image' | 'html';
    src: string;
    status: MediaStatus;
    render(): Promise<void> ;
    play(callback: () => void): void;
    preload(): Promise<void>;
    resize():void;
    getHtmlElement():HTMLIFrameElement|HTMLVideoElement|HTMLImageElement;
    visible():void;
    getStatus():string;
}


export enum MediaStatus {
    Staged = 'staged',
    Loading = 'loading',
    ReadyToPlay = 'ready_to_play',
    Rendered = 'rendered',
    Ended = 'ended',
    Removed = 'removed',
    Error = 'error'
}


