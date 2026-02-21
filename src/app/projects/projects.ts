import { Component, ChangeDetectorRef, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

interface Project {
  name: string;
  type: string;
  description: string;
  techStack: string[];
  images: string[];
  liveDemo?: string;
  repository?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class Projects implements OnInit {

  selectedFilter: string = 'ALL';
  isExecuting: boolean = false;
  executionTime: string = '0.000';
  filteredResults: Project[] = [];

  // Image overlay
  selectedImage: string | null = null;
  currentIndex: number = 0;
  allImages: string[] = [];

  constructor(private cdr: ChangeDetectorRef,private titleService: Title, private metaService: Meta) {}

  projects: Project[] = [
    {
      name: 'Iponly – Gamified Budget Management Web Application',
      type: 'FULLSTACK',
      description: `
        Designed and developed RESTful backend APIs for authentication,
        expense tracking, leaderboard calculations, and admin management.
        Implemented JWT authorization and password hashing.
      `,
      techStack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Bcrypt'],
      images: ['images/iponly-1.png', 'images/iponly.png', 'images/iponly-3.png'],
      repository: 'https://github.com/tsAntonio25/6WCSERVER-Final-Project'
    },
    {
      name: 'The Garage – Car Rental Website',
      type: 'FULLSTACK',
      description: `
        Developed backend functionality and admin dashboard
        to manage vehicles and rental workflows.
        Implemented CRUD logic and database handling using PHP and MySQL.
      `,
      techStack: ['PHP', 'MySQL', 'CRUD'],
      images: ['images/the-garage.png','images/garage-1.png', 'images/garage-2.png'],
      repository: 'https://github.com/tsAntonio25/website-dweb/'
    },
    {
      name: 'Secure Notes API',
      type: 'API',
      description: `
        Backend-only RESTful API with JWT authentication.
        Supports user registration, login, and full CRUD operations
        for categorized personal notes with ownership-based authorization.
      `,
      techStack: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'bcrypt'],
      images: ['images/notes-1.png', 'images/notes-2.png'],
      liveDemo: 'https://secure-notes-api-ufwr.onrender.com/',
      repository: 'https://github.com/yambaolr/Secure-Notes-API'
    },
    {
      name: 'Anonymous Chat Backend',
      type: 'API',
      description: `
        Backend REST API for anonymous chat app.
        Features JWT authentication, role-based access,
        chat room management, real-time messaging with Socket.IO,
        and rate limiting.
      `,
      techStack: ['Node.js', 'Express.js', 'PostgreSQL', 'Socket.IO', 'JWT'],
      images: ['images/chat-1.png', 'images/chat-2.png'],
      liveDemo: 'https://anonymous-chat-backend-jdvh.onrender.com/',
      repository: 'https://github.com/yambaolr/Anonymous-Chat-Backend'
    },
    {
      name: 'Lusail Water Station',
      type: 'CMS',
      description: `
        WordPress-based website focused on SEO optimization
        and structured content management.
      `,
      techStack: ['WordPress', 'SEO'],
      images: ['images/lusail-1.png', 'images/lusail-2.png'],
      liveDemo: 'https://lusailwaterstation.shop/'
    }
  ];

  ngOnInit() {
    this.runQuery();

    // SEO
    this.titleService.setTitle('yambaolr | Portfolio - Projects');
    this.metaService.addTags([
      { name: 'description', content: 'Explore the projects of Lorin Robelle Yambao (yambaolr), featuring academic and personal projects.'  },
      { name: 'keywords', content: 'portfolio, projects, fullstack, API, CMS, web development' },
      { name: 'author', content: 'Lorin Robelle Yambao' }
    ]);
  }

  filterProjects(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedFilter = select.value;
    this.runQuery();
  }

  runQuery() {
    this.isExecuting = true;
    this.filteredResults = [];
    this.cdr.detectChanges();

    const start = performance.now();

    setTimeout(() => {
      this.filteredResults =
        this.selectedFilter === 'ALL'
          ? this.projects
          : this.projects.filter(p => p.type === this.selectedFilter);

      const end = performance.now();
      this.executionTime = ((end - start) / 1000).toFixed(3);

      this.isExecuting = false;
      this.cdr.detectChanges();
    }, 800);
  }

  get rowsReturned(): number {
    return this.filteredResults.length;
  }

  openImage(img: string, project: Project) {
    this.allImages = project.images;
    this.currentIndex = this.allImages.indexOf(img);
    this.selectedImage = img;
    document.body.style.overflow = 'hidden'; 
  }

  closeImage() {
    this.selectedImage = null;
    document.body.style.overflow = '';
  }

  nextImage() {
    if (!this.selectedImage) return;
    this.currentIndex = (this.currentIndex + 1) % this.allImages.length;
    this.selectedImage = this.allImages[this.currentIndex];
  }

  prevImage() {
    if (!this.selectedImage) return;
    this.currentIndex = (this.currentIndex - 1 + this.allImages.length) % this.allImages.length;
    this.selectedImage = this.allImages[this.currentIndex];
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.selectedImage) return;
    if (event.key === 'ArrowRight') this.nextImage();
    if (event.key === 'ArrowLeft') this.prevImage();
    if (event.key === 'Escape') this.closeImage();
  }

  getSafeId(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-');
  }
}