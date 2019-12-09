const app = require('express')();
const body_parser = require('body-parser');
const cors = require('cors');
const mongo = require('mongodb');
const { ObjectID } = mongo;
const path = require('path');
const fs = require('fs');

const config = require('./config');

let database = null;

app.use(body_parser.json());
app.use(cors());

/* eslint-disable */

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} \n\t from ${req.connection.remoteAddress} \n\t at ${new Date()}`);
    return next();
});

app.get('/', (req, res) => {
    const index_path = path.resolve('../dist/index.html');
    res.sendFile(index_path);
});

app.get('/boards', async (req, res) => {
    try {
        const boards = await database.boards
            .find()
            .sort({ created: 1 })
            .toArray();
        res.send(boards);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.post('/boards', async (req, res) => {
    const { name } = req.body;
    const board = {
        name,
        created: new Date()
    };
    if (!name) {
        return res.sendStatus(403);
    }
    try {
        await database.boards.insertOne(board);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.put('/boards', async (req, res) => {
    const { id, name } = req.body;
    const query = { _id: ObjectID(id) };
    const update = { $set: { name } };
    if (!id || !name) {
        return res.sendStatus(404);
    }
    try {
        await database.boards.updateOne(query, update);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.delete('/boards', async (req, res) => {
    const { id } = req.query;
    const query = { _id: ObjectID(id) };
    if (!id) {
        return res.sendStatus(404);
    }
    try {
        let result = await database.boards.deleteOne(query);
        result = await database.lists.deleteMany({ board_id: id });
        result = await database.cards.deleteMany({ board_id: id });
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.get('/lists', async (req, res) => {
    const { board_id } = req.query;
    if (!board_id) {
        return res.sendStatus(403);
    }
    try {
        const boards = await database.lists
            .find({ board_id })
            .sort({ created: 1 })
            .toArray();
        res.send(boards);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.post('/lists', async (req, res) => {
    const { board_id, name } = req.body;
    const board = {
        board_id,
        name,
        created: new Date()
    };
    if (!name || !board_id) {
        return res.sendStatus(403);
    }
    try {
        await database.lists.insertOne(board);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.put('/lists', async (req, res) => {
    const { board_id, id, name } = req.body;
    const query = { _id: ObjectID(id), board_id };
    const update = { $set: { name } };
    if (!id || !name || !board_id) {
        return res.sendStatus(404);
    }
    try {
        await database.lists.updateOne(query, update);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.delete('/lists', async (req, res) => {
    const { id, board_id } = req.query;
    const query = { _id: ObjectID(id), board_id };
    if (!id || !board_id) {
        return res.sendStatus(404);
    }
    try {
        let result = await database.lists.deleteOne(query);
        result = await database.cards.deleteMany({ board_id });
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.get('/cards', async (req, res) => {
    const { board_id, list_id } = req.query;
    if (!board_id || !list_id) {
        return res.sendStatus(403);
    }
    try {
        const boards = await database.cards
            .find({ board_id, list_id })
            .sort({ created: 1 })
            .toArray();
        res.send(boards);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.post('/cards', async (req, res) => {
    const { board_id, list_id, title, description } = req.body;
    const board = {
        board_id,
        list_id,
        title,
        description,
        created: new Date()
    };
    if (!title || !title || !description || !board_id || !list_id) {
        return res.sendStatus(403);
    }
    try {
        await database.cards.insertOne(board);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.put('/cards', async (req, res) => {
    const { board_id, id, title, description, list_id } = req.body;
    const query = { _id: ObjectID(id), board_id, list_id };
    const update = { $set: { title, description } };
    if (!id || !title || !description || !list_id || !board_id) {
        return res.sendStatus(404);
    }
    try {
        await database.cards.updateOne(query, update);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.delete('/cards', async (req, res) => {
    const { id, board_id, list_id } = req.query;
    const query = { _id: ObjectID(id), board_id, list_id };
    if (!id || !board_id || !list_id) {
        return res.sendStatus(404);
    }
    try {
        const result = await database.cards.deleteOne(query);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.get('/*', (req, res) => {
    const file_path = path.resolve('../dist/' + req.path);
    fs.exists(file_path, exists => {
        if (exists) {
            return res.sendFile(file_path);
        }

        return res.sendStatus(404);
    });
});

const websiteFilesExist = fs.existsSync(path.resolve('../dist/'));
if (!websiteFilesExist) {
    console.error(
        "The dist folder doesn't exist! Run `npm run build` in the project root"
    );
    process.exit(1);
}

mongo.connect(config.db_url, (err, mongo_client) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    database = mongo_client.db(config.db_name);
    database.boards = database.collection('boards');
    database.lists = database.collection('lists');
    database.cards = database.collection('cards');
    database.boards.createIndex(
        { name: 1 },
        {
            background: true,
            unique: true
        }
    );
    database.lists.createIndex(
        { name: 1 },
        {
            background: true,
            unique: true
        }
    );
    database.lists.createIndex(
        { board_id: 1 },
        {
            background: true,
            unique: false
        }
    );
    database.cards.createIndex(
        { board_id: 1 },
        {
            background: true,
            unique: false
        }
    );
    app.listen(config.port, () =>
        console.log('Listening on port ' + config.port)
    );
});
