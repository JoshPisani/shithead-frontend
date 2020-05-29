import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Observable, Observer } from "rxjs/Rx";

@Injectable({
  providedIn: "root"
})
export class GameService {
  context;
  error;
  showOverlay = false;
  updating = false;
  isSpectating = false;
  timeOut;
  spectateTimeOut;
  messages = [];
  url = "https://733c222c0a36.ngrok.io/";
  gameId;
  rejoinCode;
  constructor(private http: HttpClient) {}

  isCreating() {
    if (this.context) {
      return this.context.game.state == "creating";
    }
  }
  isSetUp() {
    if (this.context) {
      return this.context.game.state == "setUp";
    }
  }
  isRunning() {
    if (this.context) {
      return this.context.game.state == "running";
    }
  }
  isJoker() {
    if (this.context) {
      return this.context.game.state == "joker";
    }
  }
  isGameOver() {
    if (this.context) {
      return this.context.game.state == "over";
    }
  }
  isOwner() {
    return this.context.game.owner == this.context.player.id;
  }
  isMyTurn() {
    return (
      (this.isRunning() || this.isJoker()) &&
      this.context.game.turn == this.context.player.id
    );
  }
  isChoosingVictim() {
    return this.isJoker() && this.isMyTurn();
  }
  whoseTurn() {
    if (this.isMyTurn()) {
      return "Your";
    } else {
      return (
        this.context.game.players.find(p => p.id == this.context.game.turn)
          .name + "'s"
      );
    }
  }
  isPickingPrizes() {
    return (
      this.context.game.state == "setUp" &&
      this.playerFromGame().prizeCards.length == 0
    );
  }
  playerFromGame() {
    return this.context.game.players.find(p => p.id == this.context.player.id);
  }
  doUpDate() {
    this.updating = true;
    this.sendRequest("updateGame", this.baseData());
  }
  doSpectateUpDate() {
    this.updating = true;
    this.http.post(this.url + "spectateUpdate", this.spectateData()).subscribe(
      response => {
        this.handleSpectateResponse(response);
      },
      err => {
        this.handleSpectateError(err);
      }
    );
    this.sendRequest("updateSpectate", this.baseData());
  }
  handleResponse(response) {
    this.updating = false;
    this.showOverlay = false;
    this.context = response;
    if (response.rejoinCode) {
      this.rejoinCode = response.rejoinCode;
    }
    if (response.player.messages) {
      this.messages = this.messages.concat(response.player.messages);
    }
    if (this.shouldUpdate()) {
      this.timeOut = setTimeout(() => this.doUpDate(), 1000);
    }
  }
  handleError(response) {
    this.showOverlay = false;
    if (typeof response.error == "string") {
      this.error = response.error;
    } else {
      this.error = "something went wrong...";
    }
    if (this.shouldUpdate()) {
      this.timeOut = setTimeout(() => this.doUpDate(), 1000);
    }
  }
  handleSpectateResponse(response) {
    this.updating = false;
    this.showOverlay = false;
    this.context = response;
    if (response.rejoinCode) {
      this.rejoinCode = response.rejoinCode;
    }
    if (response.messages) {
      this.messages = this.messages.concat(response.messages);
    }
    this.spectateTimeOut = setTimeout(() => this.doSpectateUpDate(), 1000);
  }
  handleSpectateError(response) {
    this.showOverlay = false;
    if (typeof response.error == "string") {
      this.error = response.error;
    } else {
      this.error = "something went wrong...";
    }
    this.spectateTimeOut = setTimeout(() => this.doSpectateUpDate(), 1000);
  }
  sendRequest(endpoint, body) {
    this.http.post(this.url + endpoint, body).subscribe(
      response => {
        this.handleResponse(response);
      },
      err => {
        this.handleError(err);
      }
    );
  }
  newGame(name) {
    this.showOverlay = true;
    this.sendRequest("newGame", {
      name: name
    });
  }
  joinGame(data) {
    this.showOverlay = true;
    this.sendRequest("joinGame", data);
  }
  spectate(data) {
    this.isSpectating = true;
    this.showOverlay = true;
    this.http.post(this.url + "spectate", data).subscribe(
      response => {
        this.handleSpectateResponse(response);
      },
      err => {
        this.handleSpectateError(err);
      }
    );
  }
  rejoinGame(data) {
    this.showOverlay = true;
    this.sendRequest("rejoinGame", data);
  }

  shouldUpdate() {
    if (!this.context) {
      return false;
    }
    if (this.isPickingPrizes() || this.isMyTurn() || this.isGameOver()) {
      return false;
    }
    return true;
  }
  baseData() {
    return {
      name: this.context.player.name,
      gameId: this.context.game.id,
      playerId: this.context.player.id
    };
  }
  spectateData() {
    return {
      name: this.context.spectator.name,
      gameId: this.context.game.id,
      spectateId: this.context.spectator.id
    };
  }
  setDealer(newDealerId) {
    this.showOverlay = true;
    var data = this.baseData();
    data.newDealerId = newDealerId;
    this.sendRequest("setDealer", data);
  }
  startGame(decks, jokers) {
    clearTimeout(this.timeOut);
    this.showOverlay = true;
    var data = this.baseData();
    data.decks = decks;
    data.jokers = jokers;
    this.sendRequest("startGame", data);
  }
  setPrizeCards(cardIds) {
    this.cardsAction(cardIds, "setPrizeCards");
  }
  playCards(cardIds) {
    this.cardsAction(cardIds, "playCards");
  }
  playPrizeCards(cardIds) {
    this.cardsAction(cardIds, "playPrizeCards");
  }
  cardsAction(cardIds, endpoint) {
    this.showOverlay = true;
    var data = this.baseData();
    data.cardIds = cardIds;
    this.sendRequest(endpoint, data);
  }
  takePile() {
    this.showOverlay = true;
    this.sendRequest("takePile", this.baseData());
  }
  chooseVictim(victimId) {
    this.showOverlay = true;
    var data = this.baseData();
    data.victimId = victimId;
    this.sendRequest("chooseVictim", data);
  }
  revealBlindCard(blindCardPos) {
    this.showOverlay = true;
    var data = this.baseData();
    data.blindCardPos = blindCardPos;
    this.sendRequest("revealBlindCard", data);
  }
  includes(container, value) {
    var returnValue = false;
    var pos = container.indexOf(value);
    if (pos >= 0) {
      returnValue = true;
    }
    return returnValue;
  }
  copyText(val: string) {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }
}
