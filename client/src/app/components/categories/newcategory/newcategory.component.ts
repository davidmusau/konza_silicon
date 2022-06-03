import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../services/categories/category.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {HttpEvent, HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-newcategory',
  templateUrl: './newcategory.component.html',
  styleUrls: ['./newcategory.component.scss'],
})
export class NewcategoryComponent implements OnInit {
  pattern= '^[A-z]*\\s*';
  newcategoryForm = new FormGroup({
    category: new FormControl('', [Validators.required,Validators.pattern(this.pattern)]),
  });
  submitted: boolean = false;
  isLoading: boolean = false;
  responseMessage: string = '';
  category: string= '';
  percentDone: any = 0;





  constructor(private router: Router, private categoryService: CategoryService,
              public dialogRef: MatDialogRef<NewcategoryComponent>
  ) {
  }

  ngOnInit() {

  }

  getCategoryFormData() {
    if (this.newcategoryForm.status === 'VALID') {
      this.newcategoryForm.disable();
      const name = this.newcategoryForm.get("category")?.value
      this.submitted = false;
      this.isLoading = true;
      this.categoryService.addCategory('name').subscribe({
        next:() => {
          this.responseMessage = 'Thanks for the message! I`ll get back to you soon!';
          this.submitted = true;
          this.newcategoryForm.reset();
          this.newcategoryForm.enable();
          this.onClick();
          this.router.navigate(['/category'])

        },
        error:err=>{
          alert("Text characters allowed only")
      }
      })

    }
  }


  private onClick() {
    this.dialogRef.close();
  }
}
