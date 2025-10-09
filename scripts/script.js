
$(function () {
  $('.drag').draggable();

  $('.drop').droppable({

    drop: function (event, ui) {
      const basketId = this.id;
      const berryId = ui.draggable.attr('id');

      if(
        (berryId === 'straw-grid' && basketId === 'straw-basket') ||
        (berryId === 'black-grid' && basketId === 'black-basket') ||
        (berryId === 'blue-grid' && basketId === 'blue-basket') ||
        (berryId === 'goose-grid' && basketId === 'goose-basket') 
      ) {

        console.log('Correct berry placement');
        alert('correct');


        $(this).css('background', 'green');

        ui.draggable.appendTo(this).css({
          position: 'relative', top: 0, left: 0
        }).draggable('disable');
      } else {
        console.log('Incorrect berry placement');
        alert('Incorrect');
      }
    }
  });
});
// $(function () {
//   // Drag and revert back to position
//   $('.drag').draggable({
//     revert: function() {
//       return !$(this).data('correct');
//     }, // had to fix because other line only reverted
//     //   return !$(this).data('correct');
//     // },
//     // start: function () {
//     //   $(this).data('correct', false);
//     start: function () {
//       $(this).data('correct', false);
//     }
//   });

//   // Hardcoded targets for each berry
//   $('.drop').droppable({
//     drop: function(event, ui) {
//       const basketId = $(this).attr('id');
//       const berryId = ui.draggable.attr('id');

//   // Hardcoded to ensure that conditions react to specifc placements
//   let placedIn = false;
//   if(berryId === 'straw-grid' && basketId === 'straw-basket') placedIn = true;
//   if (berryId === 'black-grid' && basketId === 'black-basket') placedIn = true;
//   if (berryId === 'blue-grid' && basketId === 'blue-basket') placedIn = true;
//   if (berryId === 'goose-grid' && basketId === 'goose-basket') placedIn = true;

//   if (placedIn) {
//     $(this).css('background', 'green');
//     ui.draggable.data('correct', true);
//     ui.draggable.draggable('disable');
//   }
// }
  
//   });
// });


  // $('.drag').draggable();

  // $(".drop").droppable({
  //   drop: function (event, ui) {
  //     // const draggedGrid = ui.draggable.attr('id');
  //     // alert(draggedGrid);
  //     // console.log($(this).attr("class"));

  //     $('#straw-grid').draggable({
  //       revert: function () {
  //         if (!$(this).data('correct')) {
  //           return true;
  //         }
  //       },
  //       start: function () {
  //         $(this).data('correct', false);
  //       }
  //     });



  //   }
  // });

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
