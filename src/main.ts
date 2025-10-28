import './style.css'

// Card ranks
const cardRanks = [
  'Ace', '2', '3', '4', '5', '6', '7',
  '8', '9', '10', 'Jack', 'Queen', 'King'
] as const;

type CountsArray = number[];

// Load counts from localStorage, or default to 0
function loadCounts(): CountsArray {
  const saved = localStorage.getItem('cardCounts');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // If the number of ranks changes, fallback to zeros
      if (Array.isArray(parsed) && parsed.length === cardRanks.length) return parsed as CountsArray;
    } catch {
      // ignore
    }
  }
  return Array(cardRanks.length).fill(0);
}

// Save counts to localStorage
function saveCounts(): void {
  localStorage.setItem('cardCounts', JSON.stringify(counts));
}

let counts: CountsArray = loadCounts();

const cardList = document.getElementById('card-list') as HTMLElement;
if (!cardList) throw new Error("Missing #card-list element");

// Render UI
function render(): void {
  cardList.innerHTML = '';
  counts.forEach((count, idx) => {
    const rank = cardRanks[idx];
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between bg-white rounded-lg shadow p-0.5';
    row.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-blue-600 font-bold text-lg w-12">${rank}</span>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <button class="decr px-3 py-1 bg-red-200 rounded font-bold disabled:opacity-40" ${count===0?'disabled':''} data-idx="${idx}">-</button>
        <span class="min-w-[2.5rem] text-center font-semibold">${count}</span>
        <button class="incr px-3 py-1 bg-green-200 rounded font-bold mr-10" data-idx="${idx}">+</button>
        <button class="reset px-2 py-1 bg-yellow-200 rounded text-xs font-medium" data-idx="${idx}">Reset</button>
      </div>
    `;
    cardList.appendChild(row);
  });
  const total = Array.isArray(counts[0]) // 2D?
    ? counts.flat().reduce((a, b) => a + b, 0)
    : counts.reduce((a, b) => a + b, 0);

  const totalRow = document.createElement('div');
  totalRow.className = 'flex items-center justify-between bg-blue-100 rounded-lg shadow p-3 font-bold text-blue-700 mt-2';
  totalRow.innerHTML = `
    <span class="text-lg">Total Cards</span>
    <span class="text-lg">${total}</span>
  `;
  cardList.appendChild(totalRow)
}

// Click handling (event delegation)
cardList.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const idxAttr = target.dataset?.idx;
  if (typeof idxAttr === 'undefined') return;
  const idx = parseInt(idxAttr, 10);
  if (Number.isNaN(idx)) return;

  if (target.classList.contains('incr')) {
    counts[idx]++;
    saveCounts();
    render();
  } else if (target.classList.contains('decr')) {
    if (counts[idx] > 0) {
      counts[idx]--;
      saveCounts();
      render();
    }
  } else if (target.classList.contains('reset')) {
    counts[idx] = 0;
    saveCounts();
    render();
  }
});

const resetAllBtn = document.getElementById('reset-all');
if (!resetAllBtn) throw new Error("Missing #reset-all element");
resetAllBtn.addEventListener('click', () => {
  counts = Array(cardRanks.length).fill(0);
  saveCounts();
  render();
});

render();
