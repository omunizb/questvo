import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Entry } from './entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private entriesUrl = 'api/entries';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // this.messageService.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getEntries(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.baseUrl + this.entriesUrl).pipe(
      catchError(this.handleError<Entry[]>('getEntries', [])));
  }

  getEntry(entryId: string): Observable<Entry> {
    const url = `${this.baseUrl + this.entriesUrl}/${entryId}`;
    return this.http.get<Entry>(url).pipe(
      catchError(this.handleError<Entry>(`getEntry entryId=${entryId}`)));
  }

  deleteEntry(entry: Entry): Observable<Entry> {
    const url = `${this.baseUrl + this.entriesUrl}/${entry.entryId}`;
    return this.http.delete<Entry>(url, this.httpOptions).pipe(
      // tap(_ => this.messageService.log(`Deleted entry entryId=${entry.entryId}.`)),
      catchError(this.handleError<Entry>('deleteEntry'))
    );
  }

  updateEntry(entry: Entry): Observable<any> {
    const url = `${this.baseUrl + this.entriesUrl}/${entry.entryId}`;
    return this.http.put(url, entry, this.httpOptions).pipe(
      // tap(_ => this.messageService.log(`Updated entry entryId=${entry.entryId}.`)),
      catchError(this.handleError<any>('updateEntry')));
  }

  addEntry(entry: Entry): Observable<Entry> {
    return this.http.post<Entry>(this.baseUrl + this.entriesUrl, entry, this.httpOptions).pipe(
      // tap((newEntry: Entry) => this.messageService.log(`Added entry with entryId=${newEntry.entryId}.`)),
      catchError(this.handleError<Entry>('addEntry')));
  }
}
