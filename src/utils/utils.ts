//задерживает выполнение функции, пока не пройдет заданное количество времени с последнего вызова.
export function debounce(func: Function, wait: number) {
    let timeout: number;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            func.apply(null, args);
        }, wait);
    };
}