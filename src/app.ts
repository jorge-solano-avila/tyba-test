import express, { Express, Router } from "express";
import { createConnection } from "typeorm";

import { Cors, Middleware } from "./middlewares";
import { initRoutes } from "./routes";

const apiRouter = express.Router();

/**
 * App configuration with Express and Mongoose libraries.
 */
class App {
  private static readonly _instance: App = new App();
  private _express: Express;
  private _middlewares: Middleware[];
  private _router: Router;

  private constructor() {
    this._connectToDB();
    this._express = express();
    this._middlewares = [
      new Cors()
    ];
    this._router = express.Router();
    this._apiConfig();
  }

  /** Run application server with Express library */
  public runServer(): void {
    const port = +process.env.API_PORT || 10000;
    this._express.listen(port, () => {
      // tslint:disable-next-line:no-console
      console.log(`Server is running in port ${ port }`);
    });
  }

  private _apiConfig(): void {
    // Support application/json and application/x-www-form-urlencoded type post data
    this._express.use(express.json());
    this._express.use(express.urlencoded({ extended: true }));

    // Support middlewares
    this._middlewares.forEach((middleware: Middleware) => {
      this._express.use(middleware.apply);
    });

    // Support Express router
    this._express.use(this._router);

    // Define routes
    initRoutes(apiRouter);
    this._router.use("/api", apiRouter);
  }

  private async _connectToDB(): Promise<void> {
    try {
      await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        synchronize: true,
        entities: [
          "build/models/**/*.js"
        ],
        subscribers: [
          "build/subscribers/*.js"
        ],
        migrations: [
          "build/migrations/*.js"
        ],
        cli: {
          entitiesDir: "build/models",
          migrationsDir: "build/migrations",
          subscribersDir: "build/subscribers"
        }
      });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error);
      process.exit(1);
    }
  }

  /* Getters and setters */

  /** App singleton instance */
  public static get instance(): App {
    return App._instance;
  }
}

export default App.instance;
