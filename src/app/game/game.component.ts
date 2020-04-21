import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";

@Component({
  selector: "game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit {
  constructor() {}
  @Input() gameService;

  ngOnInit() {}
}
