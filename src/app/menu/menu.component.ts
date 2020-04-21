import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {
    this.startForm = this.formBuilder.group({
      name: ["", Validators.required],
      gameId: "",
      rejoinCode: ""
    });
  }
  @Input() gameService;

  startForm;
  title = "Shit Head Beta";
  option = "newGame";
  ngOnInit() {}

  buttonText() {
    switch (this.option) {
      case "newGame":
        return "New Game";
      case "joinGame":
        return "Join Game";
      case "spectate":
        return "Spectate";
      case "rejoinGame":
        return "Rejoin Game";
    }
  }

  onSubmit() {
    switch (this.option) {
      case "newGame":
        this.newGame();
        return;
      case "joinGame":
        this.joinGame();
        return;
      case "spectate":
        this.spectate();
        return;
      case "rejoinGame":
        this.rejoinGame();
        return;
    }
  }
  validateName() {
    if (this.startForm.value.name == "") {
      this.gameService.error = "Enter name";
      return false;
    } else if (this.startForm.value.name.length > 25) {
      this.gameService.error = "Name too long";
      return false;
    } else {
      return true;
    }
  }
  validateGameId() {
    if (this.startForm.value.gameId === "") {
      this.gameService.error = "Enter game id";
      return false;
    } else if (this.startForm.value.gameId < 0) {
      this.gameService.error = "Invalid game id";
      return false;
    } else {
      return true;
    }
  }
  validateRejoinCode() {
    if (this.startForm.value.rejoinCode ==="") {
      this.gameService.error = "Enter rejoin code";
      return false;
    } else if (this.startForm.value.rejoinCode < 0) {
      this.gameService.error = "Invalid rejoin code";
      return false;
    } else {
      return true;
    }
  }
  newGame() {
    if (this.validateName()) {
      this.gameService.newGame(this.startForm.value.name);
    }
  }
  joinGame() {
    if (this.validateName() && this.validateGameId()) {
      this.gameService.joinGame({
        name: this.startForm.value.name,
        gameId: this.startForm.value.gameId
      });
    }
  }
  spectate() {
    if (this.validateName() && this.validateGameId()) {
      this.gameService.spectate({
        name: this.startForm.value.name,
        gameId: this.startForm.value.gameId
      });
    }
  }
  rejoinGame() {
    if (this.validateGameId()) {
      this.gameService.rejoinGame({
        rejoinCode: this.startForm.value.rejoinCode,
        gameId: this.startForm.value.gameId
      });
    }
  }
}
