import { Component } from '@angular/core';
import { BehaviorSubject, forkJoin, mergeMap, Observable, of, tap } from 'rxjs';
import { Picture } from 'src/app/interfaces/picture';
import { PicturesService } from 'src/app/services/pictures.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent {

  public pictures$ =  new BehaviorSubject<Picture[]>([]);

  constructor(
    public picturesService: PicturesService
  ){}

  ngOnInit(): void {
    this.loadPictures();
  }

  loadPictures() {
    this.picturesService.getFavoritesIds().pipe(
      mergeMap((ids: string[]) => {
        return forkJoin(ids.map(id => this.picturesService.getFavouritePicture(id)))
      })
    ).subscribe(pictures => {
      this.pictures$.next(pictures)
    });
  }

}
