import { ActivatedRoute, Router,Params } from '@angular/router';
import { ProductosService } from '../../../services/productos.services';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto';
import { GLOBAL } from '../../../services/global';
@Component({
    selector: 'producto-add',
    templateUrl: '../productos-add/productos-add.component.html',
})
export class ProductosEditComponent implements OnInit {
    public titulo: string;
    public producto: Producto;


    public filesToUpload;
    public resultUpload;
    public id:any;

    constructor(
        private _productoService: ProductosService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.titulo = 'Editar un nuevo producto';
        this.producto = new Producto(0, "", 0, "s");
    }

    ngOnInit() {
        this.getProducto();
    }

    onSubmit() {

        console.log(this.producto);
        if (this.filesToUpload && this.filesToUpload.length >= 1) {
            this._productoService.makeFileRequest(GLOBAL.url + 'upload_file', [], this.filesToUpload).then((result) => {
                console.log(result);
                this.resultUpload = result;
                this.producto.image = this.resultUpload.filename;
                this.editProducto();

            }, (error) => {
                console.log(error);
            });
        } else {
            this.editProducto();
        }

    }

    editProducto() {
        this._productoService.updateProducto(this.producto,this.id).subscribe(
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

    getProducto() {
        this._route.params.forEach((params: Params) => {
            this.id = params['id'];
            console.log(this.id);
            this._productoService.getProducto(this.id).subscribe(
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