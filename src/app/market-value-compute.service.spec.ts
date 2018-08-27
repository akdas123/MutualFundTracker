import { TestBed, inject } from '@angular/core/testing';

import { MarketValueComputeService } from './market-value-compute.service';

describe('MarketValueComputeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarketValueComputeService]
    });
  });

  it('should be created', inject([MarketValueComputeService], (service: MarketValueComputeService) => {
    expect(service).toBeTruthy();
  }));
});
