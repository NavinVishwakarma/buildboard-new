import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import * as _ from 'underscore';
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  numberArray = Array.from({ length: 10 }, (_, i) => i + 1);
  cartQuantity = new FormControl('');
  cartItemlist: any;
  totalAmount: any;
  constructor(
    private api: ApiService,
    private sanitize: DomSanitizer,
    private event: EventService
  ) {
    this.cartItemlist = [];
  }

  ngOnInit(): void {
    // Navbar
    $("<span class='clickD'></span>").insertAfter(
      '.navbar-nav li.menu-item-has-children > a'
    );
    $('.navbar-nav li .clickD').click((e: any) => {
      e.preventDefault();
      const $this = $(this);

      if ($this.next().hasClass('show')) {
        $this.next().removeClass('show');
        $this.removeClass('toggled');
      } else {
        $this.parent().parent().find('.sub-menu').removeClass('show');
        $this.parent().parent().find('.toggled').removeClass('toggled');
        $this.next().toggleClass('show');
        $this.toggleClass('toggled');
      }
    });
    this.getCartList();
  }
  getCartList(): any {
    this.totalAmount = 0;
    this.api.get('user/cart/list').subscribe(
      (res: any) => {
        if (res.success) {
          if (res.data.length > 0) {
            this.cartItemlist = res.data.map((items: any) => {
              console.log(items);
              if (items.description) {
                items.description = this.sanitize.bypassSecurityTrustHtml(
                  items.description
                );
              } else {
                items.description = '';
              }
              if (items.offer_price) {
                this.totalAmount += items.offer_price;
                console.log(this.totalAmount);
              } else if (items.price) {
                this.totalAmount += items.price;
                console.log(this.totalAmount);
              }
              return items;
            });
          } else {
            this.cartItemlist = undefined;
          }
        } else {
          this.cartItemlist = undefined;
        }
      },
      (err) => {}
    );
  }
  getItemquantity(qty: any, item: any): any {
    const data = {
      cart_id: item.cart_id,
      quantity: qty.target.value,
      image: item.image,
    };
    this.api.post('user/cart/update', data).subscribe(
      (res: any) => {
        if (res.success) {
          this.api.alert(res.message, 'success');
        } else {
          this.api.alert(res.message, 'warning');
        }
      },
      (err) => {
        if (err) {
          this.api.alert(
            err.message ? err.message : 'Somthing went wrong',
            'error'
          );
        }
      }
    );
  }
  removeCart(item: any, id: any): any {
    this.api.get(`user/cart/${id}/remove`).subscribe(
      (res: any) => {
        if (res.success) {
          this.getCartList();
          this.api.alert(res.message, 'success');
          item.isLoder = false;
          this.event.setCartEmit(true);
        } else {
          this.api.alert(res.message, 'warning');
          item.isLoder = false;
        }
      },
      (err) => {
        if (err) {
          this.api.alert(
            err.message ? err.message : 'Somthing went wrong',
            'error'
          );
          item.isLoder = false;
        }
      }
    );
  }
}
