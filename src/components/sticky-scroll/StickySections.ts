export class StickySections {
  container: {
    el: HTMLDivElement;
    height: number;
    top: number;
    bottom: number;
  };
  sectionEl: HTMLDivElement;
  sections: HTMLElement[];
  viewportTop: number;
  activeIndex: number;
  scrollValue: number;

  constructor(
    containerElement: HTMLDivElement,
    sectionElement: HTMLDivElement
  ) {
    this.container = {
      el: containerElement,
      height: 0,
      top: 0,
      bottom: 0,
    };
    this.sectionEl = sectionElement;
    this.sections = Array.from(this.sectionEl.querySelectorAll('section'));
    this.viewportTop = 0;
    this.activeIndex = 0;
    this.scrollValue = 0;
    this.handleSections = this.handleSections.bind(this);
    this.init();
  }

  handleSections(): void {
    const containerRect = this.container.el.getBoundingClientRect();
    const sectionRect = this.sectionEl.getBoundingClientRect();

    const relativeScroll =
      -sectionRect.top / (sectionRect.height - window.innerHeight);

    const sectionIndex = Math.floor(relativeScroll * this.sections.length);
    this.activeIndex = Math.max(
      0,
      Math.min(sectionIndex, this.sections.length - 1)
    );

    // Update section visibility
    this.sections.forEach((section, i) => {
      const isActive = i === this.activeIndex;
      const visibility = isActive ? '1' : '0';
      const scale = isActive ? '1' : '0.8';

      section.style.setProperty('--stick-visibility', visibility);
      section.style.setProperty('--stick-scale', scale);
    });
  }

  init(): void {
    const totalHeight = this.sections.length * 100;
    this.sectionEl.style.setProperty('--stick-items', `${totalHeight}vh`);

    this.handleSections();
  }
}
