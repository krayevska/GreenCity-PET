import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';
import { UsersDataService } from '../users-data.service'
import { User } from '../types'
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from "../data.service";



@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})

export class FeaturesComponent implements OnInit {
  
  userDetails: User;
  user: User;
  paramsSubscription: Subscription;
  notFound: boolean = false;
  errorMessage: string;
      
  constructor(private router: Router,
              private route: ActivatedRoute,
              private usersData: UsersDataService,
              private http: HttpClient,
              private searchData: DataService) { }

  ngOnInit(): void {
      console.log("user ", this.user)
      let id: number = +this.route.snapshot.params["id"];
      let userDetails = this.usersData.usersDetails.find(item => item.id === id);
      
      if(userDetails) {
        this.user = userDetails;        
      } else {
        let url = `https://jsonplaceholder.typicode.com/users/${id}`;
        console.log("url ", url)
        this.http.get(url).subscribe(
          (data: User) => this.user = data,
          (error: any) => {
            console.log('oops', error);
            this.notFound = true;
            this.errorMessage = error.message;
          }
        )
      }
      
  }  
   
  goBack(){
    this.usersData.usersDetails = [];
    this.searchData.changePattern("");
    this.router.navigate([""]);
  }

}
