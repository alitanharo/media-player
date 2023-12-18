export const getMedia = (file: string): 'video' | 'image' | 'html' => {
    if (file.endsWith('.mp4') || file.endsWith('.ogg')) {
        return 'video';
    } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        return 'image';
    } else if (file.endsWith('.html')) {
        return 'html';
    } else {
        throw new Error(`Unsupported file type: ${file}`);
    }
};
