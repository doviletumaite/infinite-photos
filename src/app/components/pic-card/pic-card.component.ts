import { Component, Input, OnInit } from '@angular/core';
import { Picture } from 'src/app/interfaces/picture';
import { PicturesService } from 'src/app/services/pictures.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pic-card',
  templateUrl: './pic-card.component.html',
  styleUrls: ['./pic-card.component.scss']
})
export class PicCardComponent {

  @Input() pic?: Picture

  @Input() isFavorite = false

  isHovered = false

  constructor(
    private favoritesService: PicturesService,
    private router: Router
  ) {}

  getFavourite(){
    if(this.pic){
      this.favoritesService.getFavoritesIds().subscribe((favoriteIds: string[]) => {
        this.isFavorite = favoriteIds.includes(this.pic!.id);
      });
    }
  }

  toggleFavorite(): void {
    if (!this.isFavorite) {
      this.favoritesService.addToFavorites(this.pic!.id)
      this.getFavourite()
    } else if (this.router.url.includes('favourites')){
      this.goToDetails()
    }
  }

  goToDetails(){
    if (this.isFavorite) {
      this.router.navigate([`/photos/${this.pic?.id}`])
    }
  }

  onHoverStateChange(state: boolean) {
    this.isHovered = state
  }

}
