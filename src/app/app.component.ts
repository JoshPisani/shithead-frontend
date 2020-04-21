import { Component, OnInit } from "@angular/core";
import { GameService } from "./game.service";
import { Meta } from "@angular/platform-browser";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private gameService: GameService, private meta: Meta) {
    this.meta.addTag({
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    });
  }
  ngOnInit() {}
  rejoinCode() {
    this.gameService.copyText(this.gameService.rejoinCode);
    this.gameService.rejoinCode = "";
  }
}
