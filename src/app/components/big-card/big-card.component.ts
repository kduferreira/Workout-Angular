import { Component, ElementRef, OnDestroy, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider";
import { dataFake } from 'src/app/data/dataFake';
@Component({
  selector: 'app-big-card',
  templateUrl: './big-card.component.html',
  styleUrls: [
    "../../../../node_modules/keen-slider/keen-slider.min.css","./big-card.component.css",
  ],

})
export class BigCardComponent implements OnDestroy {
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>;

  slider: KeenSliderInstance | null = null;
  @Input() photoCover: string = '';
  @Input() contentTitle: string = '';
  @Input() contentDescription: string = '';
  @Input() activeSlideIndex: number = 0; // Adicionado para controlar o índice ativo

  slideContent = dataFake;
  private id: string | null = '0';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // Aqui você pode reagir a mudanças nas entradas do componente, se necessário.
    // Por exemplo, você pode chamar a função updateContent aqui.
    if (changes['photoCover'] || changes['contentTitle'] || changes['contentDescription']) {
      this.updateContent(0); // Você pode ajustar o índice conforme necessário.
    }
  }

  ngOnDestroy(): void {
    if (this.slider) this.slider.destroy();
  }

  ngAfterViewInit(): void {
    this.slider = new KeenSlider(
      this.sliderRef.nativeElement,
      {
        loop: true,
      },
      [
        (slider: KeenSliderInstance) => {
          let timeout: number | null = null;
          let mouseOver = false;

          function clearNextTimeout() {
            clearTimeout(timeout!);
          }

          function nextTimeout() {
            clearTimeout(timeout!);
            if (mouseOver) return;
            timeout = setTimeout(() => {
              slider.next();
            }, 5000) as any;
          }

          slider.on("created", () => {
            slider.container.addEventListener("mouseover", () => {
              mouseOver = true;
              clearNextTimeout();
            });

            slider.container.addEventListener("mouseout", () => {
              mouseOver = false;
              nextTimeout();
            });

            nextTimeout();
          });

          slider.on("dragStarted", clearNextTimeout);
          slider.on("animationEnded", nextTimeout);
          slider.on("updated", nextTimeout);
        },
      ]
    );
  }

  updateContent(activeIndex: number): void {
    const activeSlide = this.slideContent[activeIndex];

    // Obtenha referências aos elementos usando @ViewChild
    const imgElement = this.sliderRef.nativeElement.querySelector('.overlay img') as HTMLImageElement;
    const h1Element = this.sliderRef.nativeElement.querySelector('.overlay h1');
    const pElement = this.sliderRef.nativeElement.querySelector('.overlay p');

    if (imgElement && h1Element && pElement && activeSlide) {
      imgElement.src = activeSlide.photoCover || ''; // Use uma string vazia como fallback
      h1Element.textContent = activeSlide.contentTitle || '';
      pElement.textContent = activeSlide.contentDescription || '';
    }
  }

}
