import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAdminHeaderComponent } from './ticket-admin-header.component';

describe('TicketAdminHeaderComponent', () => {
  let component: TicketAdminHeaderComponent;
  let fixture: ComponentFixture<TicketAdminHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketAdminHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketAdminHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
