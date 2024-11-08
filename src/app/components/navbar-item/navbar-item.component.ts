import { Component, Input } from '@angular/core';
import { NavbarItem } from 'src/app/interfaces/navbar-item';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.scss']
})
export class NavbarItemComponent {

  @Input() item!: NavbarItem

}
