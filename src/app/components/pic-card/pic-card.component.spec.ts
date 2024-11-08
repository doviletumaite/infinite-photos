import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicCardComponent } from './pic-card.component';
import { BehaviorSubject } from 'rxjs';
import { PicturesService } from 'src/app/services/pictures.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class MockPicturesService {
  private favoriteIds = ['1', '2']
  private favoriteSubject = new BehaviorSubject<string[]>(this.favoriteIds)

  getFavoritesIds() {
    return this.favoriteIds
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
