import { Component } from '@angular/core';
import { TranslateService } from '../../services/translate.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  language="vi";
  languages=[
    {
      id:"en",
      text:"English"
    },
    {
      id:"vi",
      text:"Tiếng Việt"
    }
  ]
  constructor(private translateService: TranslateService) {
  }
  changeLanguage(){
   this.setLang(this.language)
  }
  setLang(lang: string) {
    this.translateService.use(lang);
  }
}
