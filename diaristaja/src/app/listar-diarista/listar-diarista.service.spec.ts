import { TestBed, inject } from '@angular/core/testing';

import { ListarDiaristaService } from './listar-diarista.service';

describe('ListarDiaristaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListarDiaristaService]
    });
  });

  it('should ...', inject([ListarDiaristaService], (service: ListarDiaristaService) => {
    expect(service).toBeTruthy();
  }));
});
