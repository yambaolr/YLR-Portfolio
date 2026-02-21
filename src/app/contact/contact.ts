import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
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

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnit() {
    this.titleService.setTitle('yambaolr | Portfolio - Contact');
    this.metaService.addTags([
    { name: 'description', content: 'Get in touch with Lorin Robelle Yambao (yambaolr) for backend development inquiries, collaborations, or to download her resume.' },
    {  name: 'keywords', content: 'Contact, Backend Developer, IT Student, RESTful APIs, Node.js, Portfolio, Resume' },
    { name: 'author', content: 'Lorin Robelle Yambao' }
  ]);

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
