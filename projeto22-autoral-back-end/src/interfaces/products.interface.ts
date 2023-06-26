export interface ISendProduct {
    id: number,
    name: string,
    sizes: string[],
    stamps: [{
        name: string,
        image: string,
    }],
    productStamp: [{
        id: number,
        stampName: string,
        stampImage: string,
        images: string[],
        enabled: boolean,
        variations: [{
            id: number,
            price: number,
            size: string,
            enabled: boolean
        }]
    }]
}