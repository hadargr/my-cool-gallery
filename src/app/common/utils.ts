export const emulateSlowCode = () => {
    const startTime = performance.now();
    // wait in while loop for 10 ms
    while (performance.now() - startTime < 10) { }
}
