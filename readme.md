kind of a fast "ssg"
- uses preact, ejs, sass, ts
- parcel for bundling
- :star: ~12kb init js load vs. ~132kb on a similar parcel build w/ react and NO ssg 

steps to dev
- `yarn dev:bundler`: watches and builds the bundler to `./dist`
- `yarn dev`: watches `./templates` and parcels templates w/ public assets & data from `./pages`

steps to build
- `yarn build` 

steps to add routes
- create route in `./pages`
- create `.ejs` template in `./templates` using assets from `./public`
- create `getData()` function that will be hydrated in the template
- export through `./pages/index.ts`
