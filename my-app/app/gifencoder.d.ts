declare module 'gifencoder' {
    export default class GIFEncoder {
        constructor(width: number, height: number);
        start(): void;
        setRepeat(repeat: number): void;  // 0 for repeat, -1 for no-repeat
        setDelay(delay: number): void;   // frame delay in milliseconds
        setQuality(quality: number): void; // quality (1 = best, 10 = default)
        addFrame(ctx: CanvasRenderingContext2D): void;
        finish(): void;
        out: { getData(): Buffer }; // Buffer containing GIF data
    }
}