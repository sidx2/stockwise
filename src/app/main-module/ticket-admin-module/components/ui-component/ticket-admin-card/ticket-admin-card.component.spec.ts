import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAdminCardComponent } from './ticket-admin-card.component';

describe('TicketAdminCardComponent', () => {
  let component: TicketAdminCardComponent;
  let fixture: ComponentFixture<TicketAdminCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketAdminCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketAdminCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
