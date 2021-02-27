import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
import { DefaultPopupComponent } from '../../model/default-popup/default-popup.component';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  contactFormType = 'contact';
  constructor(
    private dialog: MatDialog,
    private event: EventService
  ) { }

  ngOnInit(): void {
      this.jqueryImplement();
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
  width: '300',
  backdropClass: 'bdrop',
  data: {
    type: 'login'
  }
})
}
}
