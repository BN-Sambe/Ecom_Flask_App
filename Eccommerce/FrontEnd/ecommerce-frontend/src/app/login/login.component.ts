import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string  = '';
  formSubmitted: boolean = false;
  message: string = '';
  error: boolean = false;

  constructor(private authService: AuthService, private router: Router)  { }

  onSubmit() {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe(response => {
        alert(response.message);
        this.router.navigate(['/shop']);
      });
  }
}
