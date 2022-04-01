import { Pipe, PipeTransform } from '@angular/core';
import { User } from './types'

@Pipe({
  name: 'filter'
})


export class FilterPipe implements PipeTransform {

  transform(users: User[], patern: string): User[] {
    if(!patern) {
      return users;
    }
    return users.filter(user => user.name.toLocaleLowerCase().startsWith(patern.toLocaleLowerCase()));
  }

}
