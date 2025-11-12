import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeeSidebarLayout } from './bee-sidebar-layout';

describe('BeeSidebarLayout', () => {
  let component: BeeSidebarLayout;
  let fixture: ComponentFixture<BeeSidebarLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeeSidebarLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeeSidebarLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
