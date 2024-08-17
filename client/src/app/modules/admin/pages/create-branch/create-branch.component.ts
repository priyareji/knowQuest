import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROUTES } from 'src/app/app-routes';
import { Course } from 'src/app/core/models/course';
import { Mode } from 'src/app/core/models/mode.model';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-create-branch',
  templateUrl: './create-branch.component.html',
  styleUrls: ['./create-branch.component.scss']
})
export class CreateBranchComponent implements OnInit, OnDestroy {

  createBatchFormGroup: FormGroup;
  modes: Mode[] = [];
  courses:Course[]=[];
  private subscriptions = new Subscription();
  isEditMode = false;
  batchId: string | null = null;
  constructor(
    private _formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService:AlertService
  ) {
    this.createBatchFormGroup = this._formBuilder.group({
      batchName: ['', Validators.required],
      mode: [null, Validators.required],
      course: [null, Validators.required],

    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('batchId'));
      this.batchId = params.get('batchId');
      console.log(this.batchId,"batchid")
      this.isEditMode = !!this.batchId;

      if(this.isEditMode && this.batchId){
        this.dataService.getBatchById(this.batchId).subscribe(batchdata => {
          const batch =batchdata.data
          this.createBatchFormGroup.patchValue(batch)

        });
      }
    });
    this.getModes();
    this.getCourses();

  }


  getModes() {
    this.subscriptions.add(
      this.dataService.getAllModes().subscribe((modes: Mode[]) => {
        this.modes = modes;
      })
    );
  }
  getCourses() {
    this.subscriptions.add(
      this.dataService.getCourse().subscribe((courses: Course[]) => {
        this.courses = courses;
      })
    );
  }

  createBranch(){
    const formValue = this.createBatchFormGroup.value;
    const payload = {
      batchName: formValue.batchName,
      mode: formValue.mode,
      course:formValue.course
    };
    console.log(payload)
    if (this.isEditMode && this.batchId) {
      this.dataService.updatebatch(this.batchId, payload).subscribe ( () => {
        this.router.navigate(ROUTES.ADMIN.MANAGE_BATCHES);
      },
      err => {
        console.log(err)
      }
  );
    } else {
    this.subscriptions.add(
      this.dataService.createBranch(payload).subscribe(() => {this.router.navigate(ROUTES.ADMIN.MANAGE_BATCHES)},

      err => {
        console.log(err.error)
        this.alertService.error(err.error)
      }
    ))
    }
  }




  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
