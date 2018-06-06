import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Player } from '../shared/models/player.model';

@Injectable()
export class PlayerService {

  winner: string;

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>('/api/players');
  }

  countPlayers(): Observable<number> {
    return this.http.get<number>('/api/players/count');
  }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>('/api/player', player);
  }

  getPlayer(player: Player): Observable<Player> {
    return this.http.get<Player>(`/api/player/${player._id}`);
  }

  editPlayer(player: Player): Observable<string> {
    return this.http.put(`/api/player/${player._id}`, player, { responseType: 'text' });
  }

  deletePlayer(player: Player): Observable<string> {
    return this.http.delete(`/api/player/${player._id}`, { responseType: 'text' });
  }

  reset(): Observable<any> {
    return this.http.post<any>('/api/players/reset', null);
  }

}
