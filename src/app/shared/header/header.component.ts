import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { DefaultPopupComponent } from '../../model/default-popup/default-popup.component';
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
  constructor(
    private dialog: MatDialog,
    private event: EventService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.jqueryImplement();
    this.getCategoryList();
    this.event.totalAddedcartValue.subscribe((res) => {
      this.cartNumber = res;
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
    const dialogref = this.dialog.open(DefaultPopupComponent, {
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
}
