import { TestBed, inject } from '@angular/core/testing';

import { OpenDialogService } from './open-dialog.service';

describe('OpenDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenDialogService]
    });
  });

  it('should be created', inject([OpenDialogService], (service: OpenDialogService) => {
    expect(service).toBeTruthy();
  }));
});
