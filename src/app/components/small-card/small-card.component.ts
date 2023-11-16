import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ["../../../../node_modules/keen-slider/keen-slider.min.css",
  './small-card.component.css'
]
})
export class SmallCardComponent implements OnDestroy, AfterViewInit {
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>;

  slider: KeenSliderInstance | null = null;

  constructor() {}

  ngOnDestroy(): void {
    if (this.slider) this.slider.destroy();
  }

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      breakpoints: {
        "(min-width: 100px)": {
          slides: { perView: 3, spacing: 10 },
        },
        "(min-width: 400px)": {
          slides: { perView: 5.5, spacing: 40 },
        },
      },
      slides: { perView: 1 },
    })
  }
}
