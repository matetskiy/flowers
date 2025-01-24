import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FlowersListComponent } from './components/flowers-list/flowers-list.component';
import { AddFlowerComponent } from './components/add-flower/add-flower.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'translation', component: RegisterComponent },
  { path: 'flowers', component: FlowersListComponent, canActivate: [AuthGuard] },
  { path: 'add-flower', component: AddFlowerComponent, canActivate: [AuthGuard, AdminGuard] }
];

