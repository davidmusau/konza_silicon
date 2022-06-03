import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Category} from "../../../models/category";
import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs";
import {ProductService} from "../../../services/products/product.service";
import {CategoryService} from "../../../services/categories/category.service";
import {MatDialogRef} from "@angular/material/dialog";


class ImageSnippet {
  pending: boolean = false;
  status: string = ' init';

  constructor(public src: string, public file: File) {
  }

}

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.scss']
})
export class NewproductComponent implements OnInit {
  loading: boolean = false;
  selectedFile: ImageSnippet | undefined;

//populate category
  populateCategory: Category[] = [];
  // contact form validation
  productForm = new FormGroup({
    productname: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),

  });
  submitted = false; // show and hide the success message
  isLoading = false; // disable the submit button if we're loading
  responseMessage = ''; // the response message to show to the user
   imageID: any;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router:Router,
    public dialogRef: MatDialogRef<NewproductComponent>

  ) {
  }


  ngOnInit(): void {
    this.loadCategoryselect()
  }

  // onsubmit handle event listener

  onSubmit(e: Event) {
    e.preventDefault();
    this.productForm.disable();
    // store data
    const product: { images: any; quantity: any; price: any; description: any; title: any; category: any } = {
      title: this.productForm.get("productname")?.value,
      price: this.productForm.get("price")?.value,
      description: this.productForm.get("description")?.value,
      quantity: this.productForm.get("quantity")?.value,
      category: this.productForm.get("category")?.value,
      images: this.imageID
    };
    if (product.images !== ''){
      this.productService.addProduct(product)
        .subscribe(() => {
          this.responseMessage = 'Product created successfully!';
          this.submitted = true;
          this.productForm.reset();
          this.productForm.enable();
          this.onClick();
          this.router.navigate(['/products'])
        })
    }


  }

  loadCategoryselect() {
    this.categoryService
      .categoryList()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.isLoading = false)
      ).subscribe(
      populateCategory => {
        this.populateCategory = populateCategory;
      }
    )
  }


  onFileInput(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.productService.uploadImage(this.selectedFile.file).subscribe(
        (res: any) => {
          if (typeof (res) === 'object') {
            this.imageID=res
          }
        }
        )
    });

    reader.readAsDataURL(file);
  }

  private onClick() {
    this.dialogRef.close();
  }
}



