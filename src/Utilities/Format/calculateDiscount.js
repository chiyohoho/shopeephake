import { formatCurrencyVND } from "./formatCurrency"

export const calculateDiscount = (listItems) => {
    const totalDiscount = listItems.reduce((total, item) => {
        return total + (item.buy_count * (item.product.price_before_discount - item.product.price))
    }, 0)
    return formatCurrencyVND(totalDiscount)
}

export const calculateTotal = (listItems) => {
    const totalPrice = listItems.reduce((total, item) => {
        return total + (item.buy_count * item.product.price)
    }, 0)
    return formatCurrencyVND(totalPrice)
}