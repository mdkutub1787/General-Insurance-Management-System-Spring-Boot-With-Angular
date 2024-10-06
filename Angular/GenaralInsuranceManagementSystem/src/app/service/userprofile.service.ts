import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../model/user.model';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  baseurl="http://localhost:8080/registerview";

  constructor(private authService:AuthService,
    private http:HttpClient
  ) { }

  // getUserProfile(): Observable<UserModel | null> {
  //   return of(this.authService.getUserProfileFromStorage());
  // }

  getUserProfile(): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseurl}`);
  }

  updateUserProfile(user: UserModel): Observable<UserModel> {
    localStorage.setItem('userProfile', JSON.stringify(user));
    return this.http.put<UserModel>(`${this.baseurl}/${user.id}`, user);
  }



}
