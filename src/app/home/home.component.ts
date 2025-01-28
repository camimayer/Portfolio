import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  fullText: string = "I'm Camila Mayer";
  displayedText: string = '';
  typingSpeed: number = 100;

  ngOnInit() {
    this.typeText();
  }

  typeText() {
    let index = 0;
    const interval = setInterval(() => {
      if (index < this.fullText.length) {
        this.displayedText += this.fullText[index];
        index++;
      } else {
        clearInterval(interval);
      }
    }, this.typingSpeed);
  }
}
