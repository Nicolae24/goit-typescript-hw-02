import axios from "axios";
import { ImageItem } from "../types"

export interface GetPhotosResponse {
    results: ImageItem[];
    total_pages: number;
}

export const getPhotos = async (query = "", page = 1): Promise<GetPhotosResponse> => {
    const { data } = await axios.get < GetPhotosResponse > ("https://api.unsplash.com/search/photos",

    {
        headers: {
            Authorization: "Client-ID fElFWTAtJ7viVzcWfRqvSW8UoxtUKVgqKh1WE4Lz7Tw",
            AcceptVersion: "v1",
        },

        params: {
            query,
            page,
            per_page: 10,
            // client_id: "fElFWTAtJ7viVzcWfRqvSW8UoxtUKVgqKh1WE4Lz7Tw",
        },
    });
    return data;
}

// client_id=fElFWTAtJ7viVzcWfRqvSW8UoxtUKVgqKh1WE4Lz7Tw

