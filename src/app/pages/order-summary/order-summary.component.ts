import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DefaultPopupComponent } from 'src/app/model/default-popup/default-popup.component';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { ExternalLibraryService } from '../../util';
declare let Razorpay: any;

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  cartItemlist: any;
  totalAmount: number;
  isCashSelected = new FormControl(false);
  addressList: any;
  lodingEnable: boolean;
  totalItem: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private event: EventService,
    private dialog: MatDialog,
    private razorpayService: ExternalLibraryService,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) {
    this.lodingEnable = false;
  }
  RAZORPAY_OPTIONS: any = {
    key: 'rzp_test_xQEhNgu9B9kjak',
    amount: '',
    name: 'Buildboard',
    order_id: '',
    description: '',
    image: './assets/images/logo.png',
    prefill: {
      name: '',
      email: '',
      contact: '',
      method: '',
    },
    modal: {},
    theme: {
      color: '#343d4b',
    },
  };
  ngOnInit(): void {
    this.event.emmitesummarypage.subscribe(res =>{
      console.log(res);
    })
    this.getCartList();
    this.getaddressList();
    this.razorpayService
      .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
      .subscribe();
  }
  getCartList(): any {
    this.totalAmount = 0;
    this.api.get('user/cart/list').subscribe(
      (res: any) => {
        if (res.success) {
          if (res.data.length > 0) {
            this.cartItemlist = res.data.map((items: any) => {
              if (items.offer_price) {
                this.totalAmount += items.offer_price * items.quantity;
              } else if (items.price) {
                this.totalAmount += items.price * items.quantity;
              }
              return items;
            });
            this.totalItem = this.cartItemlist.reduce(
              (a: any, b: any) => a + b.quantity,
              0
            );
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
  placeorder(): any {
    if (this.isCashSelected.value) {
      const arraytopass: any = [];
      this.cartItemlist.map((orderitems: any) => {
        const arraydata = {
          vendor_id: orderitems.vendor_id,
          quantity: orderitems.quantity,
          product_name: orderitems.name,
          product_image: orderitems.image,
          product_price: orderitems.offer_price
            ? orderitems.offer_price
            : orderitems.price,
          address_id: this.addressList.id,
          payment_type: 'cod',
          transaction_id: '',
          full_name: 'David',
          phone: 8250157338,
        };
        arraytopass.push(arraydata);
      });
      const data = {
        order: arraytopass,
      };
      this.api.post('user/order/store', data).subscribe(
        (res: any) => {
          if (res.success) {
            this.api.alert(
              res.message ? res.message : 'Somthing went wrong',
              'success'
            );
            this.router.navigate(['./']);
            this.event.setCartEmit(true);
            this.lodingEnable = false;
          } else {
            this.api.alert(
              res.message ? res.message : 'Somthing went wrong',
              'warning'
            );
            this.lodingEnable = false;
          }
        },
        (err) => {
          if (err) {
            this.api.alert(
              err.message ? err.message : 'Somthing went wrong',
              'error'
            );
            this.lodingEnable = false;
          }
        }
      );
    } else {
      this.proccedOnlinePay();
    }
  }
  getaddressList(): any {
    this.api.get('user/address/list').subscribe((res: any) => {
      if (res.success) {
        if (res.data.length > 0) {
          this.addressList = res.data[0];
        } else {
          this.addressList = undefined;
        }
      } else {
        this.addressList = undefined;
      }
    });
  }

  openaddressSection(): any {
    const dialogref = this.dialog.open(DefaultPopupComponent, {
      width: '800px',
      data: {
        type: 'place_order',
      },
    });
    dialogref.afterClosed().subscribe((res) => {
      if(res){
        this.addressList = res.addressid;
      }

    });
  }
  proccedOnlinePay(): any {
    this.RAZORPAY_OPTIONS.amount = this.totalAmount + '00';

    // binding this object to both success and dismiss handler
    this.RAZORPAY_OPTIONS.handler = this.razorPaySuccessHandler.bind(this);

    // this.showPopup();

    const razorpay = new Razorpay(this.RAZORPAY_OPTIONS);
    razorpay.open();
  }

  razorPaySuccessHandler(response: any): any {
    console.log(response);
    if (response) {
      const arraytopass: any = [];
      this.cartItemlist.map((orderitems: any) => {
        const arraydata = {
          vendor_id: orderitems.vendor_id,
          quantity: orderitems.quantity,
          product_name: orderitems.name,
          product_image: orderitems.image,
          product_price: orderitems.offer_price
            ? orderitems.offer_price
            : orderitems.price,
          address_id: this.addressList.id,
          payment_type: 'razorpay',
          transaction_id: response.razorpay_payment_id,
          full_name: 'David',
          phone: 8250157338,
        };
        arraytopass.push(arraydata);
      });
      const data = {
        order: arraytopass,
      };
      this.api.post('user/order/store', data).subscribe(
        (res: any) => {
          if (res.success) {
            this.api.alert(
              res.message ? res.message : 'Somthing went wrong',
              'success'
            );
            this.zone.run(() => {
              this.router.navigate(['./']);
            });
            this.event.setCartEmit(true);
            this.lodingEnable = false;
          } else {
            this.api.alert(
              res.message ? res.message : 'Somthing went wrong',
              'warning'
            );
            this.lodingEnable = false;
          }
        },
        (err) => {
          if (err) {
            this.api.alert(
              err.message ? err.message : 'Somthing went wrong',
              'error'
            );
            this.lodingEnable = false;
          }
        }
      );
    }
  }
}
