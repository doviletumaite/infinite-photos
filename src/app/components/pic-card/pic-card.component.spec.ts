import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PicCardComponent } from './pic-card.component';
import { BehaviorSubject } from 'rxjs';
import { PicturesService } from 'src/app/services/pictures.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class MockPicturesService {
  private favoriteIds: string[] = []
  private favoriteSubject = new BehaviorSubject<string[]>(this.favoriteIds)

  getFavoritesIds() {
    return this.favoriteSubject.asObservable()
  }
  addToFavorites(id: string) {
    if (!this.favoriteIds.includes(id)) {
      this.favoriteIds.push(id)
      this.favoriteSubject.next(this.favoriteIds)

      localStorage.setItem('favorites', JSON.stringify(this.favoriteIds))
    }
  }
}

class MockRouter {
  url = '';
  navigate(path: string[]) {
    return path;
  }
}

describe('PicCardComponent', () => {
  let component: PicCardComponent
  let fixture: ComponentFixture<PicCardComponent>
  let picturesService: MockPicturesService
  let router: MockRouter

  beforeEach(() => {
    picturesService = new MockPicturesService()
    router = new MockRouter()

    TestBed.configureTestingModule({
      declarations: [PicCardComponent],
      providers: [
        { provide: PicturesService, useValue: picturesService },
        { provide: router, useValue: router },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(PicCardComponent);
    component = fixture.componentInstance;
    component.pic ={
      id: '1',
      author: 'Author1',
      download_url: 'url1',
      width: 0,
      height: 0,
      url: ''
    }
    fixture.detectChanges()
    component.ngOnInit()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add to favorites when clicking on it', () => {
    spyOn(picturesService, 'addToFavorites').and.callThrough();

    expect(component.isFavorite).toBeFalse();

    component.toggleFavorite();

    expect(picturesService.addToFavorites).toHaveBeenCalledWith('1');

    component.getFavourite();
    fixture.detectChanges();

    expect(component.isFavorite).toBeTrue();
  });
});
