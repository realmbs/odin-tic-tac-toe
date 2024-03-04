var cells = document.querySelectorAll('.cell');
var board = document.querySelector('.container');
cells.forEach(function (cell) {
    cell.addEventListener('click', function () {
        cell.classList.toggle('active');
    });
});
