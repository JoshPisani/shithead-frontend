import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"]
})
export class MessagesComponent implements OnInit {
  constructor() {}
  @Input() gameService;

  ngOnInit() {}

  messages() {
    var msgs = this.gameService.messages;
    return msgs.reverse();
  }
}
