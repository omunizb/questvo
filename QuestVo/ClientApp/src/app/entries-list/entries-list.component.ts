import { Component, OnInit } from '@angular/core';

import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ENTRIES } from '../ENTRIES';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.css']
})
export class EntriesListComponent implements OnInit {
  title = 'Entries';
  tableDataSrc = new MatTableDataSource();
  tableCols: string[] = [
    'entryId', 
    'userId', 
    'language',
    'word', 
    'function', 
    'definition',
    'update',
    'delete'
  ];
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.tableDataSrc.data = ENTRIES;
    this.tableDataSrc.sort = this.sort;
    this.tableDataSrc.paginator = this.paginator;
  }

  delete(employee): void {
    this.tableDataSrc.data = this.tableDataSrc.data.filter(e => e !== employee);
    //this.employeeService.deleteEmployee(employee).subscribe();
  }

  onSearchInput(ev) {
    const searchTarget = ev.target.value;
    this.tableDataSrc.filter = searchTarget.trim().toLowerCase();
  }

}
