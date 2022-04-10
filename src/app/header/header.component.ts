import { Component, OnInit, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    title = 'angular-9-i18n';
    langs = ['en', 'it'];
   
    constructor(private translateService: TranslateService) {}
   
    public ngOnInit(): void {
      let browserlang = this.translateService.getBrowserLang();
      if (this.langs.indexOf(browserlang) > -1) {
        this.translateService.setDefaultLang(browserlang);
      } else {
        this.translateService.setDefaultLang('en');
      }
    }
      
    public useLanguage(lang: string): void {
      this.translateService.use(lang);
    }
}

