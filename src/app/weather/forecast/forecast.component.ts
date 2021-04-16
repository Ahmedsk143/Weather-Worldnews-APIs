import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  forecast: {
    dataText: string;
    temp: number;
  }[];
  constructor(private forecastSer: ForecastService) {}

  ngOnInit(): void {
    this.forecastSer.getForecast().subscribe((res) => {
      this.forecast = res;
    });
  }
}
