import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEditFormComponent } from './account-edit-form.component';

describe('AccountEditFormComponent', () => {
  let component: AccountEditFormComponent;
  let fixture: ComponentFixture<AccountEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
