import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';


import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MenuComponent } from './menu/menu.component';
import { DemoComponent } from './demo/demo.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


import {UsersServicesService} from './services/users.service';
import { MultiplicatedComponent } from './multiplicated/multiplicated.component';
import { MemoryComponent } from './memory/memory.component';

const appRoutes: Routes = [
  { path: '',      component: HomeComponent},
  { path: 'Demo',      component: DemoComponent},
  { path: 'Menu', component: MenuComponent},
  { path: 'Multiplicate', component: MultiplicatedComponent}

];




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    DemoComponent,
    MultiplicatedComponent,
    MemoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [UsersServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
