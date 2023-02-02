import { TestBed } from '@angular/core/testing';

import { SurveyItemService } from './survey-item.service';

describe('SurveyItemService', () => {
  let service: SurveyItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
