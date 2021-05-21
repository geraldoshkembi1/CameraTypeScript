import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CameraService } from './camera.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartComponent } from './chart/chart.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{path: 'Chart', component: ChartComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  exports:[RouterModule],
  providers: [CameraService],
  bootstrap: [AppComponent]
})
export class AppModule { }