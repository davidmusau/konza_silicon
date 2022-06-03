import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs";
import {NewcategoryComponent} from "../newcategory/newcategory.component";
import {Category} from "../../../models/category";
import {CategoryService} from "../../../services/categories/category.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Category>;
  category: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'action'];
  isLoading = false;
  @ViewChild(MatSort, {static: true}) sort: MatSort | any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;

  constructor(private dialog: MatDialog, private categoryService: CategoryService) {
    this.dataSource = new MatTableDataSource(this.category)
  }

  async ngOnInit() {
    await this.loadPCategoriesList();
  }

//load all categories
  loadPCategoriesList() {
    this.categoryService
      .categoryList()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.isLoading = false)
      ).subscribe({
      next:(category) => {
        this.category = category;
        this.dataSource.data = this.category;
        this.dataSource.paginator = this.paginator;
        this.isLoading = true;
      },
      error:err =>{
        alert("please check the category title again")
    }
      }

    )
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  newcategory() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%"
    this.dialog.open(NewcategoryComponent, dialogConfig);
  }

}
