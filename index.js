const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const app = express();
const db = require('./database');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

const apiRouter = express.Router();
app.use('/api', apiRouter);

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

apiRouter.post('/checkBoard', (req, res) => {
    const board = req.body.board;
    const result = checkBoard(board);
    if (result === 'valid') {
        res.json({ valid: true });
    } else {
        res.json({ valid: false, word: result });
    }
});

apiRouter.post('/score', (req, res) => {
    const board = req.body.board;
    const score = getScore(board);
    updateHighScore(score);
    res.send(score.toString());
});

// TODO: get highScore and numWins from database
apiRouter.get('/profile', (_req, res) => {
    res.send({ score: highScore, wins: numWins });
});

apiRouter.post('/user/create', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log('creating user: ' + username);
    const result = await db.createUser(username, password);
    if (result.success) {
        setAuthCookie(res, result.authToken);
        res.send({ id: result.id });
    } else {
        res.status(409).send({ msg: 'username already exists' });
    }
});

apiRouter.post('/user/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log('logging in user: ' + username);
    const result = await db.loginUser(username, password);
    if (result.success) {
        setAuthCookie(res, result.authToken);
        res.send({ id: result.id });
    } else {
        res.status(401).send({ msg: 'invalid username or password' });
    }
});

function setAuthCookie(res, authToken) {
    res.cookie('authToken', authToken, { 
        secure: true, 
        httpOnly: true,
        sameSite: 'strict'
    });
}

apiRouter.get('/user/me', async (req, res) => {
    if (req.cookies) {
        const authToken = req.cookies['authToken'];
        const user = await db.getUserByAuthToken(authToken);
        if (user) {
            res.send({ username: user.username });
        } else {
            res.status(401).send({ msg: 'invalid authToken' });
        }
    } else {
        res.status(401).send({ msg: 'no authToken' });
    }
});

// TODO: add delete user route (input: id, output: success or error) && requires admin priveledges
apiRouter.delete('/user/delete', async (req, res) => {
    if (req.cookies) {
        const authToken = req.cookies['authToken'];
        console.log('deleting user with authToken: ' + authToken);
        const success = await db.deleteUser(authToken);
        if (success) {
            res.send({ success: true, msg: 'user deleted' });
        } else {
            res.status(401).send({ success: false, msg: 'invalid authToken' });
        }
    } else {
        res.status(401).send({ success: false, msg: 'no authToken' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// add words for testing
const words = new Set();
fs.readFileSync('public/words.txt', 'utf8').split('\n').forEach(line => {
    const word = line.trim();
    if (word.length > 0) {
        words.add(word);
    }
});

function checkBoard(board) {
    if (board === null || board.length === 0 || board[0].length === 0) {
        return 'invalid board input';
    }

    let word = '';
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== ' ') {
                word += board[i][j];
            } else if (word.length > 0) {
                if (word.length > 1 && !words.has(word)) {
                    return word;
                }
                word = '';
            }
        }
        if (word.length > 0) {
            if (word.length > 1 && !words.has(word)) {
                return word;
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
                    return word;
                }
                word = '';
            }
        }
        if (word.length > 0) {
            if (word.length > 1 && !words.has(word)) {
                return word;
            }
            word = '';
        }
    }

    return 'valid';
}

const values = { 'E':1, 'A':1, 'I':1, 'O':1, 'N':1, 'R':1, 'T':1, 'L':1, 'S':1, 'U':1, 'D':2, 'G':2, 'B':3, 'C':3, 'M':3, 'P':3, 'F':4, 'H':4, 'V':4, 'W':4, 'Y':4, 'K':5, 'J':8, 'X':8, 'Q':10, 'Z':10 };

function getScore(board) {
    let score = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== ' ') {
                if (values[board[i][j]] !== undefined) {
                    score += values[board[i][j]];
                } else {
                    console.log('Invalid character on board');
                    return -1;
                }
            }
        }
    }
    return score;
}


// TODO: highScore and numWins should be stored in a database
let highScore = 0;
let numWins = 0;
function updateHighScore(score) {
    numWins++;      // score is only updated when you win
    if (score > highScore) {
        highScore = score;
    }
}
