import { Component } from '@angular/core';
import { WeatherStationListComponent } from './components/weather-station-list/weather-station-list.component';
import { TemperatureDisplayComponent } from './components/temperature-display/temperature-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [WeatherStationListComponent, TemperatureDisplayComponent]
})
export class AppComponent {
  selectedStationId: string | null = null;

  onStationSelected(station: { id: string; name: string }) {
    this.selectedStationId = station.id;
  }
}



