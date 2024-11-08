import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template/template.component';
import { ComponentsModule } from "../components/components.module";



@NgModule({
  declarations: [
    TemplateComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
],
  exports: [
    TemplateComponent
  ]
})
export class TemplatesModule { }
