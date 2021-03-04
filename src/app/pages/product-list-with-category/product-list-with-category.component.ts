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
  productList: any;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.productList = [];
  }

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
    this.api.get(`user/category/${catId}/products`).subscribe((res: any) =>{
    if(res.success){
      console.log(res)
      if(res.data.length > 0){
        this.productList = res.data;
      }else{
        this.productList = undefined;
      }
    }else {
      this.productList = undefined;
    }
    console.log(this.productList);
},err =>{})
  }

  loadMore(number: any) {
    const array = [];
    array.push()
  }
}
