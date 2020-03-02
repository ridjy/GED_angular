import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import {AuthGuardService} from "./main/auth-guard.service";

// export const routes: Routes = [
//   { path: '', redirectTo: 'pages', pathMatch: 'full' },
//   { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
//   { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule' },
//   { path: 'register', loadChildren: 'app/pages/register/register.module#RegisterModule' },
//   { path: '**', component: NotFoundComponent }
// ];

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule', canActivate: [AuthGuardService] },
    { path: 'login', loadChildren: 'app/main/login/login.module#LoginModule' },
    { path: 'register', loadChildren: 'app/main/register/register.module#RegisterModule' },
    { path: '**', redirectTo: '' }
    // { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
});