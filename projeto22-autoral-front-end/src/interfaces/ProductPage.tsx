export default interface ProductPageInterface {
    id: number,
    name: string,
    sizes: string[],
    stamps: [{
        name: string,
        image: string,
    }],
    variations: [{
        id: number,
        price: number,
        size: string,
        stampName: string,
        stampImage: string,
        images: string[],
        enabled: boolean
    }]
}