let timeout: any
export const debounce = (fn: () => void, duration: number = 500) => {
    function runFunction() {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn()
        }, duration);
    }
    runFunction()
}
