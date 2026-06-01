import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  httpClient = inject(HttpClient);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {}

  loadUserPlaces() {}

  addPlaceToUserPlaces(place: Place) {}

  removeUserPlace(place: Place) {}

  private fetchPlaces(){
    this.httpClient
          .get<{ places: Place[] }>('http://localhost:3000/places')
          .pipe(map((resData) => resData.places)) //Only get the places array from the response data
  }
}
