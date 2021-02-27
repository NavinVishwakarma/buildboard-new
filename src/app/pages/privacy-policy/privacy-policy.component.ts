import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  privacy: any;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getCms();
  }
  getCms() {
    this.api.get('user/cms').subscribe((res: any) => {
      if (res.success) {
        this.privacy = res.privacyPolicy;
        console.log(res);
      } else {
        this.privacy = undefined;
      }
    });
  }

}
