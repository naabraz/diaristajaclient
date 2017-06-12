import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaristaCadastroComponent } from './diarista-cadastro.component';

describe('DiaristaCadastroComponent', () => {
  let component: DiaristaCadastroComponent;
  let fixture: ComponentFixture<DiaristaCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaristaCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaristaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
