import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  githubUser: any = null;
  error: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchGitHubProfile();
  }

  fetchGitHubProfile(): void {
    const githubUsername = 'camimayer';
    this.http
      .get(`https://api.github.com/users/${githubUsername}`)
      .subscribe(
        (data) => {
          this.githubUser = data;
        },
        (error) => {
          console.error('Error fetching GitHub profile:', error);
          error = true;
        }
      );
  }
}
