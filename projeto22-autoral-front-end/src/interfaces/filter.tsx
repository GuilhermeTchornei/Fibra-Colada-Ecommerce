export interface ISendFilter {
    categories: number[],
    stamps: number[],
    sizes: number[]
}

export interface IGetFilter {
    categories: {
        id: number,
        name: string,
    }[],
    stamps: {
        id: number,
        name: string,
        image: string,
    }[],
    sizes: {
        id: number,
        size: string,
    }[]
}