const cells = document.querySelectorAll('.cell');
const board = document.querySelector('.container');

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    cell.classList.toggle('active');
  });
});

