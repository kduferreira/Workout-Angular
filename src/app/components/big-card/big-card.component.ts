import { Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"

@Component({
  selector: 'app-big-card',
  templateUrl: './big-card.component.html',
  styleUrls: [
    "../../../../node_modules/keen-slider/keen-slider.min.css","./big-card.component.css",
  ],

})
export class BigCardComponent implements OnDestroy {
@ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>

 slider: KeenSliderInstance | null   = null;


 slideContent = [
  {
    title: "Cardio Exercise",
    description: "Cardio Exercise é uma forma dinâmica de atividade física...",
    image: "../../assets/background.png"
  },
  {
    title: "Desperte sua Força Interior: Musculação Feita para Elas",
    description: "Descubra o poder da musculação projetada especialmente para mulheres. Este é o seu convite para fortalecer corpo e mente, esculpir uma versão mais resistente e confiante de si mesma. Conquiste a força, a graça e a determinação que existem dentro de você através de um programa de musculação adaptado ao seu estilo e metas. Seja a inspiração que você busca. Transforme seu corpo, energize sua vida!",
    image: "../../assets/background1.png"
  },
  {
    title: "Forja de Titans",
    description: "Desenvolva força, resistência e defina seus músculos com nossos treinos de musculação exclusivos para homens. Projetados para atender aos objetivos masculinos de condicionamento físico, nossos exercícios oferecem resultados notáveis. Transforme seu corpo, alcance seus objetivos e sinta-se no auge da forma física.",
    image: "../../assets/background2.png"
  },
  // Adicione mais conforme necessário
];
 constructor() {}


 ngOnDestroy(): void {
  if (this.slider) this.slider.destroy
 }
 ngAfterViewInit() {
  this.slider = new KeenSlider(
    this.sliderRef.nativeElement,
    {
      loop: true,
    },
    [
      (slider: KeenSliderInstance) => { // Alterado para KeenSliderInstance
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

private updateContent(index: number): void {
  // Lógica para atualizar o título e a descrição com base no índice
  // Aqui você pode ter um array de títulos e descrições correspondentes aos slides
  const titles = ["Title 1", "Title 2"];
  const descriptions = ["Description 1", "Description 2"];

  const titleElement = document.querySelector('.overlay h1');
  const descriptionElement = document.querySelector('.overlay p');

  if (titleElement && descriptionElement) {
    titleElement.textContent = titles[index];
    descriptionElement.textContent = descriptions[index];
  }
}
}
