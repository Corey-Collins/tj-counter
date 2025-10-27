import './style.css'

// Card ranks
const cardRanks = [
  'Ace', '2', '3', '4', '5', '6', '7',
  '8', '9', '10', 'Jack', 'Queen', 'King'
];

// Load counts from localStorage, or default to 0
function loadCounts() {
  const saved = localStorage.getItem('cardCounts');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // If the number of ranks changes, fallback to zeros
      if (Array.isArray(parsed) && parsed.length === cardRanks.length) return parsed;
    } catch { /* ignore */ }
  }
  return Array(cardRanks.length).fill(0);
}
// Save counts to localStorage
function saveCounts() {
  localStorage.setItem('cardCounts', JSON.stringify(counts));
}

let counts = loadCounts();

const cardList = document.getElementById('card-list');

function render() {
  cardList.innerHTML = '';
  counts.forEach((count, idx) => {
    const rank = cardRanks[idx];
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between bg-white rounded-lg shadow p-3';
    row.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-blue-600 font-bold text-lg w-12">${rank}</span>
      </div>
      <div class="flex items-center gap-2">
        <button class="decr px-3 py-1 bg-red-200 rounded text-xl font-bold disabled:opacity-40" ${count===0?'disabled':''} data-idx="${idx}">-</button>
        <span class="min-w-[2.5rem] text-center font-semibold text-lg">${count}</span>
        <button class="incr px-3 py-1 bg-green-200 rounded text-xl font-bold" data-idx="${idx}">+</button>
        <button class="reset px-2 py-1 bg-yellow-200 rounded text-xs font-medium" data-idx="${idx}">Reset</button>
      </div>
    `;
    cardList.appendChild(row);
  });
}

// Click handling (event delegation)
cardList.addEventListener('click', (e) => {
  const idx = parseInt(e.target.dataset.idx);
  if (e.target.classList.contains('incr')) {
    counts[idx]++;
    saveCounts();
    render();
  } else if (e.target.classList.contains('decr')) {
    if (counts[idx] > 0) {
      counts[idx]--;
      saveCounts();
      render();
    }
  } else if (e.target.classList.contains('reset')) {
    counts[idx] = 0;
    saveCounts();
    render();
  }
});

document.getElementById('reset-all').addEventListener('click', () => {
  counts = Array(cardRanks.length).fill(0);
  saveCounts();
  render();
});

render();
