import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopovereditComponent } from './popoveredit.component';

describe('PopovereditComponent', () => {
  let component: PopovereditComponent;
  let fixture: ComponentFixture<PopovereditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopovereditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopovereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
