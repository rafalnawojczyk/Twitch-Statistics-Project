class Stats {
    title: string;
    views: number;
    image: string;
    id: string;
    gameStreaming?: string;

    constructor(title: string, views: number, image: string, id: string, gameStreaming?: string) {
        this.title = title;
        this.views = views;
        this.image = image;
        this.id = id;
        if (gameStreaming) {
            this.gameStreaming = gameStreaming;
        }
    }
}

export default Stats;
