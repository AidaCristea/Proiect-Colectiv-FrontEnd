import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponentSubscriber } from './components/subscriber/home-page/home-page.component';
import { HomePageComponentCreator } from './components/creator/home-page/home-page.component';

const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'subscriber/home', component: HomePageComponentSubscriber},
  {path:'creator/home', component: HomePageComponentCreator}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
