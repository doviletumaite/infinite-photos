import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PicturesService } from './pictures.service';
import { Picture } from '../interfaces/picture';

describe('PicturesService', () => {
  let service: PicturesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PicturesService]
    });
    service = TestBed.inject(PicturesService)
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify()
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch pictures with the correct URL', fakeAsync( () => {
    const mockPictures: Picture[] = [
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

    const page = 1
    const limit = 20

    service.getPictures(page, limit).subscribe((pictures) => {
      expect(pictures).toEqual(mockPictures)
    });

    const req = httpMock.expectOne(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
    expect(req.request.method).toBe('GET')
    req.flush(mockPictures)
  }));
});
