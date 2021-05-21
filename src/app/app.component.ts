import { Component, OnInit } from '@angular/core';
import { Camera } from './camera';
import { CameraService } from './camera.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ChartComponent } from '../app/chart/chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  modalType: string;

  form = this.fb.group({
    name: ['', Validators.required],
    model: ['', Validators.required],
    resolutions: ['',[Validators.required, Validators.pattern('^([^A-Za-z0][0-9]+)x([^A-Za-z0][0-9]+)$')]],
    ip: [{value:''},[Validators.required, Validators.pattern('([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})')]],
  });

  get name(){return this.form.get('name')}
  get model(){return this.form.get('model')}
  get resolutions(){return this.form.get('resolutions')}
  get ip(){return this.form.get('ip')}


  cameras: Camera[];
  editCamera: Camera;
  editDeleteCamera: Camera;
  searchInput = new FormControl('');

  constructor(
    private fb:FormBuilder,
    private cameraService: CameraService
    ){}
 
  ngOnInit() {
    this.getCameras();
  }

  clickMethod(name: string) {
    if(confirm("Are you sure to delete "+name)) {
      console.log("Implement delete functionality here");
    }
  }

  getCameras(): void {
    this.cameraService.getCameras().subscribe(
      (response: Camera[]) => {
        this.cameras = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onSubmitCamera(): void {
    if(this.modalType === 'add'){
      this.addCamera();
    }else if(this.modalType === 'edit'){
      this.updateCamera();
    }
  }

  addCamera(): void {
    this.cameraService.addCamera(this.form.value).subscribe(
      (response: Camera) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      },
      () => {
        this.getCameras();
        this.form.reset();
      }
    );
  }

  updateCamera(): void {
    const { name, model, resolutions, ip } = this.form.getRawValue();
    this.cameraService.updateCamera(this.editDeleteCamera.id,{ name, model, resolutions, ip }).subscribe(
      (response: Camera) => {
        console.log(response);
        this.getCameras();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onDeleteCamera(): void {
    this.cameraService.deleteCamera(this.editDeleteCamera.id).subscribe(
      (response: void) => {
        alert("deleted succesfully");
        this.getCameras();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  searchCameras(): void {
    let key = this.searchInput.value
    const results: Camera[] = [];
    for (const camera of this.cameras) {
      if (camera.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || camera.model.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || camera.resolutions.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || camera.ip.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(camera);
      }
    }
    this.cameras = results;
    if (results.length === 0 || !key) {
      this.getCameras();
    }
  }

  setEditDelete(camera: Camera){
    this.modalType = "edit";
    this.editDeleteCamera = camera;
    const { name, model, resolutions, ip } = this.editDeleteCamera
    this.form.setValue({ name, model, resolutions, ip });
    this.form.controls['ip'].disable();
  }

  setAddModal(){
    this.modalType = "add";
    this.form.reset();
    this.form.controls['ip'].enable();
  }

}