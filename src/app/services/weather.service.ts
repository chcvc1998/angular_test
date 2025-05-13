import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface WeatherStation {
  id: string;
  name: string;
}

export interface TemperatureReading {
  temperatureC: number | null;
  rawText: string;
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private stationListUrl = 'https://api.weather.gov/stations?limit=100';

  constructor(private http: HttpClient) {}

  getStations(): Observable<WeatherStation[]> {
    return this.http.get<any>(this.stationListUrl).pipe(
      map(res => res.features.map((f: any) => ({
        id: f.properties.stationIdentifier,
        name: f.properties.name
      })))
    );
  }

  getCurrentTemperature(stationId: string): Observable<TemperatureReading | null> {
    const url = `https://api.weather.gov/stations/${stationId}/observations?limit=1`;
    return this.http.get<any>(url).pipe(
      map(res => {
        const observation = res.features?.[0]?.properties;
        return observation?.temperature?.value != null ? {
          temperatureC: observation.temperature.value,
          rawText: observation.rawMessage
        } : null;
      })
    );
  }
}
