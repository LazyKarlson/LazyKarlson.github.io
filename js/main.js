$(init);

function init() {

  $('#cardPilot').html('');
  $('#cardSlots').html('');
  for (var i = 1; i < 13; i++) {
    $('#' + i).html('');
  }


  var pilots = [
    'Ферстаппен',
    'Перес',
    'Леклер',
    'Сайнс',
    'Хэмилтон',
    'Расселл',
    'Окон',
    'Гасли',
    'Пиастри',
    'Норрис',
    'Боттас',
    'Чжоу',
    'Алонсо',
    'Стролл',
    'Магнуссен',
    'Хюлкенберг',
    'Де Вриз',
    'Цунода',
    'Сарджент',
    'Албон'];


  for (var i = 0; i < 20; i++) {
    $('<div>' + pilots[i] + '</div>').data('number', pilots[i]).attr('id', 'card' + pilots[i]).appendTo('#cardPilot').draggable({
      containment: '#content',
      stack: '#cardPilot div',
      cursor: 'move',
      revert: true
    });
  }

  var place = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Квалификация', 'Лучший круг'];
  for (var i = 1; i <= 12; i++) {
    $('<div>' + place[i - 1] + '</div>').data('number', i).appendTo('#cardSlots').droppable({
      accept: '#cardPilot div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    });
  }

}
function handleCardDrop(event, ui) {

  var slotNumber = $(this).data('number');
  var cardNumber = ui.draggable.data('number');
  if (slotNumber == 11) {
    $("#" + slotNumber).html("К " + cardNumber + "<br>");
  }
  else if (slotNumber == 12) {
    $("#" + slotNumber).html("ЛК " + cardNumber + "<br>");
  }
  else {
    $("#" + slotNumber).html(cardNumber + "<br>");
    for (let i = 1; i < 11; i++) {
      if (i != slotNumber && $("#" + slotNumber).html() == $("#" + i).html()) {
        new Notify({
          status: 'warning',
          title: 'Внимание!',
          text: 'Повтор имени пилота в прогнозе!',
          effect: 'fade',
          speed: 300,
          customClass: '',
          customIcon: '',
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 3000,
          gap: 5,
          distance: 5,
          type: 2,
          position: 'top x-center'
        })
      }
    }
  }
  ui.draggable.position({ of: $(this), my: 'left top', at: 'left top' });
  ui.draggable.draggable('option', 'revert', false);
  if (!ui.draggable.find('.remove').length) {
    ui.draggable.append($('<button type="button" class="btn btn-default btn-xs remove"><i class="fa fa-trash" aria-hidden="true"></i></button>').click({ param1: slotNumber }, goBack));
  }
}

function goBack(event) {
  var name = $("#" + event.data.param1).html();
  if (event.data.param1 == 11) {
    name = name.substring(2);
  } else if (event.data.param1 == 12) {
    name = name.substring(3);
  }
  for (let i = 1; i < 13; i++) {
    if (($("#" + i).html() == name) || ($("#" + i).html() == "К " + name) || ($("#" + i).html() == "ЛК " + name)) {
      $("#" + i).empty();
    }
  }
  $("#" + event.data.param1).empty();
  $(this).parent().removeAttr("style");
  $(this).parent().css("position", "relative");
  $(this).remove();
}

document.addEventListener('DOMContentLoaded', () => {
  var date = new Date('4/28/2023 13:00:00 UTC');
  var countTo = date.getTime() / 1000;

  // Set up FlipDown
  var flipdown = new FlipDown(countTo, {
    theme: "light",
  }).start();

});
