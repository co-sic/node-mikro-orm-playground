# node-mikro-orm-playground
Reproduce example with node v18.x
```
npm i
docker-compose up postgres
npm run start
```

### Result:
```
[query] select "b0".* from "book" as "b0" [took 1 ms]
[query] select "b0".* from "book" as "b0" [took 8 ms]
[query] select "l0".* from "localized_string" as "l0" where "l0"."id" in ('cb6ca49d-6479-4d18-ae77-331a190eadf6') order by "l0"."id" asc [took 3 ms]
request-1-title:  (LocalizedString) { id: 'd024a7c4-59c4-4fd3-b5b7-54967b61c22e' }
request-1-description:  LocalizedString {
  id: 'cb6ca49d-6479-4d18-ae77-331a190eadf6',
  de_DE: 'Book about mikro-orm',
  en_US: null
}
[query] select "l0".* from "localized_string" as "l0" where "l0"."id" in ('d024a7c4-59c4-4fd3-b5b7-54967b61c22e') order by "l0"."id" asc [took 4 ms]
request-2-title:  LocalizedString {
  id: 'd024a7c4-59c4-4fd3-b5b7-54967b61c22e',
  de_DE: 'mikro-orm',
  en_US: null
}
request-2-description:  LocalizedString {
  id: 'cb6ca49d-6479-4d18-ae77-331a190eadf6',
  de_DE: 'Book about mikro-orm',
  en_US: null
}
```

### Expected: 
request-2-title should be populated after request2 is finished. This works with mikro-orm v5.6.16.
