import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productFeaturedList: any;
  bannerImage: any;
  testimonial: any;
  constructor(
    private api: ApiService
  ) { 
    this.productFeaturedList = []
  }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    infinite: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, } },
      { breakpoint: 991, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true, autoplay: true, } },
      { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true, autoplay: true, } }
    ]
  };
  slideConfigtestimonial = {
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    infinite: true,
    dots: true,
    autoplay: false,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, } },
      { breakpoint: 991, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true, autoplay: true, } },
      { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true, autoplay: true, } }
    ]
  };
  ngOnInit(): void {
    // this.getProductFeaturedList();
    // this.getBannerList();
    // this.getTestimonial();
  }
  getProductFeaturedList() {
    this.api.get('user/products').subscribe((res: any) => {
      if (res.success) {
        if (res.data.length > 0) {
          this.productFeaturedList = res.data.map((item: any) => {
            if (item.is_featured) {
              item.is_featured = item.is_featured.toLowerCase();
            }
            return item;
          });
        } else {
          this.productFeaturedList = undefined;
        }
      } else {
        this.productFeaturedList = undefined;
      }
    });
  }
  getBannerList() {
    this.api.get('user/banners').subscribe((res: any) => {
      if (res.success) {
        this.bannerImage = res.data;
      } else {
        this.bannerImage = undefined;
      }
    });
  }
  getTestimonial() {
    this.api.get('user/testimonials').subscribe((res: any) => {
      if (res.success) {
        this.testimonial = res.data;
      } else {
        this.testimonial = undefined;
      }
    });
  }
}
