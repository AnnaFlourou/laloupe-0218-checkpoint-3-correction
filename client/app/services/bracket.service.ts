import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Bracket } from '../shared/models/bracket.model';

@Injectable()
export class BracketService {

  constructor(private http: HttpClient) { }

  getBrackets(): Observable<Bracket[]> {
    return this.http.get<Bracket[]>('/api/brackets');
  }

  countBrackets(): Observable<number> {
    return this.http.get<number>('/api/brackets/count');
  }

  addBracket(bracket: Bracket): Observable<Bracket> {
    return this.http.post<Bracket>('/api/bracket', bracket);
  }

  getBracket(id: string): Observable<Bracket> {
    return this.http.get<Bracket>(`/api/bracket/${id}`);
  }

  editBracket(bracket: Bracket): Observable<string> {
    return this.http.put(`/api/bracket/${bracket._id}`, bracket, { responseType: 'text' });
  }

  deleteBracket(bracket: Bracket): Observable<string> {
    return this.http.delete(`/api/bracket/${bracket._id}`, { responseType: 'text' });
  }

  generateBrackets(): Observable<any> {
    return this.http.post(`/api/brackets/generate`, null);
  }

  next(): Observable<any> {
    return this.http.post<any>('/api/brackets/next', null);
  }

}
