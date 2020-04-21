import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { GameService } from "./game.service";
import { HttpClientModule } from "@angular/common/http";
import { GameComponent } from "./game/game.component";
import { CreatingComponent } from "./creating/creating.component";
import { SetUpComponent } from "./set-up/set-up.component";
import { CardRenderComponent } from "./card-render/card-render.component";
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayAreaComponent } from './play-area/play-area.component';
import { MyCardsComponent } from './my-cards/my-cards.component';
import { ChooseVictimComponent } from './choose-victim/choose-victim.component';
import { MessagesComponent } from './messages/messages.component';
import { MenuComponent } from './menu/menu.component';
import { SpectateComponent } from './spectate/spectate.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    GameComponent,
    CreatingComponent,
    SetUpComponent,
    CardRenderComponent,
    PlayerListComponent,
    PlayAreaComponent,
    MyCardsComponent,
    ChooseVictimComponent,
    MessagesComponent,
    MenuComponent,
    SpectateComponent
  ],
  bootstrap: [AppComponent],
  providers: [GameService]
})
export class AppModule {}
