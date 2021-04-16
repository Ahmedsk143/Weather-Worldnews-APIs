import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap, tap, toArray } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';
interface apiResponse {
  list: {
    dt_txt: string;
    main: { temp: number };
  }[];
}
@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private rootURL = 'http://api.openweathermap.org/data/2.5/forecast';
  constructor(
    private http: HttpClient,
    private NotifiSer: NotificationService
  ) {}

  getForecast() {
    return this.getCurrentLocation().pipe(
      map((coords) => {
        return new HttpParams()
          .set('lat', String(coords.latitude))
          .set('lon', String(coords.longitude))
          .set('appid', 'bd4237943750b8699d9627bf2729c674')
          .set('units', 'metric');
      }),
      switchMap((CooordsParams) => {
        return this.http.get<apiResponse>(this.rootURL, {
          params: CooordsParams,
        });
      }),
      mergeMap((apiRes) => {
        return apiRes.list
          .map((record) => {
            return { dataText: record.dt_txt, temp: record.main.temp };
          })
          .filter((record, index) => {
            return index % 8 === 0;
          });
      }),
      toArray()
    );
  }

  getCurrentLocation() {
    return new Observable<any>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (postion) => {
          observer.next(postion.coords);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
    }).pipe(
      tap(
        () => {
          this.NotifiSer.addSuccessNotification('Your forecast is ready.');
        },
        () => {
          this.NotifiSer.addErrorNotification(
            'Allow the geolocation to veiw the forecast'
          );
        }
      )
    );
  }
}
