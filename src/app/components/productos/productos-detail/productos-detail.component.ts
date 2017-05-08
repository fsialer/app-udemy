import { IFormatter } from 'tslint/lib';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../services/productos.services';
import { Producto } from '../../../models/producto';
@Component({
    selector: 'productos-detail',
    templateUrl: './productos-detail.component.html'

})
export class ProductosDetailComponent implements OnInit {
    public titulo: string;
    public producto: Producto;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productoService: ProductosService
    ) {
        this.titulo = 'Detalle de productos';
    }

    ngOnInit() {
        this.getProducto();
    }

    getProducto() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            console.log(id);
            this._productoService.getProducto(id).subscribe(
                response => {
                    console.log(response.data);
                    this.producto = response.data;
                    console.log(this.producto);
                },
                error => {
                    console.log(<any>error);
                }
            );
        });
    }
}