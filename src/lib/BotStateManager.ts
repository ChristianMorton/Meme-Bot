export class BotStateManager {
    private static instance: BotStateManager;
    private autoReplyEnabled: boolean = true;
    private pinterestEnabled: boolean = false;
    private pinterestBoardUrl: string | null = null;

    private constructor() {}

    public static getInstance(): BotStateManager {
        if (!BotStateManager.instance) {
            BotStateManager.instance = new BotStateManager();
        }
        return BotStateManager.instance;
    }

    public isAutoReplyEnabled(): boolean {
        return this.autoReplyEnabled;
    }

    public isPinterestEnabled(): boolean {
        return this.pinterestEnabled;
    }

    public getPinterestBoard(): string | null {
        return this.pinterestBoardUrl;
    }

    public setPinterestBoard(url: string): void {
        this.pinterestBoardUrl = url;
    }

    public toggleAutoReply(): boolean {
        this.autoReplyEnabled = !this.autoReplyEnabled;
        return this.autoReplyEnabled;
    }

    public togglePinterest(): boolean {
        this.pinterestEnabled = !this.pinterestEnabled;
        return this.pinterestEnabled;
    }
} 