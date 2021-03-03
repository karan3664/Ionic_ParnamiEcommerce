import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ThankyouPagePage } from './thankyou-page.page';

describe('ThankyouPagePage', () => {
  let component: ThankyouPagePage;
  let fixture: ComponentFixture<ThankyouPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThankyouPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ThankyouPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
