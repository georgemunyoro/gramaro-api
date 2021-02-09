# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.0.2](https://github.com/georgemunyoro/gramaro-api/compare/v2.0.1...v2.0.2) (2021-02-09)


### Bug Fixes

* remove unused utils folder ([1351dab](https://github.com/georgemunyoro/gramaro-api/commit/1351dab5d0d71d259271a7f3ab651ed3e30218ad))

### [2.0.1](https://github.com/georgemunyoro/gramaro-api/compare/v2.0.0...v2.0.1) (2021-02-09)


### Bug Fixes

* **entities/note:** updated note entity to match database model ([95430cc](https://github.com/georgemunyoro/gramaro-api/commit/95430cc67e59f3a0057114da1a9b606dc17bff2d))
* **prisma:** add createdAt and updatedAt fields to database models ([dc38026](https://github.com/georgemunyoro/gramaro-api/commit/dc3802690c2219af77cd079108983e11cdf32078))
* **prisma:** add missing createdAt and updatedAt fields for note model and rename userId field to ownerId ([042a359](https://github.com/georgemunyoro/gramaro-api/commit/042a359c719dd7cfb43fa7ddf6b3024c8a583143))
* **prisma:** add title field to note model in db schema ([37a4666](https://github.com/georgemunyoro/gramaro-api/commit/37a46666a2aa0b5574edecbdf58e9e2b410219b7))
* **prisma:** introspect existing database ([8b83d66](https://github.com/georgemunyoro/gramaro-api/commit/8b83d661d37acbaa76628b42cbe590acee570f4d))
* **src/index.ts:** fix callback type error ([2f2fcf1](https://github.com/georgemunyoro/gramaro-api/commit/2f2fcf12f886145c014cf6329e737c2c26632bb4))

## [2.0.0](https://github.com/georgemunyoro/gramaro-api/compare/v1.0.4...v2.0.0) (2021-02-08)


### ⚠ BREAKING CHANGES

* 

### Bug Fixes

* remove users endpoint for listing users ([0b6675a](https://github.com/georgemunyoro/gramaro-api/commit/0b6675ab5eeb1313bec6bf34d5cae0e60b50ed42))
* **tsconfig.json:** set resolveJsonModules true in tsconfig ([fbb16ef](https://github.com/georgemunyoro/gramaro-api/commit/fbb16ef2c3f628c17192a3fca348449c79a83c4a))

### [1.0.4](https://github.com/georgemunyoro/gramaro-api/compare/v1.0.3...v1.0.4) (2021-02-07)


### Bug Fixes

* **prisma:** add contents property to note model in prisma schema ([a189793](https://github.com/georgemunyoro/gramaro-api/commit/a1897932e380212ed9eb08bc3ee012f2671c3e6c))

### [1.0.3](https://github.com/georgemunyoro/gramaro-api/compare/v1.0.2...v1.0.3) (2021-02-04)

### [1.0.2](https://github.com/georgemunyoro/gramaro-api/compare/v1.0.1...v1.0.2) (2021-02-04)


### Bug Fixes

* **test/test.js:** fix incorrect relative path ([a3799a0](https://github.com/georgemunyoro/gramaro-api/commit/a3799a0ba06187f917388e32a82b44f6fe5243ed))

### [1.0.1](https://github.com/georgemunyoro/gramaro-api/compare/v1.0.0...v1.0.1) (2021-02-04)

## 1.0.0 (2021-02-03)


### Features

* install and setup morgan for logging ([46597bd](https://github.com/georgemunyoro/gramaro-api/commit/46597bdd6e0e3924d9052b2f46a51eaae857d3df))
* store hashed passwords in database instead of plain text ([4689044](https://github.com/georgemunyoro/gramaro-api/commit/468904439c4a0094dfb526545f73afb1c77080bd))


### Bug Fixes

* **index.js:** correct misspelled variable ([9fbeede](https://github.com/georgemunyoro/gramaro-api/commit/9fbeede62cd91b4368a9c61ea07da820c2c76538))
* check provided password password against hashed password ([066f9ba](https://github.com/georgemunyoro/gramaro-api/commit/066f9ba3b8c328a1cc73e76cbd589bf89d64237e))
