import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-product-list-with-category',
  templateUrl: './product-list-with-category.component.html',
  styleUrls: ['./product-list-with-category.component.scss'],
})
export class ProductListWithCategoryComponent implements OnInit {
  categoryId: any;
  productList: any;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: StorageService,
    private event: EventService
  ) {
    this.productList = [];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      if (res) {
        this.categoryId = res.categoryId;
        this.getProductList(this.categoryId);
      }
    });
  }
  getProductList(catId: any): any {
    this.api.get(`user/category/${catId}/products`).subscribe(
      (res: any) => {
        if (res.success) {
          if (res.data.length > 0) {
            this.productList = res.data;
          } else {
            this.productList = undefined;
          }
        } else {
          this.productList = undefined;
        }
      },
      (err) => {}
    );
  }
  addTocart(item: any): any {
    if (this.storage.getUser()) {
      const data = {
        vendor_id: item.vendor_id
          ? item.vendor_id
          : 'gadsjhgasdhj',
        product_id: item.product_id,
        quantity: 1,
        image: item.image,
      };
      this.api.post('user/cart/store', data).subscribe(
        (res: any) => {
          if (res.success) {
            this.api.alert(res.message, 'success');
            this.router.navigate(['/cart']);
            item.loadingenable = false;
            this.event.setCartEmit(true);
          } else {
            this.api.alert(res.message, 'warning');
            item.loadingenable = false;
          }
        },
        (err) => {
          if (err) {
            this.api.alert(
              err.message ? err.message : 'Somthing went wrong',
              'error'
            );
            item.loadingenable = false;
          }
        }
      );
    } else {
      this.api.alert('Please Log in to continue', 'warning');
    }
  }

  loadMore(number: any): any {
    const array = [];
    array.push();
  }
}
