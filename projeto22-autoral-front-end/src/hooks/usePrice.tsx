export default function UsePrice(price: number) {
    return price.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
    });
}