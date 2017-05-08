import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../../services/productos.services';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto';
import { GLOBAL } from '../../../services/global';
@Component({
    selector: 'producto-add',
    templateUrl: './productos-add.component.html',
})
export class ProductosAddComponent implements OnInit {
    public titulo: string;
    public producto: Producto;


    public filesToUpload;
    public resultUpload;

    constructor(
        private _productoService: ProductosService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.titulo = 'Crear un nuevo producto';
        this.producto = new Producto(0, "", 0, "s");
    }

    ngOnInit() {

    }

    onSubmit() {

        console.log(this.producto);

        if (this.filesToUpload && this.filesToUpload.length >= 1) {
            this._productoService.makeFileRequest(GLOBAL.url + 'upload_file', [], this.filesToUpload).then((result) => {
                console.log(result);
                this.resultUpload = result;
                this.producto.image = this.resultUpload.filename;
                this.saveProducto();

            }, (error) => {
                console.log(error);
            });
        } else {
            this.saveProducto();
        }

    }

    saveProducto() {
        this._productoService.addProducto(this.producto).subscribe(
            response => {
                console.log(this.producto);
                console.log(response);
                this._router.navigate(['/productos']);
            },
            error => {
                console.log(this.producto);
                console.log(<any>error);
            }
        );
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }
}