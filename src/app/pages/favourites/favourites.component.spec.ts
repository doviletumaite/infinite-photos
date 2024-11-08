import { ComponentFixture, fakeAsync, flush, resetFakeAsyncZone, TestBed, tick } from '@angular/core/testing';

import { FavouritesComponent } from './favourites.component';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Picture } from 'src/app/interfaces/picture';

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
          provide: MockPicturesService,
          useValue: picturesService
        },
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(FavouritesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
