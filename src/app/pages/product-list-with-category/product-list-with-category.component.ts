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
  cartItemlist: any = [];

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: StorageService,
    private event: EventService
  ) {
    this.productList = [];
    this.cartItemlist = [];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      if (res) {
        this.categoryId = res.categoryId;
        this.getProductList(this.categoryId).then(() => {
          if (this.storage.getUser()) {
            this.getCartList();
          }
        });
      }
    });
  }
  getCartList(): any {
    return new Promise<void>((resolve, reject) => {
      this.api
        .get('user/cart/list')
        .toPromise()
        .then(
          (res: any) => {
            if (res.success) {
              if (res.data.length > 0) {
                console.log(this.productList);
                this.cartItemlist = res.data;
                this.productList.map((product: any) => {
                  this.cartItemlist.map((cart: any) => {
                    if (product.product_id === cart.product_id) {
                      console.log(product);
                      product.isAdded = true;
                    }
                  });
                });
              } else {
                this.cartItemlist = [];
              }
            } else {
              this.cartItemlist = [];
            }
            resolve();
          },
          (err) => {
            reject();
          }
        );
    });
  }
  getProductList(catId: any): any {
    return new Promise<void>((resolve, reject) => {
      this.api
        .get(`user/category/${catId}/products`)
        .toPromise()
        .then(
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
            resolve();
          },
          (err) => {
            reject();
          }
        );
    });
  }
  addTocart(item: any): any {
    if (this.storage.getUser()) {
      const data = {
        vendor_id: item.vendor_id ? item.vendor_id : 'gadsjhgasdhj',
        product_id: item.product_id,
        quantity: 1,
        image: item.image,
      };
      const index = this.cartItemlist.findIndex(
        (each: any) => each.product_id === item.product_id
      );
      if (index === -1) {
        this.api.post('user/cart/store', data).subscribe(
          (res: any) => {
            if (res.success) {
              this.api.alert(res.message, 'success');
              item.loadingenable = false;
              this.event.setCartEmit(true);
              this.getCartList();
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
        setTimeout(() => {
          item.loadingenable = false;
          this.api.alert('Product already added to cart', 'warning');
        }, 400);
      }
    } else {
      setTimeout(() => {
        item.loadingenable = false;
        this.api.alert('Please Log in to continue', 'warning');
      }, 400);
    }
  }

  loadMore(number: any): any {
    const array = [];
    array.push();
  }
}
