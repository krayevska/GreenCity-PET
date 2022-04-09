import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersDataService } from '../users-data.service'
import { User } from '../types'


@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {
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
  usersDetalis: User[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private usersData: UsersDataService) { }

  ngOnInit(): void {
    
    let id: number = +this.route.snapshot.params["id"];
    let currentUserDetails = this.usersData.usersDetails[id - 1];
    
    this.user = { 
      id: id, 
      name: currentUserDetails.name,
      username: currentUserDetails.username,
      email: currentUserDetails.email,
      phone: currentUserDetails.phone,
      website: currentUserDetails.website,
      company: currentUserDetails.company.name
    };
   
    // this.paramsSubscription = this.route.params.subscribe(
    //   (params: Params) => {
    //     this.user.id = params["id"];
    //    }
    // )
  }

  // ngOnDestroy(){
  //   this.paramsSubscription.unsubscribe();
  // }

  goBack(){
    this.usersData.usersDetails = [];
    this.router.navigate([""]);
  }

}
