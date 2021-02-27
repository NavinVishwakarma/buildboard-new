import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor() { }
  slideConfigtestimonial = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    infinite: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, } },
      { breakpoint: 991, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true, autoplay: true, } },
      { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true, autoplay: true, } }
    ]
  };
  ngOnInit(): void {}

}
