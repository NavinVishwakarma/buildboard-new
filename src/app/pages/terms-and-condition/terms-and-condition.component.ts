import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.scss']
})
export class TermsAndConditionComponent implements OnInit {
  term: any;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getCms();
  }
  getCms() {
    this.api.get('user/cms').subscribe((res: any) => {
      if (res.success) {
        this.term = res.terms;
        console.log(res);
      } else {
        this.term = undefined;
      }
    });
  }
}
