const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// add words for testing
const words = new Set();
words.add('dad');
words.add('dude');

function checkBoard(board) {
    if (board === null || board.length === 0 || board[0].length === 0) {
        return false;
    }

    let word = '';
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== ' ') {
                word += board[i][j];
            } else if (word.length > 0) {
                if (word.length > 1 && !words.has(word)) {
                    return false;
                }
                word = '';
            }
        }
        if (word.length > 0) {
            if (word.length > 1 && !words.has(word)) {
                return false;
            }
            word = '';
        }
    }

    for (let j = 0; j < board[0].length; j++) {
        for (let i = 0; i < board.length; i++) {
            if (board[i][j] !== ' ') {
                word += board[i][j];
            } else if (word.length > 0) {
                if (word.length > 1 && !words.has(word)) {
                    return false;
                }
                word = '';
            }
        }
        if (word.length > 0) {
            if (word.length > 1 && !words.has(word)) {
                return false;
            }
            word = '';
        }
    }

    return true;
}
