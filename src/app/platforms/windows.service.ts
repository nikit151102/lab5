import { Injectable } from '@angular/core';
import { GraphicsPlatform } from './platform-interface';
import { ButtonElement } from '../graphic-elements/button-element';

@Injectable({
    providedIn: 'root',
})
export class WindowsGraphicsService implements GraphicsPlatform {
    backgroundColor: string = ''
    width: number = 0;
    height: number = 0;
    borderRadius: number = 0;
    private windowsElement: HTMLElement | null = null;
    private buttons: ButtonElement[] = [];
    constructor() { }

    displayElement() {
        this.windowsElement = document.createElement('div');
        this.windowsElement.style.background = 'url(../assets/windows.jpg)';
        this.windowsElement.style.backgroundSize = 'cover';
        this.windowsElement.style.width = `${this.width}px`;
        this.windowsElement.style.height = `${this.height}px`;
        this.windowsElement.style.borderRadius = `${this.borderRadius}px`;
        this.windowsElement.style.borderBottom = '15px solid #000';
        this.windowsElement.style.borderTop = '20px solid #000';
        this.windowsElement.style.borderLeft = '10px solid #000';
        this.windowsElement.style.borderRight = '10px solid #000';
        this.windowsElement.style.marginBottom = `10px`;
        this.windowsElement.style.backgroundRepeat = `no-repeat`;
        this.windowsElement.style.backgroundPosition = `center`;
        this.windowsElement.id = 'Windows';
        document.body.appendChild(this.windowsElement);
    }

    resizeElement(width: number, height: number) {
        this.width = width;
        this.height = height;

        if (this.windowsElement) {
            this.windowsElement.style.width = `${this.width}px`;
            this.windowsElement.style.height = `${this.height}px`;
        }
    }

    borderRadiusElement(value: number) {
        this.borderRadius = value;
        if (this.windowsElement) {
            this.windowsElement.style.borderRadius = `${this.borderRadius}px`;
        }
    }

    handleElementEvent(event: any) {
        console.log('Handling event on Windows:', event);
    }

    createButton(platform: GraphicsPlatform,buttonForm: any ) {
        let windows = document.getElementById('Windows');
        const buttonElement = new ButtonElement(
          platform,
          windows
        );
        const memoryLocation = `0x${(Math.random() * 0xFFFFFFFF).toString(16)}`
        buttonElement.resize(buttonForm.value.width, buttonForm.value.height);
        buttonElement.setText(buttonForm.value.buttonText);
        buttonElement.setFontSise(buttonForm.value.fontSize);
        buttonElement.setmemoryLocation(memoryLocation)
        buttonElement.setInterface(buttonForm.value.selectWindow)
        this.addButton(buttonElement);
        buttonElement.display();
        buttonElement.handleEvent(() => {
            console.log('memoryLocation button ',memoryLocation);
          });
      } 
      
    addButton(button: ButtonElement) {
        this.buttons.push(button);
    }

    removeButton(memoryLocation: string) {
        const button = this.buttons.find(button => button.memoryLocation === memoryLocation);
        const index = this.buttons.findIndex(button => button.memoryLocation === memoryLocation);
        if (index !== -1) {
            if (button) {
                button.removeButton()
            }
            this.buttons.splice(index, 1);
            console.log(`Button ${memoryLocation} removed.`);
        }
    }

    getButtons() {
        return this.buttons;
    }

    updateButton(buttonForm: any) {
        const updatedButton: any = {
            width: buttonForm.value.width,
            height: buttonForm.value.height,
            text: buttonForm.value.buttonText,
            fontSize: buttonForm.value.fontSize,
            memoryLocation: buttonForm.value.memoryLocation
        };

        const buttonToUpdate = this.buttons.find(button => button.memoryLocation === updatedButton.memoryLocation);

        if (buttonToUpdate) {
            buttonToUpdate.resize(updatedButton.width, updatedButton.height);
            buttonToUpdate.setText(updatedButton.text);
            buttonToUpdate.setFontSise(updatedButton.fontSize);
            buttonToUpdate.update()
            console.log(`Button with memoryLocation ${updatedButton.memoryLocation} updated.`);
        } else {
            console.log(`Button with memoryLocation ${updatedButton.memoryLocation} not found.`);
        }
    }
}