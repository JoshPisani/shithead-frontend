import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";

@Component({
  selector: "app-set-up",
  templateUrl: "./set-up.component.html",
  styleUrls: ["./set-up.component.css"]
})
export class SetUpComponent implements OnInit {
  constructor() {}
  @Input() gameService;
  selected = [];

  ngOnInit() {}

  isSelected(cardId) {
    return this.gameService.includes(this.selected, cardId);
  }
  hasSubmitted() {
    return this.gameService.playerFromGame().prizeCards.length > 0;
  }

  cardClicked(cardId) {
    if (this.isSelected(cardId)) {
      this.selected = this.selected.filter(e => e != cardId);
    } else {
      if (this.selected.length < 3) {
        this.selected.push(cardId);
      }
    }
  }

  setPrizeCards() {
    this.gameService.setPrizeCards(this.selected);
  }
}
