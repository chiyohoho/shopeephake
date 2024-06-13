export const formatSold = (number) => {
    const ranges = [
        { divider: 1e6, suffix: 'M' },
        { divider: 1e3, suffix: 'K' },
    ];

    for (const { divider, suffix } of ranges) {
        if (number >= divider) {
            return (number / divider).toFixed(1) + suffix;
        }
    }

    return number.toString();
}