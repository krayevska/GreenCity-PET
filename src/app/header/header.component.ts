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
      console.log("browserlang ", browserlang);
      if (this.langs.indexOf(browserlang) > -1) {
        this.translateService.setDefaultLang(browserlang);
      } else {
        console.log("else")  
        this.translateService.setDefaultLang('en');
      }
      console.log("browserlang after", this.translateService.getDefaultLang());
    }
   
   
    public useLanguage(lang: string): void {
      console.log("language: ", lang);  
    //   this.translateService.setDefaultLang(lang);
      this.translateService.use(lang);
      console.log("get defaultLang ", this.translateService.getDefaultLang())
      console.log("current ", this.translateService.currentLang)
    }
   }