import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";

@Component({
  selector: "app-my-cards",
  templateUrl: "./my-cards.component.html",
  styleUrls: ["./my-cards.component.css"]
})
export class MyCardsComponent implements OnInit {
  constructor() {}
  @Input() gameService;
  selected = [];
  selectedRank;
  selectedBlindCard = null;

  takePile() {
    this.gameService.takePile();
  }

  playCards() {
    if (this.hasCards()) {
      this.gameService.playCards(this.selected);
    } else {
      this.gameService.playPrizeCards(this.selected);
    }
    this.selected = [];
    this.selectedRank = null;
  }

  revealBlindCard() {
    this.gameService.revealBlindCard(this.selectedBlindCard);
    this.selectedBlindCard = null;
  }

  title() {
    if (this.hasCards()) {
      return "My Cards";
    } else if (this.hasPrizeCards()) {
      return "My Prize Cards";
    }
    return "Reveal Blind Card";
  }

  cardsForSelection() {
    if (this.hasCards()) {
      return this.gameService.context.player.cards;
    } else if (this.hasPrizeCards()) {
      return this.gameService.playerFromGame().prizeCards;
    }
  }

  blindCards() {
    return this.gameService.playerFromGame().blindCards;
  }

  hasCards() {
    return this.gameService.context.player.cards.length > 0;
  }
  hasPrizeCards() {
    return this.gameService.playerFromGame().prizeCards.length > 0;
  }
  hasBlindCards() {
    return this.blindCards().length > 0;
  }
  isPickingBlindCard() {
    return !this.hasCards() && !this.hasPrizeCards() && this.hasBlindCards();
  }

  canSelectCard(card) {
    if (this.isSelected(card.id)) {
      return true;
    }
    if (this.gameService.isMyTurn() && this.selected.length < 4) {
      var valueToBeat = this.gameService.context.game.valueToBeat || 2;
      if (this.selected.length > 0) {
        if (this.selectedRank != card.rank) {
          return false;
        }
        if (
          this.selectedRank == valueToBeat &&
          this.selected.length ==
            this.gameService.context.game.maxCanPlayOfTopCard
        ) {
          return false;
        }
        return true;
      }
      if (this.gameService.includes([2, 8, 10, 15], card.rank)) {
        return true;
      }
      if (valueToBeat == 7) {
        return card.rank <= 7;
      } else {
        return valueToBeat <= card.rank;
      }
    }
    return false;
  }

  isSelected(cardId) {
    return this.gameService.includes(this.selected, cardId);
  }

  selectCard(card) {
    if (this.isSelected(card.id)) {
      this.selected = this.selected.filter(e => e != card.id);
    } else {
      if (this.canSelectCard(card)) {
        this.selected.push(card.id);
        this.selectedRank = card.rank;
      }
    }
    if (this.selected.length == 0) {
      this.selectedRank = null;
    }
  }

  selectBlindCard(pos) {
    if (this.selectedBlindCard == pos) {
      this.selectedBlindCard = null;
    } else {
      this.selectedBlindCard = pos;
    }
  }
  hasBlindCard(pos) {
    return this.gameService.includes(this.blindCards(), pos);
  }

  ngOnInit() {}
}
