import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('yambaolr | Portfolio - Home');
    this.metaService.addTags([
      { name: 'description', content: 'Welcome to yambaolr, the portfolio of Lorin Robelle Yambao, a third-year IT student specializing in backend development.' },
      { name: 'keywords', content: 'yambaolr, Lorin Robelle Yambao, Portfolio, Backend Developer, IT Student, RESTful APIs, Node.js, MongoDB, Web Development' },
      { name: 'author', content: 'Lorin Robelle Yambao' }
    ]);
  }
}
