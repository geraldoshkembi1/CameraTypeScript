import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera } from './camera';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class CameraService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getCameras(): Observable<Camera[]> {
    return this.http.get<Camera[]>(`${this.apiServerUrl}/cameras`);
  }

  public addCamera(camera: Camera): Observable<Camera> {
    return this.http.post<Camera>(`${this.apiServerUrl}/cameras`, camera);
  }

  public updateCamera(cameraId:number,cameraUpdateRequest: any): Observable<Camera> {
    return this.http.put<Camera>(`${this.apiServerUrl}/cameras/${cameraId}`, cameraUpdateRequest);
  }

  public deleteCamera(cameraId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/cameras/${cameraId}`);
  }
}