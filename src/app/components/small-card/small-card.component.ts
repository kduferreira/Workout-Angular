import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { smallcardDataFake } from 'src/app/data/smallcardDataFake';

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

   @Input() photo: string = '';
   @Input() title: string = '';
   @Input() description: string = '';
   @Input() activeSlideIndex: number = 0;// Adicionado para controlar o índice ativo
slideContent = smallcardDataFake;
private id: string | null = '0';
exercises: any;

  constructor() {}

  ngOnDestroy(): void {
    if (this.slider) this.slider.destroy();
  }


  ngOnChanges(changes: SimpleChanges): void {
     // Aqui você pode reagir a mudanças nas entradas do componente, se necessário.
    // Por exemplo, você pode chamar a função updateContent aqui.
    if (changes['photo'] || changes['title'] || changes['description']) {
      this.updateContent(0); // Você pode ajustar o índice conforme necessário.
    }
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

  updateContent(activeIndex: number): void {
    const activeSlide = this.slideContent[activeIndex];

    const imgElement = this.sliderRef.nativeElement.querySelector('img') as HTMLImageElement;
    const h3Element = this.sliderRef.nativeElement.querySelector('h3');
    const pElement = this.sliderRef.nativeElement.querySelector('p');

    if (imgElement && h3Element && pElement && activeSlide) {
      imgElement.src = activeSlide.photo || '';
      h3Element.textContent = activeSlide.title || '';
      pElement.textContent = activeSlide.description || '';
    }
  }
}
