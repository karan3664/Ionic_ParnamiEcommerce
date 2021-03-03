import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyOrderPage } from './my-order.page';

describe('MyOrderPage', () => {
  let component: MyOrderPage;
  let fixture: ComponentFixture<MyOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
