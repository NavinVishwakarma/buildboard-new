import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  contactFormType = 'contact';
  toggelNavbar = false;
  toggeleSubmenu = false;
  categoryList: any;
  cartNumber: number | undefined;
  isLogedin: boolean | undefined;
  userName: any;
  cartItemNumber: any;
  hideDiv: boolean;
  constructor(
    private dialog: MatDialog,
    private event: EventService,
    private api: ApiService,
    private storage: StorageService,
    private router: Router
  ) {
    this.hideDiv = false;
  }

  ngOnInit(): void {
    this.jqueryImplement();
    this.getCategoryList();
    this.event.totalAddedcartValue.subscribe((res) => {
      if (this.storage.getUser() && res) {
        this.getCartList();
      } else {
        this.cartItemNumber = 0;
      }
    });
    this.event.isLogin.subscribe((res) => {
      if (res) {
        this.isLogedin = true;
        if (this.storage.getUser()) {
          this.userName = this.storage.getUser().name;
        }
      } else {
        this.isLogedin = false;
      }
    });
  }
  enableDropdown(): any {
    const element = document.getElementById('closeOnclick');
    // dismiss menu by disabling each drop down menu in UI
    element.style.display = 'block';
  }
  disableDropdown(): any {
    const element = document.getElementById('closeOnclick');
    // dismiss menu by disabling each drop down menu in UI
    element.style.display = 'none';
  }
  jqueryImplement(): void {
    $('#click').click(() => {
      $('.search-form').toggleClass('add');
      $('.search-form').slideToggle();
    });
    $("<span class='clickD'></span>").insertAfter(
      '.navbar-nav li.menu-item-has-children > a'
    );
  }
  getCartList(): any {
    this.api.get('user/cart/list').subscribe(
      (res: any) => {
        if (res.success) {
          if (res.data.length > 0) {
            this.cartItemNumber = res.data.length;
          } else {
            this.cartItemNumber = 0;
          }
        } else {
          this.cartItemNumber = 0;
        }
      },
      (err) => {}
    );
  }

  openLogin(): any {
    const dialogref = this.dialog.open(LoginComponent, {
      width: '300',
      backdropClass: 'bdrop',
      data: {
        type: 'login',
      },
    });
  }
  openCart(): void {
    if (this.storage.getUser()) {
      this.router.navigate(['/cart']);
    } else {
      this.api.alert('Please Log in to continue', 'warning');
    }
  }
  getCategoryList(): any {
    this.api.get('user/category').subscribe(
      (res: any) => {
        if (res.success) {
          this.categoryList = res.data;
        }
      },
      (err) => {}
    );
  }
  logout(): any {
    this.event.setLoginEmmit(false);
    this.storage.clearUser();
    this.api.alert('logout successfully', 'success');
    this.router.navigate(['/home']);
    this.event.setCartEmit(true);
  }

  @HostListener('click', ['$event'])
  onClickBtn(event: any): any {
    if (event.target === document.getElementsByClassName('list_item').item(0)) {
      return false;
    } else {
      this.hideDiv = false;
    }
  }

}
