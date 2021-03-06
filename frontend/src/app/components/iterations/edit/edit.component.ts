import { Iteration } from './../../../models/iteration.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IterationService } from 'src/app/services/iteration.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-edit-iteration',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditIterationComponent implements OnInit {

  id: string;
  iteration: Iteration;

  updateForm: FormGroup;
  constructor(private iterationService: IterationService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      description: '',
      goal: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.iterationService.getIterationById(this.id).subscribe(res => {
        this.iteration = res as Iteration;
        this.updateForm.get('title').setValue(this.iteration.title);
        this.updateForm.get('description').setValue(this.iteration.description);
        this.updateForm.get('goal').setValue(this.iteration.goal);
      });
    });
  }

  updateIteration(title, description, goal) {
    this.iterationService.updateIteration(this.id, title, description, goal, this.iteration.state, this.iteration.finishDate).subscribe(res => {
      this.snackBar.open('Итерация успешно изменена!', 'OK', {
        duration: 2000
      });
    });
  }

}
