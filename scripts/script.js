$(function() {
  $('.drag').draggable();

  $(".drop").droppable({
    drop: function (event, ui) {
      // const draggedGrid = ui.draggable.attr('id');
      // alert(draggedGrid);
      // console.log($(this).attr("class"));

      // $( this )
      //     .addClass( "droppable" )
      //     .html( "Dropped!" );

      $('#straw-grid').draggable({
        revert: function() {
          if ($(this).hasId('#straw-basket')) {
            $('#straw-basket').setAttribute("style", "background: green"); 
            // return true; //return cell light up into green
          } else if {
            $(this).draggable({revert: invalid});
          }//then just say if else revert: 'invalid'
      }
      });
      
    }
  });

//   if ($("#straw-grid").val() != '') {
//     $(".draggable").draggable({revert: invalid});
// }
// else if($("#seats").val() < 99999) {
//     alert("Not a valid Number");
// } else {
//     setflag = true;
// }

//https://stackoverflow.com/questions/3088485/how-to-revert-position-of-a-jquery-ui-draggable-based-on-condition
//https://stackoverflow.com/questions/4520042/if-else-else-if-in-jquery-for-a-condition
});
