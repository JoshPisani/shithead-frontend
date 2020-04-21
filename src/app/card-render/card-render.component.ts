import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";

@Component({
  selector: "app-card-render",
  templateUrl: "./card-render.component.html",
  styleUrls: ["./card-render.component.css"]
})
export class CardRenderComponent implements OnInit {
  constructor() {}
  @Input() card;

  ngOnInit() {}

  suitValue() {
    if (this.card) {
      return this.card.suit;
    }
    return "none";
  }

  displayValue() {
    if (this.card) {
      return this.displayRank() + " " + this.displaySuit();
    }
    return "none";
  }

  displayRank() {
    if (this.card.rank <= 10) {
      return this.card.rank;
    } else {
      switch (this.card.rank) {
        case 11:
          return "J";
        case 12:
          return "Q";
        case 13:
          return "K";
        case 14:
          return "A";
        case 15:
          return "Joker";
      }
    }
  }
  displaySuit() {
    switch (this.card.suit) {
      case "clubs":
        return "♣";
      case "hearts":
        return "♥";
      case "diamonds":
        return "♦";
      case "spades":
        return "♠";
      default:
        return "";
    }
  }
}
