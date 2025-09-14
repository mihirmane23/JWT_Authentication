import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'protected', component: ProtectedComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
