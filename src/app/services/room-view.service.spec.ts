import { TestBed } from '@angular/core/testing';

import { RoomViewService } from './room-view.service';

describe('RoomViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomViewService = TestBed.get(RoomViewService);
    expect(service).toBeTruthy();
  });
});
