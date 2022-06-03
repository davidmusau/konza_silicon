import {Injectable} from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import {Product} from "../../models/product";
import {ProductService} from "../products/product.service";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfdocumentsService {
  products: Product[] = [];
  pdfMake: any

  constructor(private productService: ProductService) {
    this.loadPdfMaker()
  }

  async loadPdfMaker() {
    if (!await this.pdfMake && this.products) {
      this.pdfMake = pdfMake;
      this.productService.productList().subscribe(products => {
        this.products = products;
      });
    }


  }

  /**
   * PDF Generation
   * */
  async generatedPdf() {
    await this.loadPdfMaker();
    const documentDefinition = this.getDocumentDefinition();
    this.pdfMake.createPdf(documentDefinition).download();
  }

  getDocumentDefinition() {
    const createBody = () => {
      const body = [
        ['ID', 'ProductName', 'Category', 'Price'],
      ]
      this.products.forEach((item, index)=> {
        let categoryString = "";
        item.category.forEach((cat, catInd)=>{
          // @ts-ignore
          categoryString += cat.name
        })
        body.push([`${item.id}`, item.title, categoryString,`${item.price}`
        ]);
      })
      return body;
    }
    return {
      content: [
        {
          text: 'E-Commerce Product List',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
           body: createBody()
          }
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          alignment: 'centre',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      },
    };
  }
}


