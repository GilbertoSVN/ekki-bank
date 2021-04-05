# Ekki Bank
## Technical Challenge

This project uses docker with a postgres image.

```sh
docker run --name ekkibank -e POSTGRES_PASSWORD=ekkibank -p 5432:5432 -d postgres
```

## To-Do

- add tests
- fix miraje js
- analyze performance with react profiler
- better configuration on pwa
- analyze accessibility
- add typescript
- add swagger
- better readme

## Installation

This project requires Node 10+. Can be run both with npm or yarn.

### Extra

For development purpose, was used MirajeJS in it's initial states for design development.
The insomnia folder contains insomnia json for import, to test the routes on it.
