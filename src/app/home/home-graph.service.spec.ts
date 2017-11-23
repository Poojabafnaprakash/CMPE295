import { TestBed, inject } from '@angular/core/testing';

import { HomeGraphService } from './home-graph.service';

describe('HomeGraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeGraphService]
    });
  });

  it('should be created', inject([HomeGraphService], (service: HomeGraphService) => {
    expect(service).toBeTruthy();
  }));
});
