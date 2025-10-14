//Scoreboard
import {
  savePlayerName,
  loadPlayerName,
  saveScore,
  loadScore
} from './storage.js';

//update score
let score = 0;

function updateScore(delta = 1) {
  score += delta;
  $('#score-count').text(`${score} / 4`);
  saveScore(score);
}

// Basket & Berry Array
const items = [
  { id: 'straw-grid', label: 'Strawberry'},
  { id: 'black-grid', label: 'Blackberry'},
  { id: 'blue-grid',  label: 'Blueberry'},
  { id: 'goose-grid', label: 'Gooseberry'},
];

// Reset & REmove items from game board
function renderBerries(list) {
  const $grid = $('.berry-grid').empty();
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

// Re-shuffles & Rebuilds
function newRound() {
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

  console.log('Current Player: ', loadPlayerName());

  // Stops refresh
  $('#setting-form').on('submit', function (e) {
  e.preventDefault();

  // Check if form is valid
  if (!this.reportValidity()) return; 

  // Save and update playername
  const name = $('#player-name').val().trim();
  savePlayerName(name);
  $('#name').text(name);
  console.log('Saved name:', name);
});


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
  console.info("Type game.theme() for an easter egg");
  window.game = {};
  window.game.theme = function() {
    document.body.classList.toggle("theme");
  };
});
