import { Component, OnInit } from '@angular/core';

import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { EntryService } from '../entry.service';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.css']
})
export class EntriesListComponent implements OnInit {
  title = 'Entries';
  tableDataSrc = new MatTableDataSource();
  tableCols: string[] = [
    'language',
    'word', 
    'function', 
    'definition',
    'update',
    'delete'
  ];
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private entryService: EntryService) { }

  ngOnInit(): void {
    this.getEntries();
    this.tableDataSrc.sort = this.sort;
    this.tableDataSrc.paginator = this.paginator;
  }

  getEntries(): void {
    this.entryService.getEntries()
        .subscribe(entries => this.tableDataSrc.data = entries);
  }

  delete(entry): void {
    this.tableDataSrc.data = this.tableDataSrc.data.filter(e => e !== entry);
    this.entryService.deleteEntry(entry).subscribe();
  }

  onSearchInput(ev) {
    const searchTarget = ev.target.value;
    this.tableDataSrc.filter = searchTarget.trim().toLowerCase();
  }

}
