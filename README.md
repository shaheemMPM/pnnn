# Nest Next Postgres Starter

- Based on [nest-next](https://github.com/geongeorge/Nest-Next)

## Installation

```bash
$ yarn
```

## Running the app

```bash
# watch mode
$ yarn start:dev
```

### Development DB

- Use https://postgresapp.com/
- Open a cli from inside the app by clicking on the db
- `CREATE DATABASE finalinvoice;`
- Set Env `DATABASE_URL="postgresql://geongeorge:@localhost:5432/finalinvoice"`
  - Username will be your [system user](https://postgresapp.com/)
  - Password will be empty

### Migrate Prisma

```
yarn prisma migrate deploy
```

### Static Assets

- Place static assets in `/assets` and reference it directly `/assets/....`

### When adding front end pages

- Make sure the base route of the page is added to the view controller
- Only applicable to root pages routes

```ts
// Add all view base paths here
@Get(['/', '_next*', 'orders*', 'settings*', 'templates*', 'email*'])
public async showHome(@Req() req: Request, @Res() res: Response) {
  this._fireUpNext(req, res);
}
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
