export default interface TwitchGetFollowersResponse {
    total: number;
    data: {
        from_id: string;
        from_login: string;
        from_name: string;
        to_id: string;
        to_name: string;
        followed_at: string;
    }[];
    pagination: {
        cursor: string;
    };
}
