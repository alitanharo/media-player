// App.ts
import { Player, ContentLoader } from './mediaPlayer/index.js';

export class App {
    private player!: Player;

    constructor(public playlist: string[]) {
        this.initializePlayer();
        this.setupEventListeners();
    }

    private initializePlayer(): void {
        const contentLoader = new ContentLoader(this.playlist);
        this.player = new Player(contentLoader);
    }

    private setupEventListeners(): void {
        window.addEventListener('resize', () => this.player.handleWindowResize());
        this.player.errorHandler()
    }

    run(): void {
        this.player.startLoop();
    }
}
