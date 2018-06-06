import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Match } from '../shared/models/match.model';

@Injectable()
export class MatchService {

  constructor(private http: HttpClient) { }

  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>('/api/matches');
  }

  countMatches(): Observable<number> {
    return this.http.get<number>('/api/matches/count');
  }

  addMatch(match: Match): Observable<Match> {
    return this.http.post<Match>('/api/match', match);
  }

  getMatch(match: Match): Observable<Match> {
    return this.http.get<Match>(`/api/match/${match._id}`);
  }

  editMatch(match: Match): Observable<string> {
    return this.http.put(`/api/match/${match._id}`, match, { responseType: 'text' });
  }

  deleteMatch(match: Match): Observable<string> {
    return this.http.delete(`/api/match/${match._id}`, { responseType: 'text' });
  }

  next(): Observable<any> {
    return this.http.post(`/api/matches/next`, null);
  }
}
