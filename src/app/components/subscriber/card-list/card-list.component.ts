import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  cards: any[] = [];

  constructor() {
    this.generateCards(1);
  }

  generateCards(count: number): void {
    for (let i = 0; i < count; i++) {
      this.cards.push({
        title: 'Smiley',
        bannerImage: '../../../assets/Smiley.jpg',
        description: "Smiley, whose real name is Andrei Tiberiu Maria, is a Romanian singer, songwriter, and music producer known for his dynamic and versatile contributions to the pop and electronic music scenes. With a charismatic stage presence and a distinctive voice, Smiley has gained popularity for his solo career and collaborations within the Romanian music industry."
      });
      this.cards.push({
        title: 'Ed Sheeran',
        bannerImage: '../../../assets/Sheeran.jpg',
        description: "Ed Sheeran is a British singer-songwriter renowned for his soulful voice and heartfelt lyrics, often blending pop, folk, and R&B influences. His chart-topping hits, such as \"Shape of You\" and \"Thinking Out Loud\", have solidified his global success and established him as one of the most celebrated and commercially successful musicians of his generation."
      });
      this.cards.push({
        title: 'Cristiano Ronaldo',
        bannerImage: '../../../assets/Ronaldo.jpg',
        description: "Cristiano Ronaldo is a Portuguese professional footballer widely regarded as one of the greatest players in the history of the sport. Known for his exceptional goal-scoring prowess, athleticism, and versatility, Ronaldo has achieved numerous individual awards and team successes, including multiple UEFA Champions League titles and FIFA Ballon d'Or honors."
      });
      this.cards.push({
        title: 'Demar DeRozan',
        bannerImage: '../../../assets/Derozan.jpg',
        description: "Demar DeRozan is an accomplished NBA player recognized for his skillful scoring, particularly adept at mid-range jumpers. His career has seen him contribute significantly to teams like the Toronto Raptors and the San Antonio Spurs, showcasing his offensive prowess and leadership on the court."
      });
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight;

    if (windowHeight + scrollY >= documentHeight) {
      this.generateCards(1); 
    }
  }
}
