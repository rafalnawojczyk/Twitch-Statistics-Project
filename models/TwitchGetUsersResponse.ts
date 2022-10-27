export default interface TwitchGetUsersResponse {
    data: {
        id: string;
        login: string;
        display_name: string;
        type: string;
        broadcaster_type: "partner" | "affiliate" | "";
        description: string;
        profile_image_url: string;
        offline_image_url: string;
        email: string;
        created_at: string;
    }[];
}
