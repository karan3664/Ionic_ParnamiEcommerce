import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddtocartPopupPage } from './addtocart-popup.page';

describe('AddtocartPopupPage', () => {
  let component: AddtocartPopupPage;
  let fixture: ComponentFixture<AddtocartPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtocartPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddtocartPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
