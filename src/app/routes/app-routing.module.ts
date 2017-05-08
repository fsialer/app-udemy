import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ErrorComponent } from '../components/error/error.component';
import { ProductosRootComponent } from '../components/productos/root/productos-root';
import { ProductosListComponent } from '../components/productos/productos-list/productos-list.component';
import { ProductosAddComponent } from '../components/productos/productos-add/productos-add.component';
import { ProductosEditComponent } from '../components/productos/productos-edit/producto-edit.component';
import { ProductosDetailComponent } from '../components/productos/productos-detail/productos-detail.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'home',
                component: HomeComponent
            },

            {
                path: '',
                component: HomeComponent
            },

            {
                path: 'productos',
                component: ProductosRootComponent,
                children: [
                    {
                        path: '',
                        component: ProductosListComponent
                    },
                    {
                        path: 'crear-producto',
                        component: ProductosAddComponent
                    },
                    {
                        path: ':id',
                        component: ProductosDetailComponent
                    },
                    {
                        path: 'editar-producto/:id',
                        component: ProductosEditComponent
                    }
                ]
            },
            {
                path: '**',
                component: ErrorComponent
            },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }