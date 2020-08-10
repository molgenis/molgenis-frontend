# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.0.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-row-edit@3.0.5...@molgenis-ui/data-row-edit@4.0.0) (2020-08-10)


### Bug Fixes

* **data-row-edit:** Put back fontawesome dependancy ([8acbcc2](https://github.com/molgenis/molgenis-frontend/commit/8acbcc2))
* **data-row-edit, app-manager, settings, security:** combine chunks to make build output compatible with molgenis backend paths ([da39558](https://github.com/molgenis/molgenis-frontend/commit/da39558))


### task

* **app-manager, data-row-edit, settings, security:** prepare for release ([f67e309](https://github.com/molgenis/molgenis-frontend/commit/f67e309))


### BREAKING CHANGES

* **app-manager, data-row-edit, settings, security:** build moved to node 12 (erbium), dist file routes changed





## [3.0.5](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-row-edit@3.0.4...@molgenis-ui/data-row-edit@3.0.5) (2020-05-07)


### Bug Fixes

* [#267](https://github.com/molgenis/molgenis-frontend/issues/267) FILE datatype broken in new forms ([d81885a](https://github.com/molgenis/molgenis-frontend/commit/d81885a))





## [3.0.4](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-row-edit@3.0.3...@molgenis-ui/data-row-edit@3.0.4) (2019-10-02)

**Note:** Version bump only for package @molgenis-ui/data-row-edit





## [3.0.3](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-row-edit@3.0.2...@molgenis-ui/data-row-edit@3.0.3) (2019-09-24)


### Bug Fixes

* **data-row-edit, questionnaires, settings:** bump molgenis-ui-form runtime dependancy to 4.0.3 ([b593c45](https://github.com/molgenis/molgenis-frontend/commit/b593c45))





## [3.0.2](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-row-edit@3.0.1...@molgenis-ui/data-row-edit@3.0.2) (2019-08-21)

**Note:** Version bump only for package @molgenis-ui/data-row-edit





## [3.0.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-row-edit@3.0.0...@molgenis-ui/data-row-edit@3.0.1) (2019-06-14)


### Bug Fixes

* **data-row-edit:** fix public path ([f294e75](https://github.com/molgenis/molgenis-frontend/commit/f294e75))





# 3.0.0 (2019-06-06)


### Bug Fixes

* **data-row-edit:** bump molgenis-ui-form 4.0.0 -> 4.0.1 ([a296072](https://github.com/molgenis/molgenis-frontend/commit/a296072))
* **data-row-edit:** check for empty file value ([ddc856f](https://github.com/molgenis/molgenis-frontend/commit/ddc856f)), closes [#28](https://github.com/molgenis/molgenis-frontend/issues/28)
* **data-row-edit:** Fix 8356, use i18n bool values ([c40c67e](https://github.com/molgenis/molgenis-frontend/commit/c40c67e))
* **data-row-edit:** Fix for [#8470](https://github.com/molgenis/molgenis-frontend/issues/8470) and [#8464](https://github.com/molgenis/molgenis-frontend/issues/8464) ([612ceaf](https://github.com/molgenis/molgenis-frontend/commit/612ceaf))


### Features

* **data-row-edit:** upgrade form dependency to 3.0.0 ([a175ce6](https://github.com/molgenis/molgenis-frontend/commit/a175ce6))


### BREAKING CHANGES

* **data-row-edit:** Erroneous validation expressions in the visibleExpression, nullableExpression and
validationExpression will not stop execution of the scripts but instead fallback to a default value
(see documentation) and continue with a warning.
* **data-row-edit:** Form label keys updated



# 0.1.0 (2019-02-06)



## 0.0.3 (2019-01-31)



## 0.0.1-alpha.4 (2019-01-31)



## 0.0.1-alpha.0 (2019-01-29)





## [2.0.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis/data-row-edit@2.0.0...@molgenis/data-row-edit@2.0.1) (2019-05-27)


### Bug Fixes

* **data-row-edit:** bump molgenis-ui-form 4.0.0 -> 4.0.1 ([a296072](https://github.com/molgenis/molgenis-frontend/commit/a296072))





# [2.0.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis/data-row-edit@1.0.1...@molgenis/data-row-edit@2.0.0) (2019-05-02)


### Bug Fixes

* **data-row-edit:** Fix for [#8470](https://github.com/molgenis/molgenis-frontend/issues/8470) and [#8464](https://github.com/molgenis/molgenis-frontend/issues/8464) ([612ceaf](https://github.com/molgenis/molgenis-frontend/commit/612ceaf))


### BREAKING CHANGES

* **data-row-edit:** Erroneous validation expressions in the visibleExpression, nullableExpression and
validationExpression will not stop execution of the scripts but instead fallback to a default value
(see documentation) and continue with a warning.





## [1.0.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis/data-row-edit@1.0.0...@molgenis/data-row-edit@1.0.1) (2019-04-25)


### Bug Fixes

* **data-row-edit:** Fix 8356, use i18n bool values ([c40c67e](https://github.com/molgenis/molgenis-frontend/commit/c40c67e))





# 1.0.0 (2019-04-01)


### Bug Fixes

* **data-row-edit:** check for empty file value ([ddc856f](https://github.com/molgenis/molgenis-frontend/commit/ddc856f)), closes [#28](https://github.com/molgenis/molgenis-frontend/issues/28)


### Features

* **data-row-edit:** upgrade form dependency to 3.0.0 ([a175ce6](https://github.com/molgenis/molgenis-frontend/commit/a175ce6))


### BREAKING CHANGES

* **data-row-edit:** Form label keys updated



# 0.1.0 (2019-02-06)



## 0.0.3 (2019-01-31)



## 0.0.1-alpha.4 (2019-01-31)



## 0.0.1-alpha.0 (2019-01-29)
