import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserprofileService } from '../service/userprofile.service';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserModel } from '../model/user.model';
import { Subscription } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent  {

  user!: UserModel;

  constructor(private userprofileService: UserprofileService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.loadUserProfile();

  }

  loadUserProfile(): void {
    this.userprofileService.getUserProfile()
      .subscribe({
        next: (user) => {
          if (user) {
            this.user = user;
          }
        },
        error: (error) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          } else {
            console.log('Error fetching user profile', error);
          }
        }
      });
  }
 
}
