import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";

@Component({
  selector: "app-spectate",
  templateUrl: "./spectate.component.html",
  styleUrls: ["./spectate.component.css"]
})
export class SpectateComponent implements OnInit {
  constructor() {}
  @Input() gameService;

  ngOnInit() {}
}
