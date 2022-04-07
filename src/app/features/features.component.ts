import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit, OnDestroy {
  user: { id: number, name: string }
  paramsSubscription: Subscription

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = {
      id: this.route.snapshot.params["id"],
      name: this.route.snapshot.params["name"]
    }
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params["id"];
        this.user.name = params["name"];
      }
    )

    console.log("user ", this.user)
    
  }

  ngOnDestroy(){
    this.paramsSubscription.unsubscribe();
  }

  goBack(){
    console.log("click")
    // this.router.navigate(["../../"], { relativeTo: this.route});
    this.router.navigate([""]);
  }

}
