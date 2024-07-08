import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROUTES } from 'src/app/app-routes';
import { Mode } from 'src/app/core/models/mode.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-create-branch',
  templateUrl: './create-branch.component.html',
  styleUrls: ['./create-branch.component.scss']
})
export class CreateBranchComponent implements OnInit, OnDestroy {

  createBatchFormGroup: FormGroup;
  modes: Mode[] = [];
  private subscriptions = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createBatchFormGroup = this._formBuilder.group({
      batchName: ['', Validators.required],
      mode: [null, Validators.required],

    });
  }
  ngOnInit(): void {
    this.getModes();
  }


  getModes() {
    this.subscriptions.add(
      this.dataService.getAllModes().subscribe((modes: Mode[]) => {
        this.modes = modes;
      })
    );
  }

  createBranch(){
    const formValue = this.createBatchFormGroup.value;
    const payload = {
      batchName: formValue.batchName,
      mode: formValue.mode,
    };
    console.log(payload)
    this.subscriptions.add(
      this.dataService.createBranch(payload).subscribe(() => this.router.navigate(ROUTES.ADMIN.MANAGE_BATCHES)))

  }




  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
