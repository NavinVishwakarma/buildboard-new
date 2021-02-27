import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-list-with-category',
  templateUrl: './product-list-with-category.component.html',
  styleUrls: ['./product-list-with-category.component.scss']
})
export class ProductListWithCategoryComponent implements OnInit {
  categoryId: any;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res =>{
      console.log(res);
      if(res){
        this.categoryId = res.categoryId;
        this.getProductList( this.categoryId)
      }
    })
  }
  getProductList(catId: any){
this.api.get(`category/${catId}/products`).subscribe(res =>{
console.log(res);
},err =>{})
  }
}
