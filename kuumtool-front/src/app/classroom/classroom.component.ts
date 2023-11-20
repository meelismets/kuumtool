import { Component, ElementRef, ViewChild } from '@angular/core';
import { SpotService } from '../services/spot.service';
import * as h337 from 'heatmap.js';
import { Spot } from '../models/Spot';
import { IntervalService } from '../services/interval.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent {
  @ViewChild('map') map!: ElementRef;
  private unsubscribe$: Subject<void> = new Subject<void>();
  spotData!: Spot[];
  visibilityMap: { [name: string]: boolean } = {};
  blame = true;
  heatmapInstance: any;

  constructor(private spotService: SpotService, private intervalService: IntervalService) {}

  ngAfterViewInit() {
    this.renderMap()
    this.intervalService.getIntervalObservable().subscribe((value) => {
      this.fetchSpots();
    });

  }

  randomData() {
    // now generate some random data
    let points = [];
    let max = 100;
    let noticeWhen = 89;

    for (let i = 0; i < this.spotData.length; i++) {
      let val = this.spotData[i].volume > this.spotData[i].movement ? this.spotData[i].volume : this.spotData[i].movement;
      if (this.spotData[i].simulated) {
        val = Math.floor(Math.random()*100);
        max = Math.max(max, val);
      }
      let point = {
        x: this.spotData[i].axx,
        y: this.spotData[i].axy,
        value: val
      };
      points.push(point);
      this.visibilityMap[this.spotData[i].name] = val > noticeWhen && this.blame;
    }
    // heatmap data format
    let mapData = {
      radius: 200,
      max: max,
      min: 1,
      data: points
    };
    // if you have a set of datapoints always use setData instead of addData
    // for data initialization
    this.heatmapInstance.setData(mapData);
  }
  renderMap() {
    let nuConfig = {
      radius: 80,
      maxOpacity: .9,
      minOpacity: 0,
      blur: .65,
      container: this.map.nativeElement
    };
    // minimal heatmap instance configuration
    this.heatmapInstance = h337.create(nuConfig);
  }
  toggleVisibility(name: string): void {
    this.visibilityMap[name] = !this.visibilityMap[name];
  }

  fetchSpots(): void {
    this.spotService.getSpots()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
      (response) => {
        this.spotData = response;
        this.randomData();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
