import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-card-time-video',
  templateUrl: './small-card-time-video.component.html',
  styleUrls: ['./small-card-time-video.component.css']
})
export class SmallCardTimeVideoComponent {

@Input()
  time: string = ''
}
