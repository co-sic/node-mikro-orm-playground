# node-mikro-orm-playground
Reproduce example with node v16.x
```
npm i
docker-compose up postgres
npm run start
```

Error produced: `DriverException: insert into "book" ("chapter_pages") values ('[1,10,100,1000,2000]') returning "id" - malformed array literal: "[1,10,100,1000,2000]"`
