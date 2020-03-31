import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CotentListPage } from './cotent-list.page';

describe('CotentListPage', () => {
  let component: CotentListPage;
  let fixture: ComponentFixture<CotentListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotentListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CotentListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
