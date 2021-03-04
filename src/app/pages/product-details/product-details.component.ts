import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
declare var $: any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productDetail: any;
  constructor(
    private activatedroute: ActivatedRoute,
    private api: ApiService,
    private event: EventService
  ) {}
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
  }
  getProductDetail(id: any): any {
    this.api.get(`user/product/${id}/details`).subscribe((res: any) => {
      if (res.success) {
        this.productDetail = res.data;
        this.productDetail.itemCount = 0;
        console.log(this.productDetail);
      }
    });
  }
  addTocart(): any {
    this.productDetail.itemCount += 1;
    this.event.setCartEmit(this.productDetail.itemCount);
  }
}
