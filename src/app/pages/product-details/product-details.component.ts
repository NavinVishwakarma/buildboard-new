import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';
declare var $: any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productDetail: any;
  loadingenable: boolean | undefined;
  cartItemlist: any = [];
  constructor(
    private activatedroute: ActivatedRoute,
    private api: ApiService,
    private event: EventService,
    private router: Router,
    private storage: StorageService
  ) {
    this.loadingenable = false;
    this.cartItemlist = [];
  }
  slideConfigtestimonial = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    infinite: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          autoplay: true,
        },
      },
    ],
  };
  ngOnInit(): void {
    this.activatedroute.params.subscribe((res: any) => {
      this.getProductDetail(res.productid);
    });
    this.getCartList();
  }
  getCartList(): any {
    this.api.get('user/cart/list').subscribe(
      (res: any) => {
        if (res.success) {
          if (res.data.length > 0) {
            this.cartItemlist = res.data;
          } else {
            this.cartItemlist = [];
          }
        } else {
          this.cartItemlist = [];
        }
      },
      (err) => {}
    );
  }
  getProductDetail(id: any): any {
    this.api.get(`user/product/${id}/details`).subscribe((res: any) => {
      if (res.success) {
        this.productDetail = res.data;
        this.productDetail.itemCount = 0;
      }
    });
  }
  addTocart(): any {
    if (this.storage.getUser()) {
      const data = {
        vendor_id: this.productDetail.vendor_id
          ? this.productDetail.vendor_id
          : 'gadsjhgasdhj',
        product_id: this.productDetail.product_id,
        quantity: 1,
        image: this.productDetail.image,
      };
      console.log(this.cartItemlist);
      const index = this.cartItemlist.findIndex(
        (each: any) => each.product_id === this.productDetail.product_id
      );
      if (index === -1) {
        this.api.post('user/cart/store', data).subscribe(
          (res: any) => {
            if (res.success) {
              this.api.alert(res.message, 'success');
              this.loadingenable = false;
              this.event.setCartEmit(true);
              this.getCartList();
            } else {
              this.api.alert(res.message, 'warning');
              this.loadingenable = false;
            }
          },
          (err) => {
            if (err) {
              this.api.alert(
                err.message ? err.message : 'Somthing went wrong',
                'error'
              );
              this.loadingenable = false;
            }
          }
        );
      } else {
        setTimeout(() => {
          this.loadingenable = false;
          this.api.alert('Product already added to cart', 'warning');
        }, 400);
      }
    } else {
      this.api.alert('Please Log in to continue', 'warning');
    }
  }
}
