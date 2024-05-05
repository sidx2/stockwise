import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCheckinComponent } from './item-checkin.component';

describe('ItemCheckinComponent', () => {
  let component: ItemCheckinComponent;
  let fixture: ComponentFixture<ItemCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemCheckinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
