import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Input } from "@angular/core";

@Component({
  selector: "app-creating",
  templateUrl: "./creating.component.html",
  styleUrls: ["./creating.component.css"]
})
export class CreatingComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {
    this.creationForm = this.formBuilder.group({
      decks: 1,
      jokers: 2
    });
  }
  @Input() gameService;
  creationForm;

  ngOnInit() {}

  onSubmit() {
    this.gameService.startGame(
      this.creationForm.value.decks,
      this.creationForm.value.jokers
    );
  }
  setDealer(newDealerId) {
    this.gameService.setDealer(newDealerId);
  }
}
