import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Product} from "../../../models/product";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NewproductComponent} from "../newproduct/newproduct.component";
import {NewcategoryComponent} from "../../categories/newcategory/newcategory.component";
import {ProductService} from "../../../services/products/product.service";
import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs";
import {PdfdocumentsService} from "../../../services/pdfs/pdfdocuments.service";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<Product>;
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'title', 'category', 'price', 'action'];
  isLoading = false;
  @ViewChild(MatSort, {static: true}) sort: MatSort | any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;

  constructor(private dialog: MatDialog,private pdfDocument: PdfdocumentsService,
              private productService: ProductService) {
    this.dataSource = new MatTableDataSource(this.products)
  }

  async ngOnInit() {
    await this.loadProductList();
  }

//load all products
  async loadProductList() {
    this.productService
      .productList()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.isLoading = false)
      ).subscribe(
      products => {
        this.products = products;
        this.dataSource.data = this.products;
        this.dataSource.paginator = this.paginator;
        this.isLoading = true;
      }
    )


  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  newproduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%"
    this.dialog.open(NewproductComponent, dialogConfig);
  }

  newcategory() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%"
    this.dialog.open(NewcategoryComponent, dialogConfig);
  }

    exportdata() {
     this.pdfDocument.generatedPdf()
  }

}
