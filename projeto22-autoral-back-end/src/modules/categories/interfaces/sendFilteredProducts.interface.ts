export interface ISendFilteredProducts {
    id: number,
    name: string,
    productStampId: number,
    variations: {
        id: number,
        price: number,
        size: {
            id: number,
            size: string,
        },
        enabled: boolean,
    }[],
    enabled: boolean,
    stamp: {
        id: number,
        name: string,
    },
    images: string[],
    categories: {
        id: number,
        name: string,
    }[],
}