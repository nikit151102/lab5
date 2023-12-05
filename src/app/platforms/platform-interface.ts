export interface graphicsPlatform {
  displayElement(): void;
  resizeElement(width: number, height: number): void;
  handleElementEvent(event: any): void;
}

export abstract class GraphicsPlatform {
  abstract displayElement(): void;
  abstract resizeElement(width: number, height: number): void;
  abstract handleElementEvent(event: any): void;
}
