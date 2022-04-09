import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersDataService } from '../users-data.service'
import { User } from '../types'
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})

export class FeaturesComponent implements OnInit, OnDestroy {
  
  userDetails: User;
  user: { 
    id: number, 
    name: string,
    username: string,
    email: string,
    phone: string,
    website: string,
    company: string
  };
  paramsSubscription: Subscription;
  usersLoaded = true;
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private usersData: UsersDataService,
              private http: HttpClient) { }

  ngOnInit(): void {
      
      let id: number = +this.route.snapshot.params["id"];
      let filteredUsers = this.usersData.usersDetails.filter(item => item.id === id);

      if( filteredUsers.length > 0 ) {
        this.userDetails = filteredUsers[0];
        this.user = { 
          id: id, 
          name: this.userDetails.name,
          username: this.userDetails.username,
          email: this.userDetails.email,
          phone: this.userDetails.phone,
          website: this.userDetails.website,
          company: this.userDetails.company.name
        };
        
      } else {
        this.usersLoaded = false;
        let url = `https://jsonplaceholder.typicode.com/users?_limit=1&_start=${ id - 1 }`;
        this.http.get(url).subscribe((data: User) => {
          this.userDetails = data[0]; 
          this.user = { 
            id: id, 
            name: this.userDetails.name,
            username: this.userDetails.username,
            email: this.userDetails.email,
            phone: this.userDetails.phone,
            website: this.userDetails.website,
            company: this.userDetails.company.name
          };
        });
      }
  }  
   
  ngOnDestroy(){
    this.router.navigate([""]);
  }

  goBack(){
    this.usersData.usersDetails = [];
    this.router.navigate([""]);
  }

}
