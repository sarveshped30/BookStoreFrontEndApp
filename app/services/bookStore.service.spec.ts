import { TestBed } from '@angular/core/testing';

import {bookStoreService } from './bookStore.service';

describe('bookStoreService', () => {
  let service: bookStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(bookStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
