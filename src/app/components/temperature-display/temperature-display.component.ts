import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { WeatherService, TemperatureReading } from '../../services/weather.service';

@Component({
  standalone: true,
  selector: 'app-temperature-display',
  templateUrl: './temperature-display.component.html',
  styleUrls: ['./temperature-display.component.scss'],
  imports: [CommonModule, MatCardModule]
})
export class TemperatureDisplayComponent implements OnChanges {
  @Input() stationId: string | null = null;

  temperature: TemperatureReading | null = null;

  constructor(private weatherService: WeatherService) {}

  ngOnChanges(): void {
    if (this.stationId) {
      this.weatherService.getCurrentTemperature(this.stationId).subscribe(data => {
        this.temperature = data;
      });
    }
  }
}
