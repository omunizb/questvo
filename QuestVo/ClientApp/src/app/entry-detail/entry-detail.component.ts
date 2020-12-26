import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { ENTRIES } from '../ENTRIES';

@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.css']
})
export class EntryDetailComponent implements OnInit {
  entryForm;

  constructor(
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
    /*if (this.route.snapshot.paramMap.get('id')) {
      this.productService.updateProduct(productData).subscribe();
    }
    else {
      delete productData.id;
      productData.purchases = 0;
      this.productService.addProduct(productData).subscribe();
    }*/
    this.router.navigate(['/stock']);
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
