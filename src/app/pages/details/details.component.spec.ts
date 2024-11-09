import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import { Picture } from 'src/app/interfaces/picture';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PicturesService } from 'src/app/services/pictures.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class MockActivatedRoute {
  paramMap = of({ get: (param: string) => param === 'id' ? '1' : null })
}

class MockPicturesService {
  getFavouritePicture(id: string) {
    const mockPicture: Picture = {
      id: '1',
      author: 'Author1',
      download_url: 'url1',
      width: 0,
      height: 0,
      url: ''
    }
    return of(mockPicture)
  }
}




describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let picturesService: MockPicturesService;

  let activatedRoute: MockActivatedRoute;

  beforeEach(() => {
    activatedRoute = new MockActivatedRoute()
    picturesService = new MockPicturesService()


    TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: PicturesService, useValue: picturesService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })

    fixture = TestBed.createComponent(DetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  });

  it('should fetch picture when id param is provided', () => {
    component.ngOnInit()
    fixture.detectChanges()

    component.picture$.subscribe(picture => {
      expect(picture).toBeTruthy()
      expect(picture.id).toBe('1')
      expect(picture.author).toBe('Author1')
    });
  });
});
