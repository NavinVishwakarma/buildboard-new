import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  categoryList: any;
  showMoreCategory: boolean | undefined;

  constructor(
    private api: ApiService
  ) {
    this.categoryList = [];
    this.showMoreCategory = false;
   }

  ngOnInit(): void {
    this.getCategoryList();
  }
  getCategoryList(){
    this.api.get('user/category').subscribe((res: any) =>{
        if(res.success){
          this.categoryList = res.data;
        }
    }, err =>{

    })
  }
}
