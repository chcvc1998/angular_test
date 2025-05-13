import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WeatherService, WeatherStation } from '../../services/weather.service';

@Component({
  standalone: true,
  selector: 'app-weather-station-list',
  templateUrl: './weather-station-list.component.html',
  styleUrls: ['./weather-station-list.component.scss'],
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule]
})
export class WeatherStationListComponent implements OnInit {
  @Output() stationSelected = new EventEmitter<{ id: string; name: string }>();
  stations: WeatherStation[] = [];
  isLoading = true;
  displayedColumns = ['name'];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getStations().subscribe(data => {
      this.stations = data;
      this.isLoading = false;
    });
  }

selectStation(station: WeatherStation) {
  this.stationSelected.emit({ id: station.id, name: station.name });
}
}
