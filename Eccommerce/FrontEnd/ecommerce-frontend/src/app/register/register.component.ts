import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; // Use non-null assertion operator
  message: string | null = null;
  error: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    // Initialize form with validation rules
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Method to handle form submission
  onRegister() {
    if (this.registerForm.invalid) {
      // If form is invalid, don't proceed
      this.message = 'Please fill in all required fields correctly.';
      this.error = true;
      return;
    }

    // Collect form data
    const formData = this.registerForm.value;

    // Send POST request to the Flask API
    this.http.post('/api/register', formData)
      .subscribe({
        next: (response: any) => {
          this.message = response.message; // Success message from API
          this.error = false;
          // Redirect to login page after successful registration
          setTimeout(() => this.router.navigate(['/login']), 2000); // 2 seconds delay
        },
        error: (error) => {
          this.message = error.error.message || 'An error occurred'; // Error message from API
          this.error = true;
        }
      });
  }
}
