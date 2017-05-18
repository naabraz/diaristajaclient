import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDiaristaComponent } from './listar-diarista.component';

describe('ListarDiaristaComponent', () => {
  let component: ListarDiaristaComponent;
  let fixture: ComponentFixture<ListarDiaristaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarDiaristaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarDiaristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
