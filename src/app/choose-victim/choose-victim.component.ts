import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-choose-victim",
  templateUrl: "./choose-victim.component.html",
  styleUrls: ["./choose-victim.component.css"]
})
export class ChooseVictimComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {
    this.victimForm = this.formBuilder.group({
      victimId: "x"
    });
  }
  @Input() gameService;
  victimForm;

  ngOnInit() {}

  options() {
    return this.gameService.context.game.players.filter(
      p => p.id != this.gameService.context.player.id
    );
  }

  showButton() {
    return this.victimForm.value.victimId != "x";
  }
  buttonText() {
    return "Fuck you " + this.victim().name;
  }
  victim() {
    if (this.victimForm.value.victimId != "x") {
      return this.gameService.context.game.players.find(
        p => p.id == this.victimForm.value.victimId
      );
    }
  }

  onSubmit() {
    this.gameService.chooseVictim(
      this.victimForm.value.victimId
    );
  }
}
