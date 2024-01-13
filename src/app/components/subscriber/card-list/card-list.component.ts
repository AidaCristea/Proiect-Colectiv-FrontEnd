import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {
  cards: any[] = [];

  constructor() {
    this.generateCards(1);
  }

  generateCards(count: number): void {
    for (let i = 0; i < count; i++) {this.cards.push({
      title: 'Smiley',
      bannerImage: '../../../assets/Smiley.jpg',
      description: "Smiley, whose real name is Andrei Tiberiu Maria, is a Romanian singer, songwriter, and music producer known for his dynamic and versatile contributions to the pop and electronic music scenes. With a charismatic stage presence and a distinctive voice, Smiley has gained popularity for his solo career and collaborations within the Romanian music industry.",
      subscriptions: [
        { type: 'Lite', description: 'Basic features with limited access to exclusive content. Perfect for those who want to dip their toes into the world of Smiley.', price: '$9.99' },
        { type: 'Pro', description: 'Enhanced features including unlimited access to exclusive content and behind-the-scenes footage. Ideal for dedicated fans.', price: '$19.99' },
        { type: 'Ultimate', description: 'Premium features offering the ultimate Smiley experience. Unlimited access to exclusive content, VIP events, and more.', price: '$29.99' }
      ]
    });

// Adaugă valori pentru ceilalți artiști
      this.cards.push({
        title: 'Ed Sheeran',
        bannerImage: '../../../assets/Sheeran.jpg',
        description: "Ed Sheeran is a British singer-songwriter renowned for his soulful voice and heartfelt lyrics, often blending pop, folk, and R&B influences. His chart-topping hits, such as \"Shape of You\" and \"Thinking Out Loud\", have solidified his global success and established him as one of the most celebrated and commercially successful musicians of his generation.",
        subscriptions: [
          { type: 'Basic', description: 'Access to essential features for casual listeners. Enjoy Ed Sheeran\'s top tracks and basic exclusive content.', price: '$9.99' },
          { type: 'Premium', description: 'Premium features for music lovers. Unlock a vast library of Ed Sheeran\'s discography and exclusive behind-the-scenes content.', price: '$24.99' },
          { type: 'VIP', description: 'Exclusive access to behind-the-scenes content, VIP events, and personalized messages from Ed Sheeran. The ultimate fan experience.', price: '$49.99' }
        ]
      });

      this.cards.push({
        title: 'Cristiano Ronaldo',
        bannerImage: '../../../assets/Ronaldo.jpg',
        description: "Cristiano Ronaldo is a Portuguese professional footballer widely regarded as one of the greatest players in the history of the sport. Known for his exceptional goal-scoring prowess, athleticism, and versatility, Ronaldo has achieved numerous individual awards and team successes, including multiple UEFA Champions League titles and FIFA Ballon d'Or honors.",
        subscriptions: [
          { type: 'Standard', description: 'Access to live matches and highlights. Stay connected with Cristiano Ronaldo\'s on-field performances.', price: '$14.99' },
          { type: 'Gold', description: 'Premium football experience with access to in-depth analysis, exclusive interviews, and behind-the-scenes footage.', price: '$29.99' },
          { type: 'Platinum', description: 'Exclusive content, player interviews, and personalized insights into Cristiano Ronaldo\'s training regimen. For true football enthusiasts.', price: '$49.99' }
        ]
      });

      this.cards.push({
        title: 'Demar DeRozan',
        bannerImage: '../../../assets/Derozan.jpg',
        description: "Demar DeRozan is an accomplished NBA player recognized for his skillful scoring, particularly adept at mid-range jumpers. His career has seen him contribute significantly to teams like the Toronto Raptors and the San Antonio Spurs, showcasing his offensive prowess and leadership on the court.",
        subscriptions: [
          { type: 'Starter', description: 'Access to game highlights and exclusive interviews with Demar DeRozan. Perfect for fans looking for key moments.', price: '$7.99' },
          { type: 'All-Star', description: 'Premium basketball content with extended highlights, in-depth analysis, and exclusive behind-the-scenes access.', price: '$17.99' },
          { type: 'MVP', description: 'Exclusive access to Demar DeRozan\'s training sessions, personalized messages, and VIP events. For the ultimate fan experience.', price: '$29.99' }
        ]
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

  openSubscriptionPopout(card: any): void {
    card.showPopout = true;
  }

  closeSubscriptionPopout(card: any): void {
    card.showPopout = false;
  }
}
