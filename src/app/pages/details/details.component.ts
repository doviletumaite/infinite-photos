import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Picture } from 'src/app/interfaces/picture';
import { PicturesService } from 'src/app/services/pictures.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public picture$ = new Observable<Picture>()

  constructor(
    private router: ActivatedRoute,
    public pictureService: PicturesService,
    private route: Router
  ){}

  ngOnInit(): void {
    this.router.paramMap.subscribe(params=>{
      if (params.get('id')) {
       this.picture$ = this.pictureService.getFavouritePicture(params.get('id')!)
      }
    })
  }

  onGoToFavourites(){
    this.route.navigate([`/favourites`])
  }
}
