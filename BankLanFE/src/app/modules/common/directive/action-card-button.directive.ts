import { Directive, AfterViewInit, Input, OnChanges } from '@angular/core';
declare var $: any;
@Directive({
  selector: '[appActionCardButton]'
})
export class ActionCardButtonDirective implements AfterViewInit, OnChanges {
  @Input() appActionCardButton: string;
  constructor() {

  }
  ngAfterViewInit() {
    this.register();

  }

  ngOnChanges() {
    this.register();
  }

  register() {
    // Match the height of each card in a row
    setTimeout(function () {
      $('.row.match-height').each(function () {
        $(this).find('.card').not('.card .card').matchHeight(); // Not .card .card prevents collapsible cards from taking height
      });
    }, 500);

    $('.card .heading-elements a[data-action="collapse"]')
      .off('click')
      .on('click', function () {
        var $this = $(this),
          card = $this.closest('.card');
        var cardHeight;

        if (parseInt(card[0].style.height, 10) > 0) {
          cardHeight = card.css('height');
          card.css('height', '').attr('data-height', cardHeight);
        }
        else {
          if (card.data('height')) {
            cardHeight = card.data('height');
            card.css('height', cardHeight).attr('data-height', '');
          }
        }
      });
    //card heading actions buttons small screen support
    $(".heading-elements-toggle")
      .off('click')
      .on("click", function () {
        if (!$(this).parent().children(".heading-elements").hasClass("visible")) {
          $(this).parent().children(".heading-elements").addClass("visible")
        }
        else {
          $(this).parent().children(".heading-elements").removeClass("visible")
        }
      });


    // Collapsible Card
    $('a[data-action="collapse"]')
      .off('click')
      .on('click', function (e) {
        e.preventDefault();
        $(this).closest('.card').children('.card-content').collapse('toggle');
        $(this).closest('.card').find('[data-action="collapse"] i').toggleClass('ft-plus ft-minus');

      });

    // Toggle fullscreen
    $('a[data-action="expand"]')
      .off('click')
      .on('click', function (e) {
        e.preventDefault();
        $(this).closest('.card').find('[data-action="expand"] i').toggleClass('ft-maximize ft-minimize');
        $(this).closest('.card').toggleClass('card-fullscreen');
      });

    // Close Card
    $('a[data-action="close"]')
      .off('click')
      .on('click', function () {
        $(this).closest('.card').removeClass().slideUp('fast');
      });
  }

}
