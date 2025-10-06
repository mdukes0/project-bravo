$(function() {
  $('.drag').draggable();

  $(".drop").droppable({
    drop: function (event, ui) {
      const draggedGrid = ui.draggable.attr('id');
      alert(draggedGrid);
      console.log($(this).attr("class"));
    }
  });
});
