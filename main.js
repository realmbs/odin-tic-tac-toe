var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var app = document.getElementById('app');
var startButton = document.getElementById('startButton');
var resetButton = document.getElementById('resetButton');
var cells = __spreadArray([], document.querySelectorAll('.cell'), true);
var Gameboard = /** @class */ (function () {
    function Gameboard() {
        this.cells = Array(9).fill('');
        this.isCurrentPlayer = true;
        this.isWinner = false;
        this.isGameOver = false;
        this.isComputer = false;
    }
    Gameboard.prototype.renderGameboard = function () {
        var gameboard = document.createElement('div');
        gameboard.id = 'gameboard';
        for (var i = 0; i < 9; i++) {
            var cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = "cell-".concat(i);
            gameboard.appendChild(cell);
        }
        app.appendChild(gameboard);
    };
    Gameboard.prototype.generateWinningConditions = function () {
        var winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        return winningConditions;
    };
    return Gameboard;
}());
var Player = /** @class */ (function () {
    function Player(name) {
        this.name = name;
    }
    Player.prototype.makeMove = function (cell) {
        cell.textContent = this.name;
    };
    return Player;
}());
var Computer = /** @class */ (function (_super) {
    __extends(Computer, _super);
    function Computer() {
        return _super.call(this, 'HAL9000') || this;
    }
    Computer.prototype.getRandomCell = function () {
        return Math.floor(Math.random() * 9);
    };
    return Computer;
}(Player));
