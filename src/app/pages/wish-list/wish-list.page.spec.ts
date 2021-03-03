import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WishListPage } from './wish-list.page';

describe('WishListPage', () => {
  let component: WishListPage;
  let fixture: ComponentFixture<WishListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WishListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
