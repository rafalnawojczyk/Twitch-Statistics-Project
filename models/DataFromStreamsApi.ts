export default interface DataFromStreamsApi {
    userId: string;
    userLogin: string;
    userName: string;
    gameName: string;
    gameId: string;
    title: string;
    viewerCount: number;
    language: string;
    imageUrl: string;
    followers?: number;
}
