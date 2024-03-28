import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiRequestService } from '../../../utility/api-request.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
import { Subject, BehaviorSubject } from 'rxjs';
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
  ApexResponsive,
  ApexYAxis,
  ApexMarkers,
  ApexTooltip,
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
import { Observable } from 'rxjs';

import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

export type pieChartOptions = {
  series: number[];
  labels: string[];
  chart: ApexChart;
};

export type radialChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  plotOptions: {
    radar: {
      polygon: {
        levels: {
          labels: {
            show: boolean;
          };
        };
      };
    };
  };
};
// xaxis: ApexXAxis;
interface UserInterface {
  name: string;
  age: number;
}

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
  animations: [trigger('moveAnimation', [])],
})
export class CurrentProjectComponent implements OnInit {
  moveState = 'initial';
  users: UserInterface = { age: 2, name: 'shivam' };
  companyList: any[] = [];
  tabIndex: number | null = null;
  subTab: number = 1;
  cardList: any[] = [];

  // Charts
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: ChartOptions;

  public lineChartOptions: LineChartOptions;

  public radialChartOptions: radialChartOptions;

  public pieChartOptions: pieChartOptions;

  //  Charts

  notesList: any[] = [];
  notesForm: FormGroup = this.fb.group({
    id: null,
    content: [null, [Validators.required, Validators.pattern('^(?!.*  ).*$')]],
  });

  improvementForm: FormGroup = this.fb.group({
    id: null,
    content: [null, [Validators.required, Validators.pattern('^(?!.*  ).*$')]],
  });

  meetingList: any = [];
  improvementList: any = [];
  isOpen = false;

  @ViewChild('notesModal') public notesModal!: ElementRef;
  @ViewChild('improvementModal') public improvementModal!: ElementRef;

  date = new Date();
  minDate = new Date();

  constructor(
    private apiService: ApiRequestService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    public utilities: CommonFormService,
    private toastService: ToastrService
  ) {
    this.subTab = 1;
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
    this.improvementList = [
      {
        id: 1,
        content: 'Server config. change',
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

    this.pieChartOptions = {
      series: [15, 20, 15, 10, 15, 15, 10],
      labels: [
        'Marketing',
        'App Crash',
        'Website Crash',
        'Server Down',
        'Design Changes',
        'Bugs/Issues',
        'Negative Feedback',
      ],
      chart: {
        type: 'pie',
        height: 400,
      },
    };

    this.radialChartOptions = {
      series: [{ name: 'My-series', data: [40, 35, 40, 35, 25] }],
      chart: { height: 350, type: 'radar' },
      xaxis: {
        categories: [
          'Marketing',
          'Design',
          'Discussion',
          'Revert',
          'Miscellaneous',
        ],
      },
      plotOptions: {
        radar: {
          polygon: {
            levels: {
              labels: {
                show: false,
              },
            },
          },
        },
      },
    };

    this.lineChartOptions = {
      series: [
        {
          name: '2022',
          data: [0, 5, 10, 5, 20, 25, 40, 51, 45, 50, 50, 50],
        },
        {
          name: '2023',
          data: [25, 30, 35, 40, 60, 70, 70, 71, 75, 75, 60, 60],
        },
        {
          name: '2024',
          data: [50, 60, 65],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: true,
        },
      },
      title: {
        text: 'Project Timeline',
        align: 'left',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    };

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
    this.tabIndex = 1;
    this.callSub();
  }

  callSub() {
    // enum Color {
    //   Red,
    //   Green,
    //   Blue,
    //   White,
    // }
    // let c: Color = Color.Green;
    // console.log('c', c);
    // console.log('users', this.users);
    // let observable = new Observable((observer) => {
    //   observer.next('Hello');
    //   observer.next('World');
    // });
    // observable.subscribe((val) => console.log('val', val));
    // let subject = new Subject();
    // Speaker starts talking
    // subject.next('Hello!');
    // Listener 1 enters the room
    // subject.subscribe((data) => console.log('Listener 1: ' + data)); // Output: Listener 1: How are you?
    // subject.next('How are you?');
    // // Listener 2 enters the room
    // subject.subscribe((data) => console.log('Listener 2: ' + data)); // Output: Listener 2: Goodbye!
    // subject.next('Goodbye!');
    // let behSubject = new BehaviorSubject('Hello!');
    // // Video starts
    // behSubject.next('Hello!');
    // // Viewer 1 starts watching
    // behSubject.subscribe((data) => console.log('Viewer 1: ' + data)); // Output: Viewer 1: Hello!, Viewer 1: How are you?
    // behSubject.next('How are you?');
    // // Viewer 2 starts watching
    // behSubject.subscribe((data) => console.log('Viewer 2: ' + data)); // Output: Viewer 2: How are you?, Viewer 2: Goodbye!
    // behSubject.next('Goodbye!');
    // const subject = new Subject<number>();
    // subject.subscribe((x) => console.log('subject Observer 1: ' + x));
    // subject.next(1);
    // subject.subscribe((x) => console.log('subject Observer 2: ' + x));
    // subject.next(2);
    // const behSubject = new BehaviorSubject<number>(123);
    // behSubject.subscribe((x) =>
    //   console.log('BehaviorSubject Observer 1: ' + x)
    // );
    // behSubject.next(456);
    // behSubject.subscribe((x) =>
    //   console.log('BehaviorSubject Observer 2: ' + x)
    // );
    // behSubject.next(789);
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

  updateRadial() {
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

  getFavCompany() {
    return this.companyList.filter((v: any) => v.fav == 1);
  }

  activeTab(index: number) {
    this.tabIndex = index;
    this.subTabReset();
    this.updateRadial();
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
    if (modalName == 'improvement') {
      this.improvementModal.nativeElement.classList.add('show');
      this.improvementModal.nativeElement.style.display = 'block';
      this.improvementForm.reset();
    }
  }

  updateNotesModal(data: any) {
    this.notesForm.reset();
    this.notesForm.patchValue(data);
    this.notesModal.nativeElement.classList.add('show');
    this.notesModal.nativeElement.style.display = 'block';
  }

  updateImprovementModal(data: any) {
    this.improvementForm.reset();
    this.improvementForm.patchValue(data);
    this.improvementModal.nativeElement.classList.add('show');
    this.improvementModal.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.notesModal.nativeElement.classList.remove('show');
    this.notesModal.nativeElement.style.display = 'none';

    this.improvementModal.nativeElement.classList.remove('show');
    this.improvementModal.nativeElement.style.display = 'none';
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

  addImprovement() {
    let userContent = this.improvementForm.value.content;
    let findIndex = this.improvementList.findIndex(
      (n: any) => n.id == this.improvementForm.value.id
    );
    if (findIndex != -1) {
      this.improvementList[findIndex].content = userContent;
      this.closeModal();
    } else {
      let uniqueId = this.generateUniqueId();
      this.improvementList.push({
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

  removeImprovement(index: number) {
    if (index > -1) {
      this.improvementList.splice(index, 1);
    }
  }

  redirectURL(type: string) {
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

    if (type == 'github') {
      window.open('https://github.com/login');
    }

    if (type == 'docker') {
      window.open('https://login.docker.com/u/login/identifier');
    }

    if (type == 'digital-ocean') {
      window.open('https://cloud.digitalocean.com/login');
    }

    if (type == 'serverpiolt') {
      window.open('https://manage.serverpilot.io/login');
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
