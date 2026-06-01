import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { tap } from 'rxjs/internal/operators/tap';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  httpClient = inject(HttpClient);
  errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Failed to fetch availableplaces. Please try again later.',
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Failed to fetch user-places. Please try again later.',
    ).pipe(tap({
      next: (places) => {
        this.userPlaces.set(places);
      }
    }));
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();

    if(!prevPlaces.some(p => p.id === place.id)) { // only update if necessary
      this.userPlaces.update((prevPlaces) => [...prevPlaces, place]); // too optimistic update
    }
    return this.httpClient.put(`http://localhost:3000/user-places/`, {
      placeId: place.id,
    }).pipe(
      catchError((error) => {
        console.error('Error adding place to user-places:', error);
        // Revert the optimistic update in case of an error
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('Failed to add place to user-places. Please try again later.');
        return throwError(() => new Error('Failed to add place to user-places. Please try again later.'));
      })
    );
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();

    if(prevPlaces.some(p => p.id === place.id)) { // only update if necessary
      this.userPlaces.update((prevPlaces) => prevPlaces.filter(p => p.id !== place.id));
    }

    return this.httpClient.delete(`http://localhost:3000/user-places/${place.id}`)
    .pipe(
      catchError((error) => {
        console.error('Error removing place from user-places:', error);
        // Revert the optimistic update in case of an error
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('Failed to remove place from user-places. Please try again later.');
        return throwError(() => new Error('Failed to remove place from user-places. Please try again later.'));
      })
    );
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((resData) => resData.places), //Only get the places array from the response data
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      }),
    );
  }
}
