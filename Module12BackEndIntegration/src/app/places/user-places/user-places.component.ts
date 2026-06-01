import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { HttpClient } from '@angular/common/http';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  //places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  //private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private placesService = inject(PlacesService);
  places = this.placesService.loadedUserPlaces;

  ngOnInit() {
    this.isFetching.set(true);
    //The call will return a json that has a "places" key and inside it, a structure that follows the same "Place" structure we have!
    const subscription = this.placesService.loadUserPlaces().subscribe({
      error: (error) => {
        console.error('Error fetching user-places:', error);
        this.error.set('Failed to fetch user-places. Please try again later.');
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
    this.placesService.removeUserPlace(place).subscribe({
      error: (error) => {
        console.error('Error removing place from user-places:', error);
        this.error.set('Failed to remove place from user-places. Please try again later.');
      },
    });
  }
}
