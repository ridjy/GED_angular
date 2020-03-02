import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ServerService} from "../../alfresco_services/AlfrescoApi.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  public router: Router;
  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  errorServer: boolean = false;

  constructor(router:Router, fb:FormBuilder,
              private alfrescoApiService: ServerService,
              private authService: AuthService
  ) {
      this.router = router;
      this.form = fb.group({
          'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
          'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      });

      this.email = this.form.controls['email'];
      this.password = this.form.controls['password'];
  }

  public onSubmit(values:any):void {
      if (this.form.valid) {
          this.alfrescoApiService.loginWithUsernameAndPassword(values.email, values.password)
              .then(
                  res => {
                      this.alfrescoApiService.setTocken(res);
                      this.authService.saveToken(res);
                      if(this.alfrescoApiService.isLoggedIn() === true) this.router.navigate(['pages/dashboard']);
                  }
              )
              .catch(
                  error => {
                      console.log(error);
                      this.errorServer = true;
                  }
              )
      }
  }

  ngAfterViewInit(){
      document.getElementById('preloader').classList.add('hide');                 
  }

}

export function emailValidator(control: FormControl): {[key: string]: any} {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;    
    if (control.value && !emailRegexp.test(control.value)) {
        return {invalidEmail: true};
    }
}
