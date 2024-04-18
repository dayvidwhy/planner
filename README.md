# Planner
Plan anything collaboratively with others.

![GitHub last commit](https://img.shields.io/github/last-commit/dayvidwhy/planner)
![GitHub issues](https://img.shields.io/github/issues/dayvidwhy/planner)
![GitHub pull requests](https://img.shields.io/github/issues-pr/dayvidwhy/planner)
![GitHub](https://img.shields.io/github/license/dayvidwhy/planner)

Application leverages:
* Nextjs 14 with RSC for the front and back-end
* Drizzle to manage an SQLite database
* Nextauth for authentication and authorization
* UI components are provided via [shadcn-ui](https://ui.shadcn.com/docs)

## Install
Clone the repository and start development mode.
```bash
git clone git@github.com:dayvidwhy/planner.git
cd planner
npm i
npx drizzle-kit generate:sqlite
npx drizzle-kit push:sqlite
npm run dev
```

Project uses NVM for [node](https://github.com/nvm-sh/nvm) version. 
```bash
# Set node to 21
nvm use
```

## Working with the UI library
Components are provided by [shadcn-ui](https://ui.shadcn.com/docs). Components are stored under `./components/` and more can be installed with:

```bash
npx shadcn-ui@latest add
```
Follow the prompts.

## Database
Project is using SQLite via `better-sqlite3` interacted with via Drizzle as the adapter.

Some useful commands:
```bash
# Generate the database
npx drizzle-kit generate:sqlite

# Push changes to the database
npx drizzle-kit push:sqlite

# Inspect the database with Drizzle kit studio
npx drizzle-kit studio

# If you're starting fresh, run generate and push to get going
npx drizzle-kit generate:sqlite
npx drizzle-kit push:sqlite
```

View database files in `./drizzle/`, SQLite database is stored at `./sqlite.db`.
