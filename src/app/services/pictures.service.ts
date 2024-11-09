import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Picture } from '../interfaces/picture';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  private favoriteIds: string[] = []

  private favoriteSubject = new BehaviorSubject<string[]>(this.favoriteIds)

  favorites$ = this.favoriteSubject.asObservable()

  constructor(
    private http:HttpClient
  ) {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favoriteIds = JSON.parse(storedFavorites);
      this.favoriteSubject.next(this.favoriteIds);
    }
   }

  getPictures(page: number, limit: number){
   const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
   return this.http.get<Picture[]>(url)
  }

  addToFavorites(picId: string): void {
    if (!this.favoriteIds.includes(picId)) {
      this.favoriteIds.push(picId);
      this.favoriteSubject.next(this.favoriteIds);
      localStorage.setItem('favorites', JSON.stringify(this.favoriteIds));
    }
  }

  removeFromFavorites(picId: string): void {
    this.favoriteIds = this.favoriteIds.filter(id => id !== picId);
    this.favoriteSubject.next(this.favoriteIds);
    localStorage.setItem('favorites', JSON.stringify(this.favoriteIds));
  }

  getFavoritesIds(){
    return of(this.favoriteIds);
  }

  getFavouritePicture(id: string){
    const url = `https://picsum.photos/id/${id}/info`
    return this.http.get<Picture>(url)
  }
}
