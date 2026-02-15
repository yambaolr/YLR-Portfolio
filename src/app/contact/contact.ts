import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm: FormGroup;
  isSubmitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.contactForm.invalid) return;

    emailjs.send(
      'service_81wv4h3',
      'template_3b6d96t',
      {
        from_name: this.contactForm.value.name,
        from_email: this.contactForm.value.email,
        message: this.contactForm.value.message
      },
      //public key
      'o7ih3doHU6B7ypJPy'
    ).then(() => {
      this.successMessage = "Message sent successfully!";
      this.contactForm.reset();
      this.isSubmitted = false;
    }).catch(() => {
      this.errorMessage = "Something went wrong. Please try again.";
    });
  }
}
