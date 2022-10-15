import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],

})
export class PagesModule {

}
