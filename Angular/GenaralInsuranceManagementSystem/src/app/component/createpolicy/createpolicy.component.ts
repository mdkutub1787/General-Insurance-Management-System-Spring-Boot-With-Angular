import { Component, OnInit } from '@angular/core';
import { PolicyModel } from '../../model/policy.model';
import { PolicyService } from '../../service/policy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createpolicy',
  templateUrl: './createpolicy.component.html',
  styleUrls: ['./createpolicy.component.css']
})
export class CreatepolicyComponent implements OnInit {

  policy: PolicyModel = new PolicyModel();
  errorMessage: string = '';
  submitted = false;

  constructor(
    private policyService: PolicyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; 
    this.policy.date = formattedDate; // Setting the default date
    this.policy.owner = 'The Insured'; // Default value for owner
    this.policy.coverage = 'Fire &/or Lightning only'; // Default value for coverage
  }

  createPolicy() {
    this.policyService.createPolicy(this.policy)
      .subscribe({
        next: (data) => {
          console.log('Policy created successfully', data);
          this.router.navigate(['/viewpolicy']);
        },
        error: (err) => {
          console.error('Error occurred while creating policy', err);
          this.errorMessage = 'There was an error creating the policy. Please try again.';
        }
      });
  }

  updatePeriodTo(periodFrom: string) {
    if (periodFrom) {
      const fromDate = new Date(periodFrom);
      const toDate = new Date(fromDate);
      toDate.setFullYear(toDate.getFullYear() + 1); // Add one year to the selected date
      this.policy.periodTo = toDate.toISOString().substring(0, 10); // Format date as YYYY-MM-DD
    } else {
      this.policy.periodTo = ''; // Reset the periodTo if periodFrom is cleared
    }
  }

}
