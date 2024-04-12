const express = require('express');
const { WebSocketServer } = require('ws');
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

apiRouter.delete('/user/logout', async (req, res) => {
    console.log('logout user');
    res.clearCookie('authToken');
    res.status(204).end();
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
            res.send({ username: user.username, isAdmin: user.isAdmin });
        } else {
            res.status(401).send({ msg: 'invalid authToken' });
        }
    } else {
        res.status(401).send({ msg: 'no authToken' });
    }
});

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

// TODO: add get all user route (output: list of users & their info) && requires admin priveledges
apiRouter.get('/user/all', async (req, res) => {
    const authToken = req.cookies['authToken'];
    if (!await db.isAdmin(authToken)) {
        res.status(401).send({ msg: 'unauthorized' });
        return;
    }
    const users = await db.getAllUsers();
    if (users) {
        res.send({ users: users });
    } else {
        res.status(404).send({ msg: 'user not found' });
    }
});

const games = [];

apiRouter.post('/game/create', async (req, res) => {
    const authToken = req.cookies['authToken'];
    const user = await db.getUserByAuthToken(authToken);
    if (!user) {
        res.status(401).send({ msg: 'invalid authToken' });
        return;
    }
    const game = new Game();
    game.players.set(user.username, 0);
    games.push(game);
    res.send({ gameID: game.gameID });
});

apiRouter.post('/game/join', async (req, res) => {
    const gameID = req.body.gameID;
    const authToken = req.cookies['authToken'];
    const user = await db.getUserByAuthToken(authToken);
    if (!user) {
        res.status(401).send({ msg: 'invalid authToken' });
        return;
    }
    const game = games.find(g => g.gameID === gameID);
    if (game) {
        console.log(user.username + ' joining game ' + gameID);
        game.players.set(user.username, 0);
        res.send({ success: true, username: user.username });
    } else {
        res.status(404).send({ msg: 'game not found' });
    }
});

apiRouter.get('/players', async (req, res) => {
    const authToken = req.cookies['authToken'];
    const user = await db.getUserByAuthToken(authToken);
    if (!user) {
        res.status(401).send({ msg: 'invalid authToken' });
        return;
    }
    const game = games.find(g => g.players.has(user.username));
    if (game) {
        console.log(user.username + ' getting players ' + game.gameID);
        res.send({ success: true, players: Array.from(game.players.keys()) });
    } else {
        res.status(404).send({ msg: 'game not found' });
    }
});

server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// create websocket server
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, socket => {
        wss.emit('connection', socket, request);
    });
});

// keep track of all connections
let connections = [];
let id = 0;
const startTypes = ['create', 'join', 'start', 'leave'];

wss.on('connection', (ws) => {
    const connection = { id: ++id, alive: true, ws: ws, gameID: null, username: null, host: false };
    connections.push(connection);

    // Forward messages to everyone in the same game
    ws.on('message', function message(data) {
        const message = JSON.parse(data);
        connection.gameID = message.gameID;
        connection.username = message.username;
        if (startTypes.includes(message.type)) {
            connection.host = message.host;
            if (message.type !== 'create') {
                connections.forEach((c) => {
                    if (c.id !== connection.id && c.gameID !== null && c.gameID === connection.gameID) {
                        c.ws.send(JSON.stringify(message));
                    }
                });
            }
        } else {
            if (message.type === 'place' || message.type === 'remove') {
                const game = games.find(g => g.gameID === connection.gameID);
                const score = (message.type === 'place') 
                    ? game.players.get(connection.username) +  1
                    : game.players.get(connection.username) -  1;
                game.players.set(connection.username, score);
                connections.forEach((c) => {
                    if (c.id !== connection.id && c.gameID !== null && c.gameID === connection.gameID) {
                        c.ws.send(`{"username":"${connection.username}","score":${game.players.get(connection.username)}}`);
                    }
                });
            }
        }
    });

    // Remove the closed connection so we don't try to forward anymore
    ws.on('close', () => {
        const pos = connections.findIndex((o, i) => o.id === connection.id);

        if (pos >= 0) {
            connections.splice(pos, 1);
        }

        connections.forEach((c) => {
            if (c.id !== connection.id && c.gameID !== null && c.gameID === connection.gameID) {
                c.ws.send(JSON.stringify({ type: 'leave', username: connection.username, host: connection.host }));
            }
        });
    });

    // Respond to pong messages by marking the connection alive
    ws.on('pong', () => {
        connection.alive = true;
    });
});

// keep active connections alive
setInterval(() => {
    connections.forEach((c) => {
        // Kill any connection that didn't respond to the ping last time
        if (!c.alive) {
            c.ws.terminate();
        } else {
            c.alive = false;
            c.ws.ping();
        }
    });
}, 10000);

// add words for testing
const words = new Set();
fs.readFileSync('words.txt', 'utf8').split('\n').forEach(line => {
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
let highScore = 5;
let numWins = 2;
function updateHighScore(score) {
    numWins++;      // score is only updated when you win
    if (score > highScore) {
        highScore = score;
    }
}

class Game {
    constructor() {
        this.gameID = this.generatePin();
        this.players = new Map();
    }

    generatePin() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let gamePin = '';
        for (let i = 0; i < 4; i++) {
          gamePin += letters.charAt(Math.floor(Math.random() * 26));
        }
        return gamePin;
    }
}
