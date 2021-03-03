import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WriteReviewPage } from './write-review.page';

describe('WriteReviewPage', () => {
  let component: WriteReviewPage;
  let fixture: ComponentFixture<WriteReviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteReviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WriteReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
