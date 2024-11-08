import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Picture } from 'src/app/interfaces/picture';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PicturesService } from 'src/app/services/pictures.service';

class MockPicturesService {
  getPictures() {
    const mockPictures: Picture[] = [
      {
        id: '1', author: 'Author1', download_url: 'url1',
        width: 0,
        height: 0,
        url: ''
      },
      {
        id: '2', author: 'Author2', download_url: 'url2',
        width: 0,
        height: 0,
        url: ''
      }
    ];
    return of(mockPictures);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let picturesService: MockPicturesService;

  beforeEach(() => {
    picturesService = new MockPicturesService()

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: PicturesService,
          useValue: picturesService
        }
      ],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display pictures when receiving them at the init', fakeAsync(() => {
    component.loadPictures()
    fixture.detectChanges()

    component.pictures$.subscribe(pictures => {
     expect(pictures.length).toBe(2)
     expect(pictures[0].author).toBe('Author1')
     expect(pictures[1].author).toBe('Author2')
    });
  }))


  it('should load more pictures when loadMorePictures is called', fakeAsync(() => {
    component.loadPictures()

    fixture.detectChanges()

    component.loadMorePictures()
    tick(2000)

    fixture.detectChanges()

    component.picturesSubject.subscribe(pictures => {
      expect(pictures.length).toBe(4)
      expect(pictures[2].author).toBe('Author1')
      expect(pictures[3].author).toBe('Author2')
    });
  }));
});
