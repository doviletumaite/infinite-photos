import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, map, mergeMap, Observable, of, tap } from 'rxjs';
import { Picture } from 'src/app/interfaces/picture';
import { PicturesService } from 'src/app/services/pictures.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit{

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

  getFavourite(picture: Picture): Observable<boolean>  {
    return this.picturesService.getFavoritesIds()
    .pipe(
      map((favoriteIds: string[]) => favoriteIds.includes(picture!.id))
    );
  }

}
