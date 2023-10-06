# node-mikro-orm-playground

```
bun install
docker compose up postgres
```

For ts files run `bun start:dev` and for js files `bun start`.

### Current limitations
- cli package is not working for me. I created my own scripts for migrations as workaround.
- I could not get the automatic config discovery to work with the config from the package.json. So i changed it to just directly import it in the init funciton.
- In the mikro-orm config i need to use path based entity discovery. Directly importing the entities as array was not working.
- I added the ugly migrator.ts quick fix to make the migrations work (see discussion).