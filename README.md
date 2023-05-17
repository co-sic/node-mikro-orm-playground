# node-mikro-orm-playground
Reproduce example with node v18.x
```
npm i
docker-compose up postgres
npm run start
```

### Result:
```
[query] select "b0".* from "book" as "b0" [took 2 ms]
[query] select "a0".* from "author" as "a0" [took 10 ms]
[query] select "l0".* from "localized_string" as "l0" where "l0"."id" in ('0f714f03-ecca-4b90-8f06-fe9ae0ccd99b') order by "l0"."id" asc [took 5 ms]
[query] select "b0".* from "book" as "b0" where "b0"."author_id" in ('091f4c46-e4de-4a3e-b68a-ab93167e4be9') order by "b0"."author_id" asc [took 4 ms]
request-2-title:  (LocalizedString) { id: '44c19cbe-7bd6-4baf-b065-57a05cf58d23' }
request-2-description:  LocalizedString {
  id: '0f714f03-ecca-4b90-8f06-fe9ae0ccd99b',
  de_DE: 'Book about mikro-orm',
  en_US: null
}
[query] select "l0".* from "localized_string" as "l0" where "l0"."id" in ('44c19cbe-7bd6-4baf-b065-57a05cf58d23') order by "l0"."id" asc [took 4 ms]
request-1-title:  LocalizedString {
  id: '44c19cbe-7bd6-4baf-b065-57a05cf58d23',
  de_DE: 'mikro-orm',
  en_US: null
}
request-1-description:  LocalizedString {
  id: '0f714f03-ecca-4b90-8f06-fe9ae0ccd99b',
  de_DE: 'Book about mikro-orm',
  en_US: null
}


```

### Expected: 
request-2-title should be populated after request2 is finished. This works with mikro-orm v5.6.16.
