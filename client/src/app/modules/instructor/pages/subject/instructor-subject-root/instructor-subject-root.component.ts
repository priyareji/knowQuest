import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { Subject } from 'src/app/core/models/subject';
import { DataService } from 'src/app/core/services/data.service';


interface NavLink {
  link: string;
  label: string;
  index:number;
}
@Component({
  selector: 'app-instructor-subject-root',
  templateUrl: './instructor-subject-root.component.html',
  styleUrls: ['./instructor-subject-root.component.scss']
})
export class InstructorSubjectRootComponent implements OnInit, OnDestroy  {

  activeLinkIndex = -1;

  // interface NavLink {
  //   link: string;
  //   label: string;
  // };

  navLinks: NavLink[]  = [
    {
      label: 'Overview',
      link: './overview',
      index: 0,
    },
    {
      label: 'Unit',
      link: './unit',
      index: 1,
    },
    {
      label: 'Chapter',
      link: './chapter',
      index: 1,
    },
    {
      label: 'Section',
      link: './section',
      index: 3,
    },
    {
      label: 'Library',
      link: './library',
      index: 4,
    },
  ];
  subject : Subject | null = null
  private subscriptions = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.subscriptions.add(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        const foundLink = this.navLinks.find(tab => tab.link === '.' + this.router.url);
        this.activeLinkIndex = foundLink ? this.navLinks.indexOf(foundLink) : -1;
      })
    );
    this.subscriptions.add(
      this.route.paramMap.subscribe((paramMap) => {
        console.log(typeof(paramMap.get('subjectId')))
       this.getSubject(paramMap.get('subjectId'))
  }))
}

getSubject(subjectId:string | null){
  if(!subjectId)return;
  this.subscriptions.add(
    this.dataService.getSubjectById(subjectId).subscribe((response) => {
    if(response && response.data.subject){
    const sub = response.data.subject[0];
     if (sub) {
      console.log(sub)
    this.subject=sub
    }}

  }))
}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }


}
