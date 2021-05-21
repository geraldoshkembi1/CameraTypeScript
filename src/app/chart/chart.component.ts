import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { Camera } from '../camera';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent {

    MEGAPIXEL = 1000000;
    RESOLUTION_REGEX = /([0-9]+)x([0-9]+)/g;
    data = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    _cameras: Camera[];
    chart: Chart;

    @Input()
    set cameras(cameras: Camera[]) {
        this._cameras = cameras;
        this.data = [0,0,0,0,0,0,0,0,0,0,0,0,0];
        this._cameras?.forEach(
            (camera: Camera) => {
                this.countCameras(camera);
            }
        )
        this.chart = this.createChart();
    }

    constructor() { }

    resolutionString2Number(resolution: string): number{
        const resolutions = new RegExp(this.RESOLUTION_REGEX).exec(resolution);
        return parseInt(resolutions[1])*parseInt(resolutions[2]);
    }

    countCameras(camera: Camera): void {
        let resolution = this.resolutionString2Number(camera.resolutions)/this.MEGAPIXEL;
        resolution = Math.round(resolution);
        if(resolution<1){
            resolution=1;
        }else if(resolution > 12){
            resolution=13
        } 
        this.data[resolution-1]++;
    }

    createChart(): Chart{
        this.chart?.destroy();
        Chart.register(...registerables);
        return new Chart('camChart', {
            type: 'bar',
            data: {
                labels: ['1MP', '2MP', '3MP', '4MP', '5MP', '6MP','7MP', '8MP', '9MP', '10MP', '11MP', '12MP', '12+MP'],
                datasets: [{
                    label: 'Number of Cameras per RES',
                    data: this.data,
                  
                    backgroundColor: [
                        
                        'rgba(255, 206, 86, 0.5)',
                        
                    ],
                   
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

}
