import { Component, ElementRef, OnInit } from '@angular/core';
import { WindowsGraphicsService } from './platforms/windows.service';
import { ButtonElement } from './graphic-elements/button-element';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AndroidGraphicsService } from './platforms/android.service'
import { MacGraphicsService } from './platforms/mac.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  buttonForm: FormGroup;
  sizeWindowsForm: FormGroup;
  radiusForm: FormGroup;
  windows: any;
  android: any;
  mac: any;
  constructor(private fb: FormBuilder, private elementRef: ElementRef,
    private windowsGraphicsService: WindowsGraphicsService,
    private androidGraphicsService: AndroidGraphicsService,
    private macGraphicsService:MacGraphicsService) {
    this.buttonForm = this.fb.group({
      width: [0, Validators.required],
      height: [0, Validators.required],
      buttonText: ['', Validators.required],
      fontSize: [0, Validators.required],
      memoryLocation: ['', Validators.required],
      selectWindow:['', Validators.required]
    });
    this.sizeWindowsForm = this.fb.group({
      width: [0, [Validators.required]],
      height: [0, [Validators.required]],
      selectWindow:['', Validators.required]
    });
    this.radiusForm = this.fb.group({
      radius: [0, [Validators.required]],
      selectWindow:['', Validators.required]
    });

    this.windows = new WindowsGraphicsService;
    this.windows.resizeElement(700, 500)
    this.windows.borderRadiusElement(5)
    this.windows.displayElement()

    this.android = new AndroidGraphicsService;
    this.android.resizeElement(300, 600)
    this.android.borderRadiusElement(5)
    this.android.displayElement()

    this.mac = new MacGraphicsService;
    this.mac.resizeElement(700, 500)
    this.mac.borderRadiusElement(5)
    this.mac.displayElement()
  }
  ngOnInit() {

  }
  windowSize() {
    if (this.sizeWindowsForm.valid) {
      const sizeWindowsFormValue = this.sizeWindowsForm.value;
      switch (sizeWindowsFormValue.selectWindow) {
        case 'windows':
          this.windows.resizeElement(this.sizeWindowsForm.value.width, this.sizeWindowsForm.value.height)
          break;
        case 'android':
          this.android.resizeElement(this.sizeWindowsForm.value.width, this.sizeWindowsForm.value.height)
          break;
        case 'mac':
          this.mac.resizeElement(this.sizeWindowsForm.value.width, this.sizeWindowsForm.value.height)
          break;
      }
      this.sizeWindowsForm.reset();
    }
  }

  windowRadius() {
    if (this.radiusForm && this.radiusForm.valid) {
      const radiusFormValue = this.radiusForm.value;
      switch (radiusFormValue.selectWindow) {
        case 'windows':
          this.windows.borderRadiusElement(this.radiusForm.value.radius);
          break;
        case 'android':
          this.android.borderRadiusElement(this.radiusForm.value.radius);
          break;
        case 'mac':
          this.mac.borderRadiusElement(this.radiusForm.value.radius);
          break;
      }
      this.radiusForm.reset();
    }
  }
  
  windowsReset() {
    this.windows.resizeElement(700, 500)
    this.windows.borderRadiusElement(5)
  }

  createButton() {
    console.log("createcreate")
      const buttonFormValue = this.buttonForm.value;
      switch (buttonFormValue.selectWindow) {
        case 'windows':
          this.windows.createButton(this.windowsGraphicsService,this.buttonForm)
          break;
        case 'android':
          this.android.createButton(this.androidGraphicsService,this.buttonForm)
          break;
        case 'mac':
          this.mac.createButton(this.macGraphicsService,this.buttonForm)
          break;
      }
      this.buttonForm.reset();
  }

  getButtonsWindows() {
    return this.windows.getButtons()
  }
  getButtonsAndroid(){
    return this.android.getButtons()
  }
  getButtonsMac(){
    return this.mac.getButtons()
  }
  
  isEdit: boolean = false;

  fillForm(button: ButtonElement) {
    let settingsButton = button.getsettings()
    this.buttonForm.patchValue({
      width: settingsButton.width,
      height: settingsButton.height,
      buttonText: settingsButton.text,
      fontSize: settingsButton.fontSize,
      memoryLocation: settingsButton.memoryLocation,
      selectWindow:settingsButton.selectWindow
    });

    this.isEdit = true;
  }

  editButton() {
    const buttonFormValue = this.buttonForm.value;
      switch (buttonFormValue.selectWindow) {
      case 'windows':
        this.windows.updateButton(this.buttonForm)
        break;
      case 'android':
        this.android.updateButton(this.buttonForm)
        break;
      case 'mac':
        this.mac.updateButton(this.buttonForm)
        break;
    }
    this.isEdit = false;
    this.buttonForm.reset();
  }

  deleteButton() {
    const buttonFormValue = this.buttonForm.value;
      switch (buttonFormValue.selectWindow) {
      case 'windows':
        this.windows.removeButton(this.buttonForm.value.memoryLocation)
        break;
      case 'android':
        this.android.removeButton(this.buttonForm.value.memoryLocation)
        break;
      case 'mac':
        this.mac.removeButton(this.buttonForm.value.memoryLocation)
        break;
    }
    this.isEdit = false;
    this.buttonForm.reset();
  }

}
