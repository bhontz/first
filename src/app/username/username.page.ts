import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NavparamService } from '../navparam.service';
import { Storage } from '@ionic/storage-angular';

// template of the api service
// this api returns all permutations of the items provided
// http://mentorbrad.pythonanywhere.com/username?items=a,b,c,d

@Component({
  selector: 'app-username',
  templateUrl: './username.page.html',
  styleUrls: ['./username.page.scss'],
})
export class UsernamePage implements OnInit {
  items: Array<string> = [];
  parameters: string = "items=1,2,3,4";  // template, note that you'll need the items parameter

  constructor(
    private http: HttpClient, 
    private router: Router,     
    private navParamService: NavparamService,
    private localStore: Storage
    ) { this.create() }
  
  async create() {
    const _storage = await this.localStore.create();  
  }

  setUserName(idx: number) {
    this.localStore.set("Username", this.items[idx]);
    this.router.navigate(["/home"]);
  }

  ngOnInit() {
    this.parameters = "items=" + this.navParamService.getNavData();
    const opts = { params: new HttpParams({fromString: this.parameters})};
    this.http.get('https://mentorbrad.pythonanywhere.com/username', opts)
      .subscribe(data => {
        this.items = data["items"]
      });   
  }

}
