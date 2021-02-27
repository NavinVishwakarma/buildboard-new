import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryList: any;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getCategoryList();
  }
  getCategoryList(){
    this.api.get('user/category').subscribe((res: any) =>{
        if(res.success){
          this.categoryList = res.data;
        }
    }, err =>{})
  }
}
