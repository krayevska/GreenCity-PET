import { Pipe, PipeTransform } from '@angular/core';
import { User } from './types'

@Pipe({
  name: 'filter'
})


export class FilterPipe implements PipeTransform {
  result;

  transform(users: User[], patern: string): User[] {
    if(!patern) {
      return users;
    }

    return users.filter(user => {
      
      let firstName = user.name.split(" ")[0];
      let lastName = user.name.split(" ")[1];
      return firstName.toLocaleLowerCase().startsWith(patern.toLocaleLowerCase()) ||
             lastName.toLocaleLowerCase().startsWith(patern.toLocaleLowerCase())
    }); 
  }
}
