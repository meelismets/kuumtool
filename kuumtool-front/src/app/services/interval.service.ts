import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IntervalService {
  private interval$: Observable<number>;

  constructor() {
    this.interval$ = interval(1000);
  }

  getIntervalObservable(): Observable<number> {
    return this.interval$;
  }
}

