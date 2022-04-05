import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DataService {
    private patternSource = new BehaviorSubject('');
    currentPattern = this.patternSource.asObservable();
    
    constructor() { }

    changePattern(patternFromSearch: string){
        this.patternSource.next(patternFromSearch);
    }
}