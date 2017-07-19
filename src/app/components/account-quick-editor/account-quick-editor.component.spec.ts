import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountQuickEditorComponent } from './account-quick-editor.component';

describe('AccountQuickEditorComponent', () => {
  let component: AccountQuickEditorComponent;
  let fixture: ComponentFixture<AccountQuickEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountQuickEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountQuickEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
