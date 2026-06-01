import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.isFetching.set(true);
    //The call will return a json that has a "places" key and inside it, a structure that follows the same "Place" structure we have!
    const subscription = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places')
      .pipe(map((resData) => resData.places)) //Only get the places array from the response data
      .subscribe({
        next: (resData2) => {
          console.log(resData2);
          this.places.set(resData2);
        },
        error: (error) => {
          console.error('Error fetching places:', error);
          this.error.set('Failed to fetch places. Please try again later.');
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectPlace(place: Place) {
    this.httpClient.put(`http://localhost:3000/user-places/`, {
      placeId: place.id,
    }).subscribe({
      next: (resData) => {
        console.log('Place selected successfully:', resData);
      }
    });
  }
}
