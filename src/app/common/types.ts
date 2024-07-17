export enum GalleryType {
    Grid,
    Collage,
    Stacked,
}

export interface ImageData {
    albumId?: number;
    id: number;
    thumbnailUrl: string;
    title: string;
    url: string;
}

export interface StyledGalleryProps {
    images: ImageData[];
}
