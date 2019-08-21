import { TestBed } from '@angular/core/testing';

import { SVGServiceService } from './svgservice.service';

describe('SVGServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SVGServiceService = TestBed.get(SVGServiceService);
    expect(service).toBeTruthy();
  });
});
