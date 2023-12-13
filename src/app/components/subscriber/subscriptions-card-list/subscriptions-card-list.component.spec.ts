import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsCardListComponent } from './subscriptions-card-list.component';

describe('SubscriptionsCardListComponent', () => {
  let component: SubscriptionsCardListComponent;
  let fixture: ComponentFixture<SubscriptionsCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionsCardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionsCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
