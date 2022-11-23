import express from 'express';
import cors from "cors";
import userRoutes from '../routes/users.router.js';

export default class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.root = '/api';

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes() {
        this.app.use(this.root, userRoutes);
        this.app.get('*', (req, res) =>{
            res.status(404).json({message: 'Error 404 - endpoint not found'});
        });
    };

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server on port', this.port );
        });
    }
};