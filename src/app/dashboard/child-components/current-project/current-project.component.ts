import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../utility/api-request.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-current-project',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './current-project.component.html',
  styleUrl: './current-project.component.css',
})
export class CurrentProjectComponent implements OnInit {
  companyList: any[] = [];
  tabIndex: number | null = null;
  subTab: number = 1;
  cardList: any[] = [];

  constructor(
    private apiService: ApiRequestService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.tabIndex = 0;
  }

  getAll() {
    this.apiService
      .getReq('assets/mock/current-project/', 'company.json')
      .subscribe({
        next: (data) => {
          this.companyList = data;
        },
        error: (e) => {},
      });
    
    
    this.apiService
      .getReq('assets/mock/current-project/', 'card-status.json')
      .subscribe({
        next: (data) => {
          this.cardList = data;
        },
        error: (e) => {},
      });
  }

  getFavCompany() {
    return this.companyList.filter((v: any) => v.fav == 1);
  }

  activeTab(index: number) {
    this.tabIndex = index;
    this.subTabReset();
  }

  resetTab() {
    this.tabIndex = null;
  }

  sanitizeURL(unsafeUrl: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }

  subTabReset() {
    this.subTab = 1;
  }
}
