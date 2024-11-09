import { NgModule } from '@angular/core';
import { TemplateComponent } from './template/template.component';
import { ComponentsModule } from "../components/components.module";

@NgModule({
  declarations: [
    TemplateComponent
  ],
  imports: [
    ComponentsModule
],
  exports: [
    TemplateComponent
  ]
})
export class TemplatesModule { }
