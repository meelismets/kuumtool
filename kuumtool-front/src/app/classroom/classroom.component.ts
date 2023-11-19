import { Component, ElementRef, ViewChild } from '@angular/core';
import { SpotService } from '../spot.service';
import * as heatmap from 'heatmap.js';
import { Spot } from '../models/Spot';
import { IntervalService } from '../interval.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent {
  @ViewChild('map') map!: ElementRef;
  spotData!: Spot[];
  heatmapInstance: any;

  constructor(private spotService: SpotService, private intervalService: IntervalService) {}

  ngAfterViewInit() {
    this.renderMap()
    this.intervalService.getIntervalObservable().subscribe((value) => {
      console.log('Interval value:', value);
      this.fetchSpots();
    });

  }

  randomData() {
    // now generate some random data
    let points = [];
    let max = 100;

    for (let i = 0; i < this.spotData.length; i++) {
      let val = Math.floor(Math.random()*100);
      max = Math.max(max, val);
      let point = {
        x: this.spotData[i].axx,
        y: this.spotData[i].axy,
        value: val
      };
      points.push(point);
    }
    // heatmap data format
    let mapData = {
      size: 40,
      max: max,
      min: 10,
      data: points
    };
    // if you have a set of datapoints always use setData instead of addData
    // for data initialization
    this.heatmapInstance.setData(mapData);
  }
  renderMap() {
    // minimal heatmap instance configuration
    this.heatmapInstance = heatmap.create({
      // only container is required, the rest will be defaults
      container: this.map.nativeElement
    });
  }
  fetchSpots(): void {
    this.spotService.getSpots().subscribe(
      (response) => {
        this.spotData = response;
        this.randomData();
        console.log('Data:', this.spotData);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
