import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarItemComponent } from './navbar-item.component';
import { NavbarItem } from 'src/app/interfaces/navbar-item';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NavbarItemComponent', () => {
  let component: NavbarItemComponent;
  let fixture: ComponentFixture<NavbarItemComponent>;

  const mockNavbarItem: NavbarItem = {
    name: 'home',
    symbol: 'home',
    path: '/'
  };

  beforeEach(() => {
    const activatedRouteMock = {
      snapshot: { params: {} },
      queryParams: of({}),
      paramMap: of({}),
      url: of([]),
      children: [],
    };

    TestBed.configureTestingModule({
      declarations: [NavbarItemComponent],
      imports: [RouterModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(NavbarItemComponent);
    component = fixture.componentInstance;

    component.item = mockNavbarItem;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
