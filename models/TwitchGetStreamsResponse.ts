export default interface TwitchGetStreamsResponse {
    game_id: string;
    game_name: string;
    id: string;
    language: string;
    tag_ids: string;
    title: string;
    thumbnail_url: string;
    type: string;
    user_id: string;
    user_login: string;
    user_name: string;
    viewer_count: number;
    started_at: string;
}
