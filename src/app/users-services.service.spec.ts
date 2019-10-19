import { TestBed } from '@angular/core/testing';

import { UsersServicesService } from './users-services.service';

describe('UsersServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersServicesService = TestBed.get(UsersServicesService);
    expect(service).toBeTruthy();
  });
});
