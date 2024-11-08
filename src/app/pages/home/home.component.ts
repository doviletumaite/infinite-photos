import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, concatMap, debounce, debounceTime, delay, from, interval, Observable, of, switchMap, tap, shareReplay } from 'rxjs';
import { Picture } from 'src/app/interfaces/picture';
import { PicturesService } from 'src/app/services/pictures.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  public picturesSubject = new BehaviorSubject<Picture[]>([])

  public pictures$ = this.picturesSubject.asObservable()

  page= 1

  limit = 20

  loading = false

  constructor(
    public picturesService: PicturesService
  ){}

  ngOnInit(): void {
    this.loadPictures()
  }

  loadPictures() {
    if (this.loading) return
    this.loading = true

    this.picturesService.getPictures(this.page, this.limit).pipe(
      tap(() => this.page++),
      tap(newPictures => {
        this.picturesSubject.next(newPictures)
        this.loading = false
      })
    ).subscribe()
  }

  loadMorePictures(){
    if (this.loading) return
    this.loading = true


    this.picturesService.getPictures(this.page, this.limit)
    .pipe(
      debounceTime(300),
      tap(() => this.page++),
      switchMap(newPictures => {

        return from(newPictures).pipe(
          concatMap((pic) => {

            return of(pic).pipe(
              delay(500 + Math.random() * 100),
              tap(() => {
                const currentPictures = this.picturesSubject.value
                const updatedPictures = [...currentPictures, pic]
                this.picturesSubject.next(updatedPictures)
              })
            );
          })
        );
      })
    ).subscribe({
      complete: () => {
        this.loading = false
      }
    });
  }

  trackById(index: number, item: Picture): string {
    return item.id
  }

}
