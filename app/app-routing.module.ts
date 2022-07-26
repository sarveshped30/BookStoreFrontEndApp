import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component:LoginComponent,
    pathMatch:'full'
  },

  {
    path: 'register',
    component:RegisterComponent,
    pathMatch:'full'
  },

  {
    path: 'home',
    component:HomeComponent,
    pathMatch: 'full'
  },

  {
    path: 'cart',
    component:CartComponent,
    pathMatch: 'full'
  },

  {
    path: 'order',
    component:OrderComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
