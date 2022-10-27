export default interface DataFromStreamsApi {
    userId: string;
    userLogin: string;
    userName: string;
    gameName: string;
    gameId: string;
    title: string;
    viewerCount: number;
    language: string;
    profileImg?: string;
    description?: string;
    createdAt?: string;
    broadcasterType?: "partner" | "affiliate" | "";
    imageUrl: string;
    followers?: number;
}
