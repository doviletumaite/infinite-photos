import { Component } from '@angular/core';
import { NavbarItem } from 'src/app/interfaces/navbar-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public items:  NavbarItem[] = [
    {
      name: 'Home',
      symbol: 'home',
      path: '/'
    },
    {
      name: 'Favourites',
      symbol: 'favorites',
      path: '/favourites'
    },
  ]
}
