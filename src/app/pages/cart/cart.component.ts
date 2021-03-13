import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
declare var $: any;


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  numberArray = Array.from({ length: 10 }, (_, i) => i + 1);
  constructor() {}

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
  }
}
