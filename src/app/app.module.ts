import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { DetailsComponent } from './pages/details/details.component';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { TemplatesModule } from './templates/templates.module';
import { HttpClientModule } from '@angular/common/http';
import { ScrollToBottomDirective } from './directives/scroll-to-bottom/scroll-to-bottom.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HoverStateDirective } from './directives/hover-state/hover-state.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavouritesComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    TemplatesModule,
    HttpClientModule,
    ScrollToBottomDirective,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    HoverStateDirective
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
