import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { PicCardComponent } from './pic-card/pic-card.component';
import {MatButtonModule} from '@angular/material/button';
import { NavbarItemComponent } from './navbar-item/navbar-item.component';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from '../app-routing.module';
import {MatCardModule} from '@angular/material/card';
import { HoverStateDirective } from '../directives/hover-state/hover-state.directive';


@NgModule({
  declarations: [
    NavbarComponent,
    PicCardComponent,
    NavbarItemComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    MatCardModule,
    HoverStateDirective
  ],
  exports: [
    NavbarComponent,
    PicCardComponent
  ],
})
export class ComponentsModule {}
