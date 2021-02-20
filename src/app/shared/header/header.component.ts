import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DefaultPopupComponent } from 'src/app/model/default-popup/default-popup.component';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
      this.jqueryImplement()
  }

jqueryImplement(){
  $("#click").click(function(){
    $(".search-form").toggleClass("add")
    $(".search-form").slideToggle();
});
$( "<span class='clickD'></span>" ).insertAfter(".navbar-nav li.menu-item-has-children > a");
$('.navbar-nav li .clickD').click((e: any) =>{
  e.preventDefault();
  var $this = $(this);

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

openLogin(){
const dialogref = this.dialog.open(DefaultPopupComponent, {
  width: '500',
  backdropClass: 'bdrop',
  data: {
    type: 'login'
  }
})
}
}
