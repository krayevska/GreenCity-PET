import { Injectable } from '@angular/core';
import { User } from './types'

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  usersDetails: User[] = [];
  constructor() { 
    
  }

}
