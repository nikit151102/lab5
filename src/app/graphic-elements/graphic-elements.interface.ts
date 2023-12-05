export interface graphicElements {
    display(): void;
    resize(width: number, height: number): void;
    handleEvent(event: any): void;
}