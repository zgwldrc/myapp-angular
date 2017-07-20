import { TestBed, inject } from '@angular/core/testing';

import { AccountAddEventEmitService } from './account-add-event-emit.service';

describe('AccountAddEventEmitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountAddEventEmitService]
    });
  });

  it('should be created', inject([AccountAddEventEmitService], (service: AccountAddEventEmitService) => {
    expect(service).toBeTruthy();
  }));
});
