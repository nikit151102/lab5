import { Injectable } from '@angular/core';
import { ButtonElement } from '../graphic-elements/button-element';
import { GraphicsPlatform } from './platform-interface';

@Injectable({
  providedIn: 'root'
})
export class MacGraphicsService implements GraphicsPlatform {
  backgroundColor: string = ''
  width: number = 0;
  height: number = 0;
  borderRadius: number = 0;
  private macElement: HTMLElement | null = null;
  private buttons: ButtonElement[] = [];
  constructor() { }

  displayElement() {
      this.macElement = document.createElement('div');
      this.macElement.style.background = 'url(../assets/mac.jpg)';
      this.macElement.style.backgroundSize = 'cover';
      this.macElement.style.width = `${this.width}px`;
      this.macElement.style.height = `${this.height}px`;
      this.macElement.style.borderRadius = `${this.borderRadius}px`;
      this.macElement.style.borderBottom = '15px solid #000';
      this.macElement.style.borderTop = '20px solid #000';
      this.macElement.style.borderLeft = '10px solid #000';
      this.macElement.style.borderRight = '10px solid #000';
      this.macElement.style.marginBottom = `10px`;
      this.macElement.style.backgroundRepeat = `no-repeat`;
      this.macElement.style.backgroundPosition = `center`;
      this.macElement.id = 'Mac';
      document.body.appendChild(this.macElement);
  }

  resizeElement(width: number, height: number) {
      this.width = width;
      this.height = height;

      if (this.macElement) {
          this.macElement.style.width = `${this.width}px`;
          this.macElement.style.height = `${this.height}px`;
      }
  }

  borderRadiusElement(value: number) {
      this.borderRadius = value;
      if (this.macElement) {
          this.macElement.style.borderRadius = `${this.borderRadius}px`;
      }
  }

  handleElementEvent(event: any) {
      console.log('Handling event on Windows:', event);
  }

  createButton(platform: GraphicsPlatform,buttonForm: any ) {
    let windows = document.getElementById('Mac');
    const buttonElement = new ButtonElement(
      platform,
      windows
    );
    buttonElement.resize(buttonForm.value.width, buttonForm.value.height);
    buttonElement.setText(buttonForm.value.buttonText);
    buttonElement.setFontSise(buttonForm.value.fontSize);
    const memoryLocation = `0x${(Math.random() * 0xFFFFFFFF).toString(16)}`
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
          console.log(`Button with memoryLocation ${memoryLocation} removed.`);
      } else {
          console.log(`Button with memoryLocation ${memoryLocation} not found.`);
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