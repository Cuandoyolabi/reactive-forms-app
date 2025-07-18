import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { SideMenuComponent } from "../../../shared/components/side-menu/side-menu.component";

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent { }
