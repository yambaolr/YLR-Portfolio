import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
    constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('yambaolr | Portfolio - About');
    this.metaService.addTags([
      { name: 'description', content: 'Learn more about Lorin Robelle Yambao (yambaolr), a third-year IT student from Holy Angel University' },
      { name: 'keywords', content: 'yambaolr, Lorin Robelle Yambao, About, backend developer, IT student, RESTful API, Node.js, PHP, MongoDB, MySQL, Skills' },
      { name: 'author', content: 'Lorin Robelle Yambao' }
    ]);
  }

}
