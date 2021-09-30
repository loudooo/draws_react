export interface Drawing {
    id: number
    arist_id: number,
    date_creation?: Date,
    url: string,
    title?: string,
    medium?: string,
    category?: string,
    row?: number,
    col?: number,
    isHovering?:boolean
}