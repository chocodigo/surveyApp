import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContentDetailPage } from './content-detail.page';

describe('ContentDetailPage', () => {
  let component: ContentDetailPage;
  let fixture: ComponentFixture<ContentDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
