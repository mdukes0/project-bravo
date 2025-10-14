// Set Cookie
export function setCookie(name, value, days = 365) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
}

// Get Cookie
export function getCookie(name) {
  const decoded = decodeURIComponent(document.cookie);
  const cookies = decoded.split(';');
  for (let c of cookies) {
    c = c.trim();
    if (c.startsWith(name + '=')) {
      return c.substring(name.length + 1);
    }
  }
  return null;
}

// Set player name
export function savePlayerName(name) {
  setCookie('playerName', name);
}

// Return player name
export function loadPlayerName() {
  return getCookie('playerName');
}

// Set score
export function saveScore(score) {
  setCookie('playerScore', score);
}

// Return score
export function loadScore() {
  return parseInt(getCookie('playerScore')) || 0;
}
