import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FlowerService } from './flower.service';
import { AuthService } from './auth.service';
import { of, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

describe('flowerService', () => {
  let service: FlowerService;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlowerService, AuthService]
    });

    service = TestBed.inject(FlowerService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('должен обрабатывать ошибку при получении списка цветов', () => {
    const errorResponse = {
      status: 400,
      statusText: 'Bad Request'
    };

    service.getFlowers().subscribe(
      () => fail('Ожидалась ошибка, но список цветов был загружен'),
      (error) => {
        expect(error).toBe('Не удалось загрузить список цветов');
      }
    );

    const req = httpMock.expectOne('http://localhost:8000/flowers');
    req.flush({}, errorResponse);
  });


  it('должен обрабатывать ошибку при удалении цветок', () => {
    const flowerId = 1;
    const errorResponse = {
      status: 400,
      statusText: 'Bad Request'
    };

    service.deleteFlower(flowerId).subscribe(
      () => fail('Ожидалась ошибка, но цветок был удален'),
      (error) => {
        expect(error).toBe('Не удалось удалить цветок');
      }
    );

    const req = httpMock.expectOne(`http://localhost:8000/flowers/${flowerId}`);
    req.flush({}, errorResponse);
  });



  it('должен обрабатывать ошибку сервера при получении списка цветов', () => {
    const errorResponse = {
      status: 500,
      statusText: 'Server Error',
      error: 'Server error'
    };

    service.getFlowers().subscribe(
      () => fail('Ожидалась ошибка, но был получен список цветов'),
      (error) => {
        expect(error).toBe('Серверная ошибка');
      }
    );

    const req = httpMock.expectOne('http://localhost:8000/flowers');
    req.flush('Server error', errorResponse);
  });

  it('должен обрабатывать ошибку 404 при получении списка цветов', () => {
    const errorResponse = {
      status: 404,
      statusText: 'Not Found',
      error: 'Not Found'
    };

    service.getFlowers().subscribe(
      () => fail('Ожидалась ошибка, но был получен список цветов'),
      (error) => {
        expect(error).toBe('Не удалось найти цветок');
      }
    );

    const req = httpMock.expectOne('http://localhost:8000/flowers');
    req.flush('Not Found', errorResponse);
  });
});
