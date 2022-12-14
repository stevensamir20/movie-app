import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  showLoading: boolean = false;
  showError: string | undefined;

  constructor(private fb: FormBuilder, private dataService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ngOnInit() {}

  postData(loginData: any) {
    this.showLoading = true;
    this.dataService.userLogin( loginData.value.email, loginData.value.password )
    .pipe(first())
    .subscribe(
      (data) => {
        const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/movies';
        this.router.navigate([redirect]);
        this.showLoading = false;
      },
      (error) => { 
        this.showError = error.error;
        this.showLoading = false;
      }
    );
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get fc() { return this.loginForm.controls }
}