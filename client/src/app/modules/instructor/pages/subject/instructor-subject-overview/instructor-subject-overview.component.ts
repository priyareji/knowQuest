import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chapter } from 'src/app/core/models/chapter.model';
import { Section } from 'src/app/core/models/section.model';
import { Unit } from 'src/app/core/models/unit.model';
import { InstructorService } from 'src/app/core/services/instructor.service';

@Component({
  selector: 'app-instructor-subject-overview',
  templateUrl: './instructor-subject-overview.component.html',
  styleUrls: ['./instructor-subject-overview.component.scss']
})
export class InstructorSubjectOverviewComponent implements OnInit{
  subjectId: string | null= null;
  units: Unit[] = [];
  chapters: Chapter[] = [];
  sections: Section[] = [];
  viewMore: boolean = false;

  displayNoUnitsMessage = null;
  displayNoChaptersMessage= null;
  displayNoSectionsMessage= null;

  youtubeId: any = null;

 

  videoContainerWidth: number = 0;

  private subscriptions = new Subscription();
  constructor(
    private instructorService: InstructorService,
    private route: ActivatedRoute
  ) {
    this.subscriptions.add(
      this.route.parent?.paramMap.subscribe((params) => {
        if (params.get('subjectId')) {
          this.subjectId = params.get('subjectId');
            this.getUnitsBySubjectId(this.subjectId);
        }
      })
    );
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // this.videoContainerWidth = this.videoContainer.nativeElement.offsetWidth;
  }

  getUnitsBySubjectId(subjectId: any) {
    this.subscriptions.add(
      this.instructorService.getUnitsBySubjectId(subjectId).subscribe(
        (units: Unit[]) => {
          this.units = units;
        },
        // (err) => {
        //   if (err.error.err.code === 404) {
        //     this.displayNoUnitsMessage = err.error.err.message;
        //   }
        // }
      )
    );
  }

  openUnit(unitId: any) {
    this.chapters = [];
    this.sections = [];
    this.displayNoChaptersMessage = null;
    this.displayNoSectionsMessage = null;
    this.subscriptions.add(
      this.instructorService.getChaptersByUnitId(unitId).subscribe(
        (chapters: Chapter[]) => {
          this.chapters = chapters;
        },
        // (err) => {
        //   if (err.error.err.code === 404) {
        //     this.displayNoChaptersMessage = err.error.err.message;
        //   }
        // }
      )
    );
  }

  openChapter(chapterId: string) {
    this.sections = [];
    this.displayNoChaptersMessage = null;
    this.displayNoSectionsMessage = null;
    this.subscriptions.add(
      this.instructorService.getSectionsByChapterId(chapterId).subscribe(
        (sections: Section[]) => {
          this.sections = sections;
          this.sections.map((section) => {
            if (section.videoType === 'youtube') {
              let youtubeId = this.getYouTubeId(section.videoUrl);
              console.log(youtubeId);
              section.videoUrl = youtubeId;
            }
          });
        },
        (err) => {
          if (err.error.err.code === 404) {
            this.displayNoSectionsMessage = err.error.err.message;
          }
        }
      )
    );
  }

  getYouTubeId(url: any) {
    let youtubeurl = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return youtubeurl[2] !== undefined
      ? youtubeurl[2].split(/[^0-9a-z_\-]/i)[0]
      : youtubeurl[0];
  }

  openFile(filePath: string) {
    let url = 'http/localhost:4200' + '/' + filePath;
    window.open(url, '_blank');
  }

}
