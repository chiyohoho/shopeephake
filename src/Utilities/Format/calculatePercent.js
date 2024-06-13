export const calculatePercentDiscount = (originalPrice, discountedPrice) => {
    const discountPercentage = (originalPrice - discountedPrice) / originalPrice * 100;
    return Math.round(discountPercentage)
}