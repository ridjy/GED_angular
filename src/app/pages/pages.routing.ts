import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages.component';
import { SearchComponent } from './search/search.component';
import {DocumentLibraryComponent} from './documentLibrary/document-library.component';
import {TestingComponent} from './testing/testing.component';
import {FilemanagerComponent} from './filemanager/filemanager.component';


export const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' }  },
            { path: 'documentLibrary', component: DocumentLibraryComponent, data: { breadcrumb: 'Document library' } },
            { path: 'filemanager', component: FilemanagerComponent, data: { breadcrumb: 'File Manager' } },
            { path: 'testing', component: TestingComponent, data: { breadcrumb: 'Testing' } },
            { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
