import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PricingsComponent } from './components/small-card/Pricings/Pricings.component';
import { ScreenPricingsComponent } from './components/screen-pricings/screen-pricings.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
{
  path: 'pricing',
  component: ScreenPricingsComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
