import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { ENTRIES } from '../ENTRIES';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.css']
})
export class EntryDetailComponent implements OnInit {
  entryForm;

  constructor(
    private entryService: EntryService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.entryForm = this.formBuilder.group({
      entryId: [{ value: '', disabled: true }],
      userId: [{ value: '', disabled: true }],
      language: ['', [Validators.required, Validators.maxLength(100)]],
      word: ['', [Validators.required, Validators.maxLength(100)]],
      function: ['', Validators.maxLength(100)],
      definition: ['', [Validators.required, Validators.maxLength(1000)]]
    });

    if (this.route.snapshot.paramMap.get('id')) {
      this.getEntry();
    }
  }

  onSubmit(entryData) {
    if (this.route.snapshot.paramMap.get('id')) {
      this.entryService.updateEntry(entryData).subscribe();
    }
    else {
      delete entryData.entryId;
      this.entryService.addEntry(entryData).subscribe();
    }

    this.router.navigate(['/entries']);
  }

  getEntry(): void {
    const id = this.route.snapshot.paramMap.get('id');

    /* this.entryService.getEntry(id)
      .pipe(tap(entry => this.entryForm.patchValue(entry)))
      .subscribe(); */
    
    this.entryForm.patchValue(ENTRIES.find(entry => entry.entryId === id));
  }

  goBack(): void {
    this.location.back();
  }
}
