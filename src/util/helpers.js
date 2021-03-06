export const numberBetween = (min, max): Number => {
    return min + Math.floor(Math.random() * max)
};

export function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}