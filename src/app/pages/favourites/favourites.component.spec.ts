import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { FavouritesComponent } from './favourites.component';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Picture } from 'src/app/interfaces/picture';
import { PicturesService } from 'src/app/services/pictures.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class MockPicturesService {
  private favoriteIds: string[] = ['1', '2']

  getFavoritesIds() {
    return of(this.favoriteIds)
  }

  mockPictures: Picture[] = [
    {
      id: '1',
      author: 'Author1',
      download_url: 'url1',
      width: 0,
      height: 0,
      url: ''
    },
    {
      id: '2',
      author: 'Author2',
      download_url: 'url2',
      width: 0,
      height: 0,
      url: ''
    }
  ];

  getPictures(): Observable<Picture[]> {
    return of(this.mockPictures);
  }

  getFavouritePicture(id: string) {
    return of(this.mockPictures.find(pic => pic.id === id))
  }
}

describe('FavouritesComponent', () => {
  let component: FavouritesComponent
  let fixture: ComponentFixture<FavouritesComponent>
  let picturesService: MockPicturesService

  beforeEach(() => {
    picturesService = new MockPicturesService()

    TestBed.configureTestingModule({
      declarations: [FavouritesComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: PicturesService,
          useValue: picturesService
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(FavouritesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display favourite pictures if they exist', fakeAsync(() => {
   component.ngOnInit();

   tick();
   fixture.detectChanges();

   const pictureElements = fixture.nativeElement.querySelectorAll('app-pic-card');
   expect(pictureElements.length).toBe(2);

   flush();
  }));
});
