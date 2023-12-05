import { graphicsPlatform } from "../platforms/platform-interface";
import { graphicElements } from "./graphic-elements.interface";

export abstract class GraphicsElement implements graphicElements {

    protected implementation: graphicsPlatform;
  
    constructor(implementation: graphicsPlatform) {
      this.implementation = implementation;
    }
  
    abstract display(): void;
    abstract resize(width: number, height: number): void;
    abstract handleEvent(event: any): void;
  }
  