export function add(x: number, y: number) {
    return x + y;
}
export const px2Rem = 37.5;
export const rem = parseFloat(document.querySelector('html')?.style.fontSize || '37.5px');
export const ratio = rem / px2Rem;
