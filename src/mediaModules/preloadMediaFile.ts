import { createMedia } from "./index.js";
import { MediaFile,Video,Image,Html } from "../mediaTypes/index.js";

export const preloadMediaFile = async (file: string): Promise<MediaFile> => {
    const mediaFile = createMedia(file);

    switch (mediaFile.type) {
        case 'video':
            await (mediaFile as Video).preload();
            break;
        case 'image':
            await (mediaFile as Image).preload();
            break;
        case 'html':
            await (mediaFile as Html).preload();
            break;
        default:
            throw new Error(`Unsupported media type`);
    }

    return mediaFile;
};
