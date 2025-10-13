//Scoreboard
import {
  savePlayerName,
  loadPlayerName,
  saveScore,
  loadScore
} from './storage.js';

// --- DIAGNOSTICS (top of scripts/script.js) ---
console.log('[script.js] loaded');
console.log('[script.js] jQuery version:', typeof jQuery !== 'undefined' ? jQuery.fn.jquery : 'MISSING');
console.log('[script.js] jQuery UI present?', typeof $.fn.draggable === 'function' ? 'yes' : 'NO');
console.log('[script.js] DOM ready state:', document.readyState);
// ---------------------------------------------


//update score
let score = 0;

function updateScore(delta = 1) {
  score += delta;
  $('#score-count').text(`${score} / 4`);
  saveScore(score);
}

// Basket & Berry Array
const items = [
  { id: 'straw-grid', label: 'Strawberry', src: 'images/strawberry.jpg'},
  { id: 'black-grid', label: 'Blackberry', src: 'images/blackberry.jpg'},
  { id: 'blue-grid',  label: 'Blueberry',  src: 'images/blueberry.jpg'},
  { id: 'goose-grid', label: 'Gooseberry', src: 'images/gooseberry.jpg'},
];

// Reset & REmove items from game board
function renderBerries(list) {
  const $grid = $('.berry-grid').empty(); // clear any existing children
  list.forEach(it => {
    $grid.append(`<div id="${it.id}" class="drag">${it.label}</div>`);
  });
}

// Randomize & Shuffle Berries
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Re=shuffles & Rebuilds
function newRound() {
  // Build a randomized set of berries, then (re)bind draggable
  const roundItems = shuffle([...items]);
  renderBerries(roundItems);
  $('.drag').draggable();
}

// Player name & score
$(function () {
  const existingName = loadPlayerName();
  if (existingName) {
    $('#name').text(existingName);
    $('#playerName, #player-name').val(existingName);
  }

  // Checks for saved score
  const prevScore = loadScore();
  if (!isNaN(prevScore)) {
    score = prevScore;
    $('#score-count').text(`${prevScore} / 4`);
  } else {
    $('#score-count').text('0 / 4');
  }

  // Settings form
  $('#settingsForm, #setting-form').on('submit', function (e) {
    e.preventDefault();
    const name = ($('#playerName').val() || $('#player-name').val() || '').trim();
    if (name) {
      savePlayerName(name);
      $('#name').text(name);
    }
  });

  // reset/new round
  newRound();

  // Drop & Drag
  $('.drop').droppable({
    accept: function (drag) {
      const basketId = this.id;
      const berryId  = $(drag).attr('id');
      return (
        (berryId === 'straw-grid' && basketId === 'straw-basket') ||
        (berryId === 'black-grid' && basketId === 'black-basket') ||
        (berryId === 'blue-grid'  && basketId === 'blue-basket')  ||
        (berryId === 'goose-grid' && basketId === 'goose-basket')
      );
    },

    // successfull match = green
    drop: function (_event, ui) {
      $(this).css('background', 'green');

      ui.draggable
        .draggable('disable')
        .fadeOut(150, function()
        { 
          $(this).remove(); 
        });
        
      updateScore(1);
    }
  });

  // Play/Reset button
  $('#reset-btn').on('click', function () {
    score = 0;
    $('#score-count').text('0 / 4');
    saveScore(0);
    $('.drop').css('background', 'beige');

    newRound();
  });

  // Easter egg *work on this
  console.info('I am unoriginal');
  window.game = {
    rickRoll() {
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    }
  };
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
