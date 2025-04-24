import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetActivityComponent } from '../components/get-activity/get-activity.component';
import { DetailsActivityComponent } from '../components/details-activity/details-activity.component';
import { RegisterForActivityComponent } from '../components/register-for-activity/register-for-activity.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { UpdateComponent } from '../components/update/update.component';
import { HomeComponent } from '../components/home/home.component';


export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path:'register',component:RegisterComponent},
    { path: 'activity', component: GetActivityComponent },
    { path: 'activity/:id', component: DetailsActivityComponent },
    { path: 'registerActivity/:id', component: RegisterForActivityComponent },
    {path:'update',component:UpdateComponent}
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}