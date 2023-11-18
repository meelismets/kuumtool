import { Component } from '@angular/core';
import { SpotService } from '../spot.service';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent {
  data: any;

  constructor(private spotService: SpotService) {}

  ngOnInit(): void {
    this.fetchSpots();
  }
  fetchSpots(): void {
    this.spotService.getSpots().subscribe(
      (response) => {
        this.data = response;
        console.log('Data:', this.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

}
