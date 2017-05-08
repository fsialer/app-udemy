import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../services/productos.services';
import {Producto} from '../../../models/producto';
@Component({
    selector: 'productos-list',
    templateUrl: './productos-list.component.html',
    

})
export class ProductosListComponent implements OnInit {
    public titulo: string;
    public productos:Producto[];
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productoService:ProductosService
    ) {
        this.titulo = 'Listado de productos';
    }

    ngOnInit() {
        this.getProductos();
    }

    getProductos(){
        this._productoService.getProductos().subscribe(
            result=>{
                this.productos=result.data;
                console.log(result.data);
            },
            error=>{
                console.log(<any>error);
            }
        );
    }
    onDelete(id){
        this._productoService.delelteProducto(id).subscribe(
            response=>{
                console.log(response.data);
               this.getProductos();
            },
            error=>{
                console.log(<any>error);
            }
        );
    }
}