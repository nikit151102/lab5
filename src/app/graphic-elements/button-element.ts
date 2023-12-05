import { ElementRef } from "@angular/core";
import { GraphicsPlatform } from "../platforms/platform-interface";
import { GraphicsElement } from "./graphic-elements";

export class ButtonElement extends GraphicsElement {
    private buttonElement: HTMLElement | null = null;
    public width: number = 0;
    public height: number = 0;
    public text: string = '';
    public fontSize: number = 0
    public memoryLocation: string = '';
    public selectWindow: string = '';
    constructor(
        implementation: GraphicsPlatform,
        private elementRef: HTMLElement | null,
    ) {
        super(implementation);
    }

    display() {
        const buttonElementDom = document.createElement('button');
        buttonElementDom.innerText = this.text;
        buttonElementDom.style.width = `${this.width}px`;
        buttonElementDom.style.height = `${this.height}px`;
        buttonElementDom.style.fontSize = `${this.fontSize}px`;
        if (this.elementRef) {
            this.elementRef.appendChild(buttonElementDom);
            this.buttonElement = buttonElementDom
        } else {
            console.error('elementRef is null');
        }
    }

    update() {
        if (this.buttonElement) {
            this.buttonElement.innerText = this.text;
            this.buttonElement.style.width = `${this.width}px`;
            this.buttonElement.style.height = `${this.height}px`;
            this.buttonElement.style.fontSize = `${this.fontSize}px`;
        }
    }

    removeButton() {
        this.buttonElement?.remove()
    }
    resize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    setText(text: string) {
        this.text = text
    }

    setFontSise(value: number) {
        this.fontSize = value
    }
    setmemoryLocation(memoryLocation: string) {
        this.memoryLocation = memoryLocation
    }
    setInterface(value: string){
        this.selectWindow = value
    }
    handleEvent(callback: () => void) {
        if (this.buttonElement) {
          this.buttonElement.addEventListener('click', callback);
        } else {
          console.error('buttonElement is null');
        }
      }

    getsettings() {
        return {
            "width": this.width,
            "height": this.height,
            "text": this.text,
            "fontSize": this.fontSize,
            "memoryLocation": this.memoryLocation,
            "selectWindow": this.selectWindow
        }
    }
}
