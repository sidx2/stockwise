import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLifecycleComponent } from './item-lifecycle.component';

describe('ItemLifecycleComponent', () => {
  let component: ItemLifecycleComponent;
  let fixture: ComponentFixture<ItemLifecycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemLifecycleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemLifecycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
