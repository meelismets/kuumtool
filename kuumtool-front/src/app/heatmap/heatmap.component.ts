import { Component, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import * as heatmap from 'heatmap.js';


@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent {
  @ViewChild('map') map!: ElementRef;
  spotData: any;

  constructor() {}

  ngAfterViewInit(){
    // minimal heatmap instance configuration
    let heatmapInstance = heatmap.create({
      // only container is required, the rest will be defaults
      container: this.map.nativeElement
    });

    // now generate some random data
    let points = [];
    let max = 100;
    let width = 840;
    let height = 1000;
    let len = 500;

    while (len--) {
      let val = Math.floor(Math.random()*100);
      max = Math.max(max, val);
      let point = {
        x: Math.floor(Math.random()*width),
        y: Math.floor(Math.random()*height),
        value: val
      };
      points.push(point);
    }
    // heatmap data format
    let mapData = {
      max: max,
      min: 10,
      data: points
    };
    // if you have a set of datapoints always use setData instead of addData
    // for data initialization
    heatmapInstance.setData(mapData);
  }
}
