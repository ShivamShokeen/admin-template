import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiRequestService } from '../../../utility/api-request.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule,
  ApexPlotOptions,
  ApexDataLabels,
  ApexStroke,
  ApexNonAxisChartSeries,
  ApexFill,
} from 'ng-apexcharts';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonFormService } from '../../../utility/common-form.service';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { WordLimitPipe } from '../../../utility/word-limit.pipe';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-current-project',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    FormsModule,
    WordLimitPipe,
  ],
  templateUrl: './current-project.component.html',
  styleUrl: './current-project.component.css',
})
export class CurrentProjectComponent implements OnInit {
  companyList: any[] = [];
  tabIndex: number | null = null;
  subTab: number = 1;
  cardList: any[] = [];
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: ChartOptions;
  notesList: any[] = [];
  notesForm: FormGroup = this.fb.group({
    id: null,
    content: [null, [Validators.required, Validators.pattern('^(?!.*  ).*$')]],
  });
  meetingList: any = [];
  isOpen = false;

  @ViewChild('notesModal') public notesModal!: ElementRef;

  date = new Date();
  minDate = new Date();

  constructor(
    private apiService: ApiRequestService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    public utilities: CommonFormService,
    private toastService: ToastrService
  ) {
    this.notesList = [
      {
        id: 1,
        content: 'Discussion with Q/A',
      },
      {
        id: 2,
        content:
          'Discussion about client queriesDiscussion about client queriesDiscussion about client queriesDiscussion about client queriesDiscussion about client queriesDiscussion about client queriesDiscussion about client queriesDiscussion about client queriesDiscussion about client queriesDiscussion about client queriesDiscussion about client ',
      },
      {
        id: 3,
        content: 'test',
      },
    ];
    this.meetingList = [
      {
        id: 1,
        agenda: 'Scrum Meeting',
        meeting_type: 'Google Meeting',
        date: new Date(new Date().getTime() + 20 * 60 * 1000),
      },
      {
        id: 2,
        agenda: 'Stand-Up Meeting',
        meeting_type: 'Google Meeting',
        date: new Date(new Date().getTime() + 50 * 60 * 1000),
      },
      {
        id: 3,
        agenda: 'Meeting with Junior',
        meeting_type: 'Skype',
        date: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
      },
      {
        id: 4,
        agenda: 'Meeting with Q/A',
        meeting_type: 'Teams',
        date: new Date(new Date().getTime() + 4 * 60 * 60 * 1000),
      },
      {
        id: 5,
        agenda: 'Meeting with Client',
        meeting_type: 'Zoom',
        date: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
      },
    ];

    this.chartOptions = {
      series: [75],
      chart: {
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px',
            },
            value: {
              formatter: function (val) {
                return parseInt(val.toString(), 10).toString();
              },
              color: '#111',
              fontSize: '36px',
              show: true,
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ABE5A1'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        } as any,
      },
      stroke: {
        lineCap: 'round',
      },
      labels: ['Percent'],
    };
  }

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

  openModal(modalName: string) {
    if (modalName == 'notes') {
      this.notesModal.nativeElement.classList.add('show');
      this.notesModal.nativeElement.style.display = 'block';
      this.notesForm.reset();
    }
  }

  updateNotesModal(data: any) {
    this.notesForm.reset();
    this.notesForm.patchValue(data);
    console.log('this.notesForm', this.notesForm.value);
    this.notesModal.nativeElement.classList.add('show');
    this.notesModal.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.notesModal.nativeElement.classList.remove('show');
    this.notesModal.nativeElement.style.display = 'none';
  }

  generateUniqueId() {
    let uniqueId = Math.floor(Math.random() * 100); // Generate a random number as an ID
    let idExists = this.notesList.some((note) => note.id === uniqueId); // Check if the ID already exists

    // If the ID exists, recursively call the function until a unique ID is found
    while (idExists) {
      uniqueId = this.generateUniqueId();
      idExists = this.notesList.some((note) => note.id === uniqueId);
    }

    return uniqueId;
  }

  addNotes() {
    let userContent = this.notesForm.value.content;
    let findIndex = this.notesList.findIndex(
      (note) => note.id == this.notesForm.value.id
    );
    if (findIndex != -1) {
      this.notesList[findIndex].content = userContent;
      this.closeModal();
    } else {
      let uniqueId = this.generateUniqueId();
      this.notesList.push({
        id: uniqueId,
        content: userContent,
      });
      this.closeModal();
    }
  }

  removeNotes(index: number) {
    if (index > -1) {
      this.notesList.splice(index, 1);
    }
  }

  meetingURL(type: string) {
    if (type == 'google') {
      window.open('https://meet.google.com/');
    }
    if (type == 'skype') {
      window.open('https://www.skype.com/en/free-conference-call/');
    }
    if (type == 'team') {
      window.open(
        'https://www.microsoft.com/en-in/microsoft-teams/join-a-meeting'
      );
    }
    if (type == 'zoom') {
      window.open('https://app.zoom.us/wc');
    }
  }

  meetingDateUpdate(date: any) {
    for (let i = 0; i < this.meetingList.length; i++) {
      this.meetingList[i].date = new Date(
        new Date(date).getTime() + 20 * 60 * 1000
      );
      if (i == 1) {
        this.meetingList[i].date = new Date(
          new Date(date).getTime() + 50 * 60 * 60 * 1000
        );
      }

      if (i == 2) {
        this.meetingList[i].date = new Date(
          new Date(date).getTime() + 2 * 60 * 60 * 1000
        );
      }

      if (i == 3) {
        this.meetingList[i].date = new Date(
          new Date(date).getTime() + 5 * 60 * 60 * 1000
        );
      }

      if (i == 4) {
        this.meetingList[i].date = new Date(
          new Date(date).getTime() + 4 * 60 * 60 * 1000
        );
      }
    }
  }
}
