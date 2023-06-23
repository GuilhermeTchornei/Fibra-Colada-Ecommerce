export interface CartWithProductsInterface {
    id: number,
    products: [{
        id: number,
        quantity: number,
        price: number,
        amount: number,
        name: string,
        size: string,
        stamp: string,
        image: string,
    }],
    totalAmount: number
}

export interface InsertCartProductInterface{
    product_variation_id: number,
    quantity: number,
}