import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  constructor(
    private dialog: MatDialog,
    private event: EventService,
    private api: ApiService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.jqueryImplement();
    this.getCategoryList();
    this.event.totalAddedcartValue.subscribe((res) => {
      this.cartNumber = res;
    });
    this.event.isLogin.subscribe((res) => {
      if (res) {
        this.isLogedin = true;
        if (this.storage.getUser()) {
          this.userName = this.storage.getUser().name;
        }
      } else{
        this.isLogedin = false;
      }
    });

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

  openLogin(): any {
    const dialogref = this.dialog.open(LoginComponent, {
      width: '300',
      backdropClass: 'bdrop',
      data: {
        type: 'login',
      },
    });
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
  }
}
