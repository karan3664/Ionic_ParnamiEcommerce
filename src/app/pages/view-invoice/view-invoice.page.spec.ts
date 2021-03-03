import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewInvoicePage } from './view-invoice.page';

describe('ViewInvoicePage', () => {
  let component: ViewInvoicePage;
  let fixture: ComponentFixture<ViewInvoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInvoicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewInvoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
