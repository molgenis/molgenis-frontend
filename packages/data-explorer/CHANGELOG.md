# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.10](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@1.1.9...@molgenis-ui/data-explorer@1.1.10) (2020-11-20)

**Note:** Version bump only for package @molgenis-ui/data-explorer





## [1.1.9](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@1.1.8...@molgenis-ui/data-explorer@1.1.9) (2020-11-17)

**Note:** Version bump only for package @molgenis-ui/data-explorer





## [1.1.8](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@1.1.7...@molgenis-ui/data-explorer@1.1.8) (2020-11-17)

**Note:** Version bump only for package @molgenis-ui/data-explorer





## [1.1.7](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@1.1.6...@molgenis-ui/data-explorer@1.1.7) (2020-11-16)

**Note:** Version bump only for package @molgenis-ui/data-explorer





## [1.1.6](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@1.1.5...@molgenis-ui/data-explorer@1.1.6) (2020-11-16)

**Note:** Version bump only for package @molgenis-ui/data-explorer





## [1.1.5](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@1.1.4...@molgenis-ui/data-explorer@1.1.5) (2020-11-10)

**Note:** Version bump only for package @molgenis-ui/data-explorer





## [1.1.4](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@1.1.3...@molgenis-ui/data-explorer@1.1.4) (2020-11-06)

**Note:** Version bump only for package @molgenis-ui/data-explorer





## [1.1.3](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@1.1.2...@molgenis-ui/data-explorer@1.1.3) (2020-11-06)

**Note:** Version bump only for package @molgenis-ui/data-explorer





## [1.1.2](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@1.1.1...@molgenis-ui/data-explorer@1.1.2) (2020-11-06)

**Note:** Version bump only for package @molgenis-ui/data-explorer





## [1.1.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@1.1.0...@molgenis-ui/data-explorer@1.1.1) (2020-11-03)

**Note:** Version bump only for package @molgenis-ui/data-explorer





# [1.1.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@1.0.1...@molgenis-ui/data-explorer@1.1.0) (2020-10-26)


### Features

* **data-explorer:** Add warning that data-explorer does not support ie11 ( or 10) ([#423](https://github.com/molgenis/molgenis-frontend/issues/423)) ([a9b016e](https://github.com/molgenis/molgenis-frontend/commit/a9b016e))





## [1.0.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@1.0.0...@molgenis-ui/data-explorer@1.0.1) (2020-10-26)

**Note:** Version bump only for package @molgenis-ui/data-explorer





# [1.0.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@0.36.0...@molgenis-ui/data-explorer@1.0.0) (2020-10-09)


### Features

* **data-explorer:** use sys_ts_DataExplorerEntitySettings entity for storing settings ([ca89bce](https://github.com/molgenis/molgenis-frontend/commit/ca89bce))


### BREAKING CHANGES

* **data-explorer:** expects 'sys_ts_DataExplorerEntitySettings' to be available in backend.

- Remove check for settings table at startup
- Assume settings table can be found at 'sys_ts_DataExplorerEntitySettings'
- Replace router fallback table with settings table as 'root_hospital_patients' is not guaranteed to exist in backend





# [0.36.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@0.35.5...@molgenis-ui/data-explorer@0.36.0) (2020-09-25)


### Features

* **data-explorer:** Add cart-selection component ([3d08dd9](https://github.com/molgenis/molgenis-frontend/commit/3d08dd9))
* **data-explorer:** moved shop button to new component ([38d072d](https://github.com/molgenis/molgenis-frontend/commit/38d072d))





## [0.35.5](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@0.35.4...@molgenis-ui/data-explorer@0.35.5) (2020-09-23)

**Note:** Version bump only for package @molgenis-ui/data-explorer





## [0.35.4](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@0.35.3...@molgenis-ui/data-explorer@0.35.4) (2020-09-04)

**Note:** Version bump only for package @molgenis-ui/data-explorer





## [0.35.3](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@0.35.2...@molgenis-ui/data-explorer@0.35.3) (2020-08-31)

**Note:** Version bump only for package @molgenis-ui/data-explorer





## [0.35.2](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@0.35.1...@molgenis-ui/data-explorer@0.35.2) (2020-08-26)


### Bug Fixes

* **data-explorer:** pass correct props to TableSettingsButton component ([#350](https://github.com/molgenis/molgenis-frontend/issues/350)) ([f1001f3](https://github.com/molgenis/molgenis-frontend/commit/f1001f3))





## [0.35.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@0.35.0...@molgenis-ui/data-explorer@0.35.1) (2020-08-21)


### Bug Fixes

* **data-explorer:** Custom card now supports having no attributes for template, so that it does not crashes ([7a66269](https://github.com/molgenis/molgenis-frontend/commit/7a66269))





# [0.35.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@0.5.0...@molgenis-ui/data-explorer@0.35.0) (2020-07-27)


### Bug Fixes

* **actions.spec:** Fix test ([a6e5db0](https://github.com/molgenis/molgenis-frontend/commit/a6e5db0))
* **CardView:** Fix cards broken for tables consisting of compounds only ([91ce318](https://github.com/molgenis/molgenis-frontend/commit/91ce318))
* **CardView:** Fix expand card for cards with id other than "id" ([3edc1bd](https://github.com/molgenis/molgenis-frontend/commit/3edc1bd))
* **CardViewTest:** Fix linting ([0103bec](https://github.com/molgenis/molgenis-frontend/commit/0103bec))
* **config:** Fix config for new server ([10c882d](https://github.com/molgenis/molgenis-frontend/commit/10c882d))
* **data-explorer:** Add missing rights in default card ([3d491e6](https://github.com/molgenis/molgenis-frontend/commit/3d491e6))
* **data-explorer:** added a few seconds to timeout ([bf88ea6](https://github.com/molgenis/molgenis-frontend/commit/bf88ea6))
* **data-explorer:** Added simple html template ([a3d447e](https://github.com/molgenis/molgenis-frontend/commit/a3d447e))
* **data-explorer:** Added simple html template ([7545201](https://github.com/molgenis/molgenis-frontend/commit/7545201))
* **data-explorer:** Added the correct url to molgenis bootstrap style ([#113](https://github.com/molgenis/molgenis-frontend/issues/113)) ([e25a2c5](https://github.com/molgenis/molgenis-frontend/commit/e25a2c5))
* **data-explorer:** Always ask for id and label attrs as these are expected to always be present. ([1ed6b9c](https://github.com/molgenis/molgenis-frontend/commit/1ed6b9c))
* **data-explorer:** build time missing type error ([1692753](https://github.com/molgenis/molgenis-frontend/commit/1692753))
* **data-explorer:** bump [@molgenis](https://github.com/molgenis)/molgenis-ui-context from 1.6.3 to 1.6.4 ([fbb7d52](https://github.com/molgenis/molgenis-frontend/commit/fbb7d52))
* **data-explorer:** change meta to attributes in getters ([be6ec2f](https://github.com/molgenis/molgenis-frontend/commit/be6ec2f))
* **data-explorer:** Changed naming. ( Value was fliped from what you would expect from naming ) ([0a8d70a](https://github.com/molgenis/molgenis-frontend/commit/0a8d70a))
* **data-explorer:** default store settings get overridden by non-existing props from server. ([d236196](https://github.com/molgenis/molgenis-frontend/commit/d236196))
* **data-explorer:** Fix bootstrapper unit test ([b5adcf7](https://github.com/molgenis/molgenis-frontend/commit/b5adcf7))
* **data-explorer:** fix e2e test ([4ba9835](https://github.com/molgenis/molgenis-frontend/commit/4ba9835))
* **data-explorer:** fix issue due to not checking for non mref reference types ([#145](https://github.com/molgenis/molgenis-frontend/issues/145)) ([217d4e0](https://github.com/molgenis/molgenis-frontend/commit/217d4e0))
* **data-explorer:** Fixed broken clipboard ([7d963aa](https://github.com/molgenis/molgenis-frontend/commit/7d963aa))
* **data-explorer:** fixed broken table after internal data change ([cf3b08d](https://github.com/molgenis/molgenis-frontend/commit/cf3b08d))
* **data-explorer:** Fixed broken tests ([da6cd5f](https://github.com/molgenis/molgenis-frontend/commit/da6cd5f))
* **data-explorer:** fixed toast not showing correctly ([0a28cc9](https://github.com/molgenis/molgenis-frontend/commit/0a28cc9))
* **data-explorer:** issue with stale template data and trying to render card before data was fetched ([a366cf3](https://github.com/molgenis/molgenis-frontend/commit/a366cf3))
* **data-explorer:** load deep data when showing clipboard  ([#148](https://github.com/molgenis/molgenis-frontend/issues/148)) ([14d185a](https://github.com/molgenis/molgenis-frontend/commit/14d185a))
* **data-explorer:** make lesser equal query work ([#321](https://github.com/molgenis/molgenis-frontend/issues/321)) ([225c103](https://github.com/molgenis/molgenis-frontend/commit/225c103))
* added testcase for bool in RSQL mapper ([c0e0168](https://github.com/molgenis/molgenis-frontend/commit/c0e0168))
* **data-explorer:** move data-explorer registry to molgenis-ui ([#329](https://github.com/molgenis/molgenis-frontend/issues/329)) ([7112177](https://github.com/molgenis/molgenis-frontend/commit/7112177))
* **data-explorer:** no history mode for router ([fb1a1f3](https://github.com/molgenis/molgenis-frontend/commit/fb1a1f3))
* **data-explorer:** remove double 'card' class ([ad1e486](https://github.com/molgenis/molgenis-frontend/commit/ad1e486))
* **data-explorer:** remove double call to context by re-using menu call result ([c39c085](https://github.com/molgenis/molgenis-frontend/commit/c39c085))
* **data-explorer:** Remove e2e test as it is not really testing end use feature. ([19f89c4](https://github.com/molgenis/molgenis-frontend/commit/19f89c4))
* **data-explorer:** remove unneeded margin to align column ([7ec5559](https://github.com/molgenis/molgenis-frontend/commit/7ec5559))
* **data-explorer:** removed codesmells ([bc692a9](https://github.com/molgenis/molgenis-frontend/commit/bc692a9))
* **data-explorer:** Reset bookmark on table change ([31b1b3e](https://github.com/molgenis/molgenis-frontend/commit/31b1b3e))
* **data-explorer:** show default filters ([5f43c96](https://github.com/molgenis/molgenis-frontend/commit/5f43c96))
* **data-explorer:** update unit test to fix test failure, add missing required props and mock data ([758937f](https://github.com/molgenis/molgenis-frontend/commit/758937f))
* **data-explorer:** updated ui-filter package to 1.11.1 ([e991020](https://github.com/molgenis/molgenis-frontend/commit/e991020))
* **data-explorer)(legacy-lib:** bump version to 1.3.4 to fix fallback link ([#139](https://github.com/molgenis/molgenis-frontend/issues/139)) ([48b51f8](https://github.com/molgenis/molgenis-frontend/commit/48b51f8))
* **dataRepository:** Fix typing ([5910320](https://github.com/molgenis/molgenis-frontend/commit/5910320))
* **DataView:** Do not render the button when activeEntity is empty ([d930d9c](https://github.com/molgenis/molgenis-frontend/commit/d930d9c))
* **DefaultCard:** Make info link generic ([27aa622](https://github.com/molgenis/molgenis-frontend/commit/27aa622))
* **e2e:** Fix e2e timing ([b0e02bf](https://github.com/molgenis/molgenis-frontend/commit/b0e02bf))
* **ExplorerCardTest:** Fix warning ([43ef39d](https://github.com/molgenis/molgenis-frontend/commit/43ef39d))
* **filters:** updated to 1.4.2 ([0672c53](https://github.com/molgenis/molgenis-frontend/commit/0672c53))
* **packageJson:** include packageJson as well ([11e3ec5](https://github.com/molgenis/molgenis-frontend/commit/11e3ec5))
* [#286](https://github.com/molgenis/molgenis-frontend/issues/286) react to route change ([9bf391a](https://github.com/molgenis/molgenis-frontend/commit/9bf391a))
* add min/max correction to filter range ([a8cec1f](https://github.com/molgenis/molgenis-frontend/commit/a8cec1f))
* Add missing bootstrap vue css ([#283](https://github.com/molgenis/molgenis-frontend/issues/283)) ([7a27e72](https://github.com/molgenis/molgenis-frontend/commit/7a27e72))
* add missing range types ([50ebea5](https://github.com/molgenis/molgenis-frontend/commit/50ebea5))
* add one to many suport ([1ee82f3](https://github.com/molgenis/molgenis-frontend/commit/1ee82f3))
* add search to bookmark ([c4f31a0](https://github.com/molgenis/molgenis-frontend/commit/c4f31a0))
* added additional check for multifilter ([4cddf9a](https://github.com/molgenis/molgenis-frontend/commit/4cddf9a))
* added bookmarks to fetchMeta step ([ca7537a](https://github.com/molgenis/molgenis-frontend/commit/ca7537a))
* added more testdata ([78a9a2b](https://github.com/molgenis/molgenis-frontend/commit/78a9a2b))
* added some missing error handling ([1a26fe3](https://github.com/molgenis/molgenis-frontend/commit/1a26fe3))
* added test for bool. ([ffcf5f8](https://github.com/molgenis/molgenis-frontend/commit/ffcf5f8))
* added unittest for enum ([831b173](https://github.com/molgenis/molgenis-frontend/commit/831b173))
* bookmark now changes on removal of active filters ([a58ea1c](https://github.com/molgenis/molgenis-frontend/commit/a58ea1c))
* bump version of molgenis-ui-context to fix cookiewall bug ([#266](https://github.com/molgenis/molgenis-frontend/issues/266)) ([d5308a2](https://github.com/molgenis/molgenis-frontend/commit/d5308a2))
* change rsql rng to <> ([8d6bbcc](https://github.com/molgenis/molgenis-frontend/commit/8d6bbcc))
* data response table settings ([#313](https://github.com/molgenis/molgenis-frontend/issues/313)) ([8db7321](https://github.com/molgenis/molgenis-frontend/commit/8db7321))
* dont send undefined to the server ([8e9e2f7](https://github.com/molgenis/molgenis-frontend/commit/8e9e2f7))
* fixed active filters being rendered before filter definitions were loaded ([b84916e](https://github.com/molgenis/molgenis-frontend/commit/b84916e))
* fixed crash when definitions are undefined ([ff30d74](https://github.com/molgenis/molgenis-frontend/commit/ff30d74))
* fixed entity view not working correctly ([4213e1a](https://github.com/molgenis/molgenis-frontend/commit/4213e1a))
* fixed item being undefined when the last active filter is removed ([15be43c](https://github.com/molgenis/molgenis-frontend/commit/15be43c))
* greater and lesser filter should be the other wat around ([05fc59a](https://github.com/molgenis/molgenis-frontend/commit/05fc59a))
* halved speed ([261529f](https://github.com/molgenis/molgenis-frontend/commit/261529f))
* it works... somehow ([917bec4](https://github.com/molgenis/molgenis-frontend/commit/917bec4))
* menu collapse redone without overflow ([dd7f7c4](https://github.com/molgenis/molgenis-frontend/commit/dd7f7c4))
* metadata cache; make non blocking ([f545687](https://github.com/molgenis/molgenis-frontend/commit/f545687))
* redirect to login page on 401 ([36a2116](https://github.com/molgenis/molgenis-frontend/commit/36a2116))
* refactored items ([01a529e](https://github.com/molgenis/molgenis-frontend/commit/01a529e))
* **vue.config:** Add some more links to proxy config ([a1c033e](https://github.com/molgenis/molgenis-frontend/commit/a1c033e))
* regenerated yarn.lock ([1520b73](https://github.com/molgenis/molgenis-frontend/commit/1520b73))
* remove unused code ([09c8ba0](https://github.com/molgenis/molgenis-frontend/commit/09c8ba0))
* removed erroneous array index request ([f54f1c7](https://github.com/molgenis/molgenis-frontend/commit/f54f1c7))
* removed experimental version ([203a713](https://github.com/molgenis/molgenis-frontend/commit/203a713))
* removed undefined search results ([2231881](https://github.com/molgenis/molgenis-frontend/commit/2231881))
* Rename folders to lowercase to fix the app ([2e078e1](https://github.com/molgenis/molgenis-frontend/commit/2e078e1))
* renamed endpoint in tests ([44fbd7f](https://github.com/molgenis/molgenis-frontend/commit/44fbd7f))
* reverted pre-emptive systable merge ([c03bea9](https://github.com/molgenis/molgenis-frontend/commit/c03bea9))
* reverted time back ([06c9f81](https://github.com/molgenis/molgenis-frontend/commit/06c9f81))
* review comments ([2180f0a](https://github.com/molgenis/molgenis-frontend/commit/2180f0a))
* review comments ([f28626a](https://github.com/molgenis/molgenis-frontend/commit/f28626a))
* sanitize undefined from rsql ([c6af2b5](https://github.com/molgenis/molgenis-frontend/commit/c6af2b5))
* sanitize undefined from rsql ([8309722](https://github.com/molgenis/molgenis-frontend/commit/8309722))
* semantics for error ([025ba54](https://github.com/molgenis/molgenis-frontend/commit/025ba54))
* sonar code smells ([8fba484](https://github.com/molgenis/molgenis-frontend/commit/8fba484))
* ui-filters version bump ([#290](https://github.com/molgenis/molgenis-frontend/issues/290)) ([83ac924](https://github.com/molgenis/molgenis-frontend/commit/83ac924))
* undo deletion ([2db414e](https://github.com/molgenis/molgenis-frontend/commit/2db414e))
* **router:** updated base path ([53c9b70](https://github.com/molgenis/molgenis-frontend/commit/53c9b70))
* update e2e test mock path ([dccd903](https://github.com/molgenis/molgenis-frontend/commit/dccd903))
* used the correct array indexes ([3bb3965](https://github.com/molgenis/molgenis-frontend/commit/3bb3965))
* **SideBar:** Fix sidebar button ([474a6bf](https://github.com/molgenis/molgenis-frontend/commit/474a6bf))
* **tests:** Fix tests ([53fb6c4](https://github.com/molgenis/molgenis-frontend/commit/53fb6c4))
* **ToolBarView:** Fix renamed variable in state ([ff922be](https://github.com/molgenis/molgenis-frontend/commit/ff922be))
* **Typing:** Fix typing ([98e9a77](https://github.com/molgenis/molgenis-frontend/commit/98e9a77))
* **unittest:** updated unittest ([3dd4064](https://github.com/molgenis/molgenis-frontend/commit/3dd4064))
* **vue.config:** Update config to work with new backend ([85d8483](https://github.com/molgenis/molgenis-frontend/commit/85d8483))


### Features

* **card:** Make default card + merge with master ([4d5fd23](https://github.com/molgenis/molgenis-frontend/commit/4d5fd23))
* **data-explorer:** 7247 Use meta data for table structure ([d85678a](https://github.com/molgenis/molgenis-frontend/commit/d85678a))
* **data-explorer:** add active filters ([d452327](https://github.com/molgenis/molgenis-frontend/commit/d452327))
* **data-explorer:** Add add row/card button to toolbar ([a9164d4](https://github.com/molgenis/molgenis-frontend/commit/a9164d4))
* **data-explorer:** Add delete buttons ([f9607a4](https://github.com/molgenis/molgenis-frontend/commit/f9607a4))
* **data-explorer:** add rsql filter to data request if set ([#151](https://github.com/molgenis/molgenis-frontend/issues/151)) ([750c24d](https://github.com/molgenis/molgenis-frontend/commit/750c24d))
* **data-explorer:** Add search ([621763b](https://github.com/molgenis/molgenis-frontend/commit/621763b))
* **data-explorer:** added bootstrap logic to add settings if they are not present. ([c8b49d4](https://github.com/molgenis/molgenis-frontend/commit/c8b49d4))
* **data-explorer:** added modal to let admin know bootstrapping is in progress, ([020fd23](https://github.com/molgenis/molgenis-frontend/commit/020fd23))
* **data-explorer:** expandable card ([265ddb1](https://github.com/molgenis/molgenis-frontend/commit/265ddb1))
* **data-explorer:** Filters version bump and add compounds labels to filter list ([#298](https://github.com/molgenis/molgenis-frontend/issues/298)) ([1d0425f](https://github.com/molgenis/molgenis-frontend/commit/1d0425f))
* **data-explorer:** Fix login ([#132](https://github.com/molgenis/molgenis-frontend/issues/132)) ([91c028f](https://github.com/molgenis/molgenis-frontend/commit/91c028f))
* **data-explorer:** fixed tests ([ded22b9](https://github.com/molgenis/molgenis-frontend/commit/ded22b9))
* **data-explorer:** Hide / Show edit table settings btn ([c4120f5](https://github.com/molgenis/molgenis-frontend/commit/c4120f5))
* **data-explorer:** Hide/Show edit mode via context ([70fb7e7](https://github.com/molgenis/molgenis-frontend/commit/70fb7e7))
* **data-explorer:** Linkup tableSettings btn with data-row edit plugin ([cb90bcb](https://github.com/molgenis/molgenis-frontend/commit/cb90bcb))
* **data-explorer:** retrieve filtered data ([9efab2b](https://github.com/molgenis/molgenis-frontend/commit/9efab2b))
* **data-explorer:** Setup error handling in axios client ([b3a30b7](https://github.com/molgenis/molgenis-frontend/commit/b3a30b7))
* add alle filters have rsql ([95a9a2a](https://github.com/molgenis/molgenis-frontend/commit/95a9a2a))
* **data-explorer:** setup to release to experimental repository ([9fdafab](https://github.com/molgenis/molgenis-frontend/commit/9fdafab))
* add a data display limit and warning ([#296](https://github.com/molgenis/molgenis-frontend/issues/296)) ([56c97fe](https://github.com/molgenis/molgenis-frontend/commit/56c97fe))
* add active filters ([d0ed2b1](https://github.com/molgenis/molgenis-frontend/commit/d0ed2b1))
* Add chevron on hover and remove self from list ([c32336d](https://github.com/molgenis/molgenis-frontend/commit/c32336d))
* add date-time filter binding ([4df69d9](https://github.com/molgenis/molgenis-frontend/commit/4df69d9))
* Add greater and lesser rsql mapping for rangefilter ([ba2feff](https://github.com/molgenis/molgenis-frontend/commit/ba2feff))
* add more queryOptions to have control over the first options to show in multifilter ([1faf3a1](https://github.com/molgenis/molgenis-frontend/commit/1faf3a1))
* added all filters to bookmark, zipped it and encoded to base 64 ([175f6cd](https://github.com/molgenis/molgenis-frontend/commit/175f6cd))
* added bookmarkable shown filters. which can be added / removed by manipulating the url ([d3cc94f](https://github.com/molgenis/molgenis-frontend/commit/d3cc94f))
* added developmentcheck for https url rewrite ([611048e](https://github.com/molgenis/molgenis-frontend/commit/611048e))
* added filtermapper framework ([429e960](https://github.com/molgenis/molgenis-frontend/commit/429e960))
* added miltifilter logic ([3cdd487](https://github.com/molgenis/molgenis-frontend/commit/3cdd487))
* added optional rsql parameters to options ([843e8db](https://github.com/molgenis/molgenis-frontend/commit/843e8db))
* bookmark works, now the query needs to be correctly made ([82cae34](https://github.com/molgenis/molgenis-frontend/commit/82cae34))
* client error handling ([0a4ecfe](https://github.com/molgenis/molgenis-frontend/commit/0a4ecfe))
* filters shown are set in url, selections are set in url. ([6eb9aa5](https://github.com/molgenis/molgenis-frontend/commit/6eb9aa5))
* Improve search ux ([39acfc6](https://github.com/molgenis/molgenis-frontend/commit/39acfc6))
* made bookmarks working, ([14c6aa6](https://github.com/molgenis/molgenis-frontend/commit/14c6aa6))
* select table to explore ([1f797d6](https://github.com/molgenis/molgenis-frontend/commit/1f797d6))
* show molgenis errors if found ([7f02e47](https://github.com/molgenis/molgenis-frontend/commit/7f02e47))
* **data-explorer:** Use sys table settings ([4aa0d65](https://github.com/molgenis/molgenis-frontend/commit/4aa0d65))
* toggle edit btns based on context for table view ([17f5d01](https://github.com/molgenis/molgenis-frontend/commit/17f5d01))
* updated readme to reflect how to set env variable ([2384b48](https://github.com/molgenis/molgenis-frontend/commit/2384b48))
* **data-explorer:** trigger release ([831e521](https://github.com/molgenis/molgenis-frontend/commit/831e521))
* **defaultCard:** First implementation of default card ([c134860](https://github.com/molgenis/molgenis-frontend/commit/c134860))
* **DefaultCard:** Expand card on click ([e7d2a54](https://github.com/molgenis/molgenis-frontend/commit/e7d2a54))
* **DefaultCard:** WIP Add info button ([2ca49ad](https://github.com/molgenis/molgenis-frontend/commit/2ca49ad))
* **DefaultCardContent:** WIP ([081f113](https://github.com/molgenis/molgenis-frontend/commit/081f113))
* **filters:** add rsql query based upon filters ([8f9d2c3](https://github.com/molgenis/molgenis-frontend/commit/8f9d2c3))
* **options:** get the options ([421d6d3](https://github.com/molgenis/molgenis-frontend/commit/421d6d3))
* **settings:** Read settings from settings table ([ba558ef](https://github.com/molgenis/molgenis-frontend/commit/ba558ef))





# [0.34.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.33.0...@molgenis-experimental/data-explorer@0.34.0) (2020-07-27)


### Bug Fixes

* **data-explorer:** added a few seconds to timeout ([bf88ea6](https://github.com/molgenis/molgenis-frontend/commit/bf88ea6))
* halved speed ([261529f](https://github.com/molgenis/molgenis-frontend/commit/261529f))
* refactored items ([01a529e](https://github.com/molgenis/molgenis-frontend/commit/01a529e))
* renamed endpoint in tests ([44fbd7f](https://github.com/molgenis/molgenis-frontend/commit/44fbd7f))
* reverted time back ([06c9f81](https://github.com/molgenis/molgenis-frontend/commit/06c9f81))
* **data-explorer:** Fix bootstrapper unit test ([b5adcf7](https://github.com/molgenis/molgenis-frontend/commit/b5adcf7))
* **data-explorer:** fixed toast not showing correctly ([0a28cc9](https://github.com/molgenis/molgenis-frontend/commit/0a28cc9))
* **data-explorer:** removed codesmells ([bc692a9](https://github.com/molgenis/molgenis-frontend/commit/bc692a9))
* **unittest:** updated unittest ([3dd4064](https://github.com/molgenis/molgenis-frontend/commit/3dd4064))


### Features

* **data-explorer:** added bootstrap logic to add settings if they are not present. ([c8b49d4](https://github.com/molgenis/molgenis-frontend/commit/c8b49d4))
* **data-explorer:** added modal to let admin know bootstrapping is in progress, ([020fd23](https://github.com/molgenis/molgenis-frontend/commit/020fd23))





# [0.33.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.32.0...@molgenis-experimental/data-explorer@0.33.0) (2020-07-17)


### Bug Fixes

* **data-explorer:** build time missing type error ([1692753](https://github.com/molgenis/molgenis-frontend/commit/1692753))
* added some missing error handling ([1a26fe3](https://github.com/molgenis/molgenis-frontend/commit/1a26fe3))


### Features

* **data-explorer:** Setup error handling in axios client ([b3a30b7](https://github.com/molgenis/molgenis-frontend/commit/b3a30b7))
* client error handling ([0a4ecfe](https://github.com/molgenis/molgenis-frontend/commit/0a4ecfe))
* show molgenis errors if found ([7f02e47](https://github.com/molgenis/molgenis-frontend/commit/7f02e47))





# [0.32.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.31.1...@molgenis-experimental/data-explorer@0.32.0) (2020-07-07)


### Features

* **data-explorer:** Hide / Show edit table settings btn ([c4120f5](https://github.com/molgenis/molgenis-frontend/commit/c4120f5))





## [0.31.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.31.0...@molgenis-experimental/data-explorer@0.31.1) (2020-07-03)


### Bug Fixes

* **data-explorer:** updated ui-filter package to 1.11.1 ([e991020](https://github.com/molgenis/molgenis-frontend/commit/e991020))





# [0.31.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.30.1...@molgenis-experimental/data-explorer@0.31.0) (2020-07-01)


### Bug Fixes

* **data-explorer:** Add missing rights in default card ([3d491e6](https://github.com/molgenis/molgenis-frontend/commit/3d491e6))
* **data-explorer:** remove double call to context by re-using menu call result ([c39c085](https://github.com/molgenis/molgenis-frontend/commit/c39c085))


### Features

* **data-explorer:** Hide/Show edit mode via context ([70fb7e7](https://github.com/molgenis/molgenis-frontend/commit/70fb7e7))
* toggle edit btns based on context for table view ([17f5d01](https://github.com/molgenis/molgenis-frontend/commit/17f5d01))





## [0.30.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.30.0...@molgenis-experimental/data-explorer@0.30.1) (2020-07-01)


### Bug Fixes

* **data-explorer:** make lesser equal query work ([#321](https://github.com/molgenis/molgenis-frontend/issues/321)) ([225c103](https://github.com/molgenis/molgenis-frontend/commit/225c103))





# [0.30.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.29.1...@molgenis-experimental/data-explorer@0.30.0) (2020-06-29)


### Features

* add more queryOptions to have control over the first options to show in multifilter ([1faf3a1](https://github.com/molgenis/molgenis-frontend/commit/1faf3a1))





## [0.29.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.29.0...@molgenis-experimental/data-explorer@0.29.1) (2020-06-25)


### Bug Fixes

* reverted pre-emptive systable merge ([c03bea9](https://github.com/molgenis/molgenis-frontend/commit/c03bea9))





# [0.29.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.28.4...@molgenis-experimental/data-explorer@0.29.0) (2020-06-25)


### Bug Fixes

* update e2e test mock path ([dccd903](https://github.com/molgenis/molgenis-frontend/commit/dccd903))


### Features

* **data-explorer:** Use sys table settings ([4aa0d65](https://github.com/molgenis/molgenis-frontend/commit/4aa0d65))





## [0.28.4](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.28.3...@molgenis-experimental/data-explorer@0.28.4) (2020-06-22)


### Bug Fixes

* data response table settings ([#313](https://github.com/molgenis/molgenis-frontend/issues/313)) ([8db7321](https://github.com/molgenis/molgenis-frontend/commit/8db7321))
* redirect to login page on 401 ([36a2116](https://github.com/molgenis/molgenis-frontend/commit/36a2116))





## [0.28.3](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.28.2...@molgenis-experimental/data-explorer@0.28.3) (2020-06-15)

**Note:** Version bump only for package @molgenis-experimental/data-explorer





## [0.28.2](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.28.1...@molgenis-experimental/data-explorer@0.28.2) (2020-06-12)

**Note:** Version bump only for package @molgenis-experimental/data-explorer





## [0.28.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.28.0...@molgenis-experimental/data-explorer@0.28.1) (2020-06-12)


### Bug Fixes

* add search to bookmark ([c4f31a0](https://github.com/molgenis/molgenis-frontend/commit/c4f31a0))





# [0.28.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.27.0...@molgenis-experimental/data-explorer@0.28.0) (2020-05-28)


### Bug Fixes

* **data-explorer:** fix e2e test ([4ba9835](https://github.com/molgenis/molgenis-frontend/commit/4ba9835))
* **data-explorer:** remove unneeded margin to align column ([7ec5559](https://github.com/molgenis/molgenis-frontend/commit/7ec5559))
* **data-explorer:** Reset bookmark on table change ([31b1b3e](https://github.com/molgenis/molgenis-frontend/commit/31b1b3e))


### Features

* Add chevron on hover and remove self from list ([c32336d](https://github.com/molgenis/molgenis-frontend/commit/c32336d))
* select table to explore ([1f797d6](https://github.com/molgenis/molgenis-frontend/commit/1f797d6))





# [0.27.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.26.0...@molgenis-experimental/data-explorer@0.27.0) (2020-05-19)


### Bug Fixes

* added additional check for multifilter ([4cddf9a](https://github.com/molgenis/molgenis-frontend/commit/4cddf9a))
* added bookmarks to fetchMeta step ([ca7537a](https://github.com/molgenis/molgenis-frontend/commit/ca7537a))
* bookmark now changes on removal of active filters ([a58ea1c](https://github.com/molgenis/molgenis-frontend/commit/a58ea1c))
* fixed active filters being rendered before filter definitions were loaded ([b84916e](https://github.com/molgenis/molgenis-frontend/commit/b84916e))
* fixed crash when definitions are undefined ([ff30d74](https://github.com/molgenis/molgenis-frontend/commit/ff30d74))
* fixed entity view not working correctly ([4213e1a](https://github.com/molgenis/molgenis-frontend/commit/4213e1a))
* fixed item being undefined when the last active filter is removed ([15be43c](https://github.com/molgenis/molgenis-frontend/commit/15be43c))
* regenerated yarn.lock ([1520b73](https://github.com/molgenis/molgenis-frontend/commit/1520b73))
* undo deletion ([2db414e](https://github.com/molgenis/molgenis-frontend/commit/2db414e))


### Features

* added all filters to bookmark, zipped it and encoded to base 64 ([175f6cd](https://github.com/molgenis/molgenis-frontend/commit/175f6cd))
* added bookmarkable shown filters. which can be added / removed by manipulating the url ([d3cc94f](https://github.com/molgenis/molgenis-frontend/commit/d3cc94f))
* bookmark works, now the query needs to be correctly made ([82cae34](https://github.com/molgenis/molgenis-frontend/commit/82cae34))
* filters shown are set in url, selections are set in url. ([6eb9aa5](https://github.com/molgenis/molgenis-frontend/commit/6eb9aa5))
* made bookmarks working, ([14c6aa6](https://github.com/molgenis/molgenis-frontend/commit/14c6aa6))





# [0.26.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.25.0...@molgenis-experimental/data-explorer@0.26.0) (2020-05-18)


### Features

* **data-explorer:** Filters version bump and add compounds labels to filter list ([#298](https://github.com/molgenis/molgenis-frontend/issues/298)) ([1d0425f](https://github.com/molgenis/molgenis-frontend/commit/1d0425f))





# [0.25.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.24.0...@molgenis-experimental/data-explorer@0.25.0) (2020-05-13)


### Features

* **data-explorer:** trigger release ([831e521](https://github.com/molgenis/molgenis-frontend/commit/831e521))





# [0.24.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.23.3...@molgenis-experimental/data-explorer@0.24.0) (2020-05-13)


### Features

* add a data display limit and warning ([#296](https://github.com/molgenis/molgenis-frontend/issues/296)) ([56c97fe](https://github.com/molgenis/molgenis-frontend/commit/56c97fe))





## [0.23.3](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.23.2...@molgenis-experimental/data-explorer@0.23.3) (2020-05-13)


### Bug Fixes

* **data-explorer:** issue with stale template data and trying to render card before data was fetched ([a366cf3](https://github.com/molgenis/molgenis-frontend/commit/a366cf3))





## [0.23.2](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.23.1...@molgenis-experimental/data-explorer@0.23.2) (2020-05-12)


### Bug Fixes

* [#286](https://github.com/molgenis/molgenis-frontend/issues/286) react to route change ([9bf391a](https://github.com/molgenis/molgenis-frontend/commit/9bf391a))
* semantics for error ([025ba54](https://github.com/molgenis/molgenis-frontend/commit/025ba54))





## [0.23.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.23.0...@molgenis-experimental/data-explorer@0.23.1) (2020-05-06)


### Bug Fixes

* ui-filters version bump ([#290](https://github.com/molgenis/molgenis-frontend/issues/290)) ([83ac924](https://github.com/molgenis/molgenis-frontend/commit/83ac924))





# [0.23.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.22.0...@molgenis-experimental/data-explorer@0.23.0) (2020-04-22)


### Bug Fixes

* add min/max correction to filter range ([a8cec1f](https://github.com/molgenis/molgenis-frontend/commit/a8cec1f))
* dont send undefined to the server ([8e9e2f7](https://github.com/molgenis/molgenis-frontend/commit/8e9e2f7))
* greater and lesser filter should be the other wat around ([05fc59a](https://github.com/molgenis/molgenis-frontend/commit/05fc59a))
* removed erroneous array index request ([f54f1c7](https://github.com/molgenis/molgenis-frontend/commit/f54f1c7))
* sanitize undefined from rsql ([c6af2b5](https://github.com/molgenis/molgenis-frontend/commit/c6af2b5))
* sanitize undefined from rsql ([8309722](https://github.com/molgenis/molgenis-frontend/commit/8309722))
* used the correct array indexes ([3bb3965](https://github.com/molgenis/molgenis-frontend/commit/3bb3965))


### Features

* Add greater and lesser rsql mapping for rangefilter ([ba2feff](https://github.com/molgenis/molgenis-frontend/commit/ba2feff))





# [0.22.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.21.0...@molgenis-experimental/data-explorer@0.22.0) (2020-04-08)


### Features

* **data-explorer:** Add add row/card button to toolbar ([a9164d4](https://github.com/molgenis/molgenis-frontend/commit/a9164d4))
* **data-explorer:** Add delete buttons ([f9607a4](https://github.com/molgenis/molgenis-frontend/commit/f9607a4))





# [0.21.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.20.2...@molgenis-experimental/data-explorer@0.21.0) (2020-04-06)


### Features

* **data-explorer:** 7247 Use meta data for table structure ([d85678a](https://github.com/molgenis/molgenis-frontend/commit/d85678a))





## [0.20.2](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.20.1...@molgenis-experimental/data-explorer@0.20.2) (2020-04-03)


### Bug Fixes

* Add missing bootstrap vue css ([#283](https://github.com/molgenis/molgenis-frontend/issues/283)) ([7a27e72](https://github.com/molgenis/molgenis-frontend/commit/7a27e72))





## [0.20.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.20.0...@molgenis-experimental/data-explorer@0.20.1) (2020-03-27)


### Bug Fixes

* **data-explorer:** bump [@molgenis](https://github.com/molgenis)/molgenis-ui-context from 1.6.3 to 1.6.4 ([fbb7d52](https://github.com/molgenis/molgenis-frontend/commit/fbb7d52))





# [0.20.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.19.0...@molgenis-experimental/data-explorer@0.20.0) (2020-03-18)


### Features

* Improve search ux ([39acfc6](https://github.com/molgenis/molgenis-frontend/commit/39acfc6))





# [0.19.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.18.1...@molgenis-experimental/data-explorer@0.19.0) (2020-03-18)


### Features

* **data-explorer:** Add search ([621763b](https://github.com/molgenis/molgenis-frontend/commit/621763b))





## [0.18.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.18.0...@molgenis-experimental/data-explorer@0.18.1) (2020-03-11)

**Note:** Version bump only for package @molgenis-experimental/data-explorer





# [0.18.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.17.0...@molgenis-experimental/data-explorer@0.18.0) (2020-03-11)


### Bug Fixes

* add one to many suport ([1ee82f3](https://github.com/molgenis/molgenis-frontend/commit/1ee82f3))
* change rsql rng to <> ([8d6bbcc](https://github.com/molgenis/molgenis-frontend/commit/8d6bbcc))
* menu collapse redone without overflow ([dd7f7c4](https://github.com/molgenis/molgenis-frontend/commit/dd7f7c4))


### Features

* add date-time filter binding ([4df69d9](https://github.com/molgenis/molgenis-frontend/commit/4df69d9))
* added miltifilter logic ([3cdd487](https://github.com/molgenis/molgenis-frontend/commit/3cdd487))





# [0.17.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.16.0...@molgenis-experimental/data-explorer@0.17.0) (2020-03-09)


### Bug Fixes

* add missing range types ([50ebea5](https://github.com/molgenis/molgenis-frontend/commit/50ebea5))
* added more testdata ([78a9a2b](https://github.com/molgenis/molgenis-frontend/commit/78a9a2b))
* added test for bool. ([ffcf5f8](https://github.com/molgenis/molgenis-frontend/commit/ffcf5f8))
* added testcase for bool in RSQL mapper ([c0e0168](https://github.com/molgenis/molgenis-frontend/commit/c0e0168))
* added unittest for enum ([831b173](https://github.com/molgenis/molgenis-frontend/commit/831b173))
* it works... somehow ([917bec4](https://github.com/molgenis/molgenis-frontend/commit/917bec4))
* metadata cache; make non blocking ([f545687](https://github.com/molgenis/molgenis-frontend/commit/f545687))
* remove unused code ([09c8ba0](https://github.com/molgenis/molgenis-frontend/commit/09c8ba0))
* removed experimental version ([203a713](https://github.com/molgenis/molgenis-frontend/commit/203a713))
* removed undefined search results ([2231881](https://github.com/molgenis/molgenis-frontend/commit/2231881))
* review comments ([2180f0a](https://github.com/molgenis/molgenis-frontend/commit/2180f0a))
* review comments ([f28626a](https://github.com/molgenis/molgenis-frontend/commit/f28626a))
* sonar code smells ([8fba484](https://github.com/molgenis/molgenis-frontend/commit/8fba484))


### Features

* add alle filters have rsql ([95a9a2a](https://github.com/molgenis/molgenis-frontend/commit/95a9a2a))
* added developmentcheck for https url rewrite ([611048e](https://github.com/molgenis/molgenis-frontend/commit/611048e))
* added filtermapper framework ([429e960](https://github.com/molgenis/molgenis-frontend/commit/429e960))
* added optional rsql parameters to options ([843e8db](https://github.com/molgenis/molgenis-frontend/commit/843e8db))





# [0.16.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.15.1...@molgenis-experimental/data-explorer@0.16.0) (2020-03-09)


### Features

* updated readme to reflect how to set env variable ([2384b48](https://github.com/molgenis/molgenis-frontend/commit/2384b48))





## [0.15.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.15.0...@molgenis-experimental/data-explorer@0.15.1) (2020-02-06)


### Bug Fixes

* bump version of molgenis-ui-context to fix cookiewall bug ([#266](https://github.com/molgenis/molgenis-frontend/issues/266)) ([d5308a2](https://github.com/molgenis/molgenis-frontend/commit/d5308a2))





# [0.15.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.14.3...@molgenis-experimental/data-explorer@0.15.0) (2019-10-30)


### Bug Fixes

* **filters:** updated to 1.4.2 ([0672c53](https://github.com/molgenis/molgenis-frontend/commit/0672c53))


### Features

* add active filters ([d0ed2b1](https://github.com/molgenis/molgenis-frontend/commit/d0ed2b1))
* **data-explorer:** add active filters ([d452327](https://github.com/molgenis/molgenis-frontend/commit/d452327))
* **data-explorer:** fixed tests ([ded22b9](https://github.com/molgenis/molgenis-frontend/commit/ded22b9))





## [0.14.3](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.14.2...@molgenis-experimental/data-explorer@0.14.3) (2019-10-22)


### Bug Fixes

* **data-explorer:** show default filters ([5f43c96](https://github.com/molgenis/molgenis-frontend/commit/5f43c96))





## [0.14.2](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.14.1...@molgenis-experimental/data-explorer@0.14.2) (2019-10-17)

**Note:** Version bump only for package @molgenis-experimental/data-explorer





## [0.14.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.14.0...@molgenis-experimental/data-explorer@0.14.1) (2019-10-16)


### Bug Fixes

* **e2e:** Fix e2e timing ([b0e02bf](https://github.com/molgenis/molgenis-frontend/commit/b0e02bf))
* **SideBar:** Fix sidebar button ([474a6bf](https://github.com/molgenis/molgenis-frontend/commit/474a6bf))





# [0.14.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.13.1...@molgenis-experimental/data-explorer@0.14.0) (2019-10-16)


### Features

* **data-explorer:** Linkup tableSettings btn with data-row edit plugin ([cb90bcb](https://github.com/molgenis/molgenis-frontend/commit/cb90bcb))





## [0.13.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.13.0...@molgenis-experimental/data-explorer@0.13.1) (2019-10-16)

**Note:** Version bump only for package @molgenis-experimental/data-explorer





# [0.13.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.12.2...@molgenis-experimental/data-explorer@0.13.0) (2019-10-08)


### Bug Fixes

* **data-explorer:** change meta to attributes in getters ([be6ec2f](https://github.com/molgenis/molgenis-frontend/commit/be6ec2f))


### Features

* **data-explorer:** retrieve filtered data ([9efab2b](https://github.com/molgenis/molgenis-frontend/commit/9efab2b))
* **filters:** add rsql query based upon filters ([8f9d2c3](https://github.com/molgenis/molgenis-frontend/commit/8f9d2c3))





## [0.12.2](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.12.1...@molgenis-experimental/data-explorer@0.12.2) (2019-10-07)

**Note:** Version bump only for package @molgenis-experimental/data-explorer





## [0.12.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.12.0...@molgenis-experimental/data-explorer@0.12.1) (2019-10-07)


### Bug Fixes

* **data-explorer:** no history mode for router ([fb1a1f3](https://github.com/molgenis/molgenis-frontend/commit/fb1a1f3))





# [0.12.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.11.0...@molgenis-experimental/data-explorer@0.12.0) (2019-10-07)


### Features

* **data-explorer:** add rsql filter to data request if set ([#151](https://github.com/molgenis/molgenis-frontend/issues/151)) ([750c24d](https://github.com/molgenis/molgenis-frontend/commit/750c24d))





# [0.11.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.10.6...@molgenis-experimental/data-explorer@0.11.0) (2019-10-02)


### Features

* **options:** get the options ([421d6d3](https://github.com/molgenis/molgenis-frontend/commit/421d6d3))





## [0.10.6](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.10.5...@molgenis-experimental/data-explorer@0.10.6) (2019-10-02)


### Bug Fixes

* **data-explorer:** load deep data when showing clipboard  ([#148](https://github.com/molgenis/molgenis-frontend/issues/148)) ([14d185a](https://github.com/molgenis/molgenis-frontend/commit/14d185a))





## [0.10.5](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.10.4...@molgenis-experimental/data-explorer@0.10.5) (2019-10-02)


### Bug Fixes

* **data-explorer:** Always ask for id and label attrs as these are expected to always be present. ([1ed6b9c](https://github.com/molgenis/molgenis-frontend/commit/1ed6b9c))





## [0.10.4](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.10.3...@molgenis-experimental/data-explorer@0.10.4) (2019-10-02)


### Bug Fixes

* **data-explorer:** default store settings get overridden by non-existing props from server. ([d236196](https://github.com/molgenis/molgenis-frontend/commit/d236196))
* **data-explorer:** Remove e2e test as it is not really testing end use feature. ([19f89c4](https://github.com/molgenis/molgenis-frontend/commit/19f89c4))





## [0.10.3](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.10.2...@molgenis-experimental/data-explorer@0.10.3) (2019-10-02)


### Bug Fixes

* **data-explorer:** fix issue due to not checking for non mref reference types ([#145](https://github.com/molgenis/molgenis-frontend/issues/145)) ([217d4e0](https://github.com/molgenis/molgenis-frontend/commit/217d4e0))





## [0.10.2](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.10.1...@molgenis-experimental/data-explorer@0.10.2) (2019-09-26)


### Bug Fixes

* **data-explorer)(legacy-lib:** bump version to 1.3.4 to fix fallback link ([#139](https://github.com/molgenis/molgenis-frontend/issues/139)) ([48b51f8](https://github.com/molgenis/molgenis-frontend/commit/48b51f8))





## [0.10.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.10.0...@molgenis-experimental/data-explorer@0.10.1) (2019-09-25)

**Note:** Version bump only for package @molgenis-experimental/data-explorer





# [0.10.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.9.4...@molgenis-experimental/data-explorer@0.10.0) (2019-09-16)


### Features

* **data-explorer:** Fix login ([#132](https://github.com/molgenis/molgenis-frontend/issues/132)) ([91c028f](https://github.com/molgenis/molgenis-frontend/commit/91c028f))





## [0.9.4](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.9.3...@molgenis-experimental/data-explorer@0.9.4) (2019-09-13)


### Bug Fixes

* **CardView:** Fix cards broken for tables consisting of compounds only ([91ce318](https://github.com/molgenis/molgenis-frontend/commit/91ce318))
* **CardView:** Fix expand card for cards with id other than "id" ([3edc1bd](https://github.com/molgenis/molgenis-frontend/commit/3edc1bd))
* **CardViewTest:** Fix linting ([0103bec](https://github.com/molgenis/molgenis-frontend/commit/0103bec))
* **config:** Fix config for new server ([10c882d](https://github.com/molgenis/molgenis-frontend/commit/10c882d))
* **data-explorer:** Added simple html template ([7545201](https://github.com/molgenis/molgenis-frontend/commit/7545201))
* **data-explorer:** Added simple html template ([a3d447e](https://github.com/molgenis/molgenis-frontend/commit/a3d447e))
* **dataRepository:** Fix typing ([5910320](https://github.com/molgenis/molgenis-frontend/commit/5910320))
* **DefaultCard:** Make info link generic ([27aa622](https://github.com/molgenis/molgenis-frontend/commit/27aa622))
* **ExplorerCardTest:** Fix warning ([43ef39d](https://github.com/molgenis/molgenis-frontend/commit/43ef39d))
* **Typing:** Fix typing ([98e9a77](https://github.com/molgenis/molgenis-frontend/commit/98e9a77))





## [0.9.3](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.9.2...@molgenis-experimental/data-explorer@0.9.3) (2019-09-11)

**Note:** Version bump only for package @molgenis-experimental/data-explorer





## [0.9.2](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.9.1...@molgenis-experimental/data-explorer@0.9.2) (2019-08-30)

**Note:** Version bump only for package @molgenis-experimental/data-explorer





## [0.9.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.9.0...@molgenis-experimental/data-explorer@0.9.1) (2019-08-30)

**Note:** Version bump only for package @molgenis-experimental/data-explorer





# [0.9.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.8.7...@molgenis-experimental/data-explorer@0.9.0) (2019-08-30)


### Bug Fixes

* **data-explorer:** remove double 'card' class ([ad1e486](https://github.com/molgenis/molgenis-frontend/commit/ad1e486))
* **data-explorer:** update unit test to fix test failure, add missing required props and mock data ([758937f](https://github.com/molgenis/molgenis-frontend/commit/758937f))
* **ToolBarView:** Fix renamed variable in state ([ff922be](https://github.com/molgenis/molgenis-frontend/commit/ff922be))
* **vue.config:** Add some more links to proxy config ([a1c033e](https://github.com/molgenis/molgenis-frontend/commit/a1c033e))


### Features

* **data-explorer:** expandable card ([265ddb1](https://github.com/molgenis/molgenis-frontend/commit/265ddb1))
* **DefaultCard:** Expand card on click ([e7d2a54](https://github.com/molgenis/molgenis-frontend/commit/e7d2a54))
* **DefaultCard:** WIP Add info button ([2ca49ad](https://github.com/molgenis/molgenis-frontend/commit/2ca49ad))





## [0.8.7](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.8.6...@molgenis-experimental/data-explorer@0.8.7) (2019-08-29)


### Bug Fixes

* **data-explorer:** Added the correct url to molgenis bootstrap style ([#113](https://github.com/molgenis/molgenis-frontend/issues/113)) ([e25a2c5](https://github.com/molgenis/molgenis-frontend/commit/e25a2c5))





## [0.8.6](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.8.5...@molgenis-experimental/data-explorer@0.8.6) (2019-08-28)

**Note:** Version bump only for package @molgenis-experimental/data-explorer





## [0.8.5](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.8.4...@molgenis-experimental/data-explorer@0.8.5) (2019-08-28)


### Bug Fixes

* **data-explorer:** Changed naming. ( Value was fliped from what you would expect from naming ) ([0a8d70a](https://github.com/molgenis/molgenis-frontend/commit/0a8d70a))





## [0.8.4](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.8.3...@molgenis-experimental/data-explorer@0.8.4) (2019-08-28)


### Bug Fixes

* **data-explorer:** Fixed broken clipboard ([7d963aa](https://github.com/molgenis/molgenis-frontend/commit/7d963aa))





## [0.8.3](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.8.2...@molgenis-experimental/data-explorer@0.8.3) (2019-08-28)


### Bug Fixes

* **data-explorer:** fixed broken table after internal data change ([cf3b08d](https://github.com/molgenis/molgenis-frontend/commit/cf3b08d))





## [0.8.2](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.8.1...@molgenis-experimental/data-explorer@0.8.2) (2019-08-28)

**Note:** Version bump only for package @molgenis-experimental/data-explorer





## [0.8.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.8.0...@molgenis-experimental/data-explorer@0.8.1) (2019-08-28)

**Note:** Version bump only for package @molgenis-experimental/data-explorer





# [0.8.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.7.2...@molgenis-experimental/data-explorer@0.8.0) (2019-08-28)


### Bug Fixes

* **tests:** Fix tests ([53fb6c4](https://github.com/molgenis/molgenis-frontend/commit/53fb6c4))
* Rename folders to lowercase to fix the app ([2e078e1](https://github.com/molgenis/molgenis-frontend/commit/2e078e1))


### Features

* **card:** Make default card + merge with master ([4d5fd23](https://github.com/molgenis/molgenis-frontend/commit/4d5fd23))
* **defaultCard:** First implementation of default card ([c134860](https://github.com/molgenis/molgenis-frontend/commit/c134860))
* **DefaultCardContent:** WIP ([081f113](https://github.com/molgenis/molgenis-frontend/commit/081f113))





## [0.7.2](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.7.1...@molgenis-experimental/data-explorer@0.7.2) (2019-08-22)


### Bug Fixes

* **data-explorer:** Fixed broken tests ([da6cd5f](https://github.com/molgenis/molgenis-frontend/commit/da6cd5f))





## [0.7.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.7.0...@molgenis-experimental/data-explorer@0.7.1) (2019-08-22)


### Bug Fixes

* **actions.spec:** Fix test ([a6e5db0](https://github.com/molgenis/molgenis-frontend/commit/a6e5db0))
* **vue.config:** Update config to work with new backend ([85d8483](https://github.com/molgenis/molgenis-frontend/commit/85d8483))





# [0.7.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.6.2...@molgenis-experimental/data-explorer@0.7.0) (2019-08-21)


### Bug Fixes

* **DataView:** Do not render the button when activeEntity is empty ([d930d9c](https://github.com/molgenis/molgenis-frontend/commit/d930d9c))


### Features

* **settings:** Read settings from settings table ([ba558ef](https://github.com/molgenis/molgenis-frontend/commit/ba558ef))





## [0.6.2](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.6.1...@molgenis-experimental/data-explorer@0.6.2) (2019-08-21)


### Bug Fixes

* **router:** updated base path ([53c9b70](https://github.com/molgenis/molgenis-frontend/commit/53c9b70))





## [0.6.1](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-experimental/data-explorer@0.6.0...@molgenis-experimental/data-explorer@0.6.1) (2019-08-21)


### Bug Fixes

* **packageJson:** include packageJson as well ([11e3ec5](https://github.com/molgenis/molgenis-frontend/commit/11e3ec5))





# 0.6.0 (2019-08-20)


### Bug Fixes

* fixed e2e test ([c85ba22](https://github.com/molgenis/molgenis-frontend/commit/c85ba22))
* **data-explorer:** Removed double slash in url ([1dab735](https://github.com/molgenis/molgenis-frontend/commit/1dab735))


### Features

* Added filters ([e25fee1](https://github.com/molgenis/molgenis-frontend/commit/e25fee1))
* **data-explorer:** Add filters ([bf36ed7](https://github.com/molgenis/molgenis-frontend/commit/bf36ed7))
* **data-explorer:** Add placeholder and empty tests ([b9056b9](https://github.com/molgenis/molgenis-frontend/commit/b9056b9))
* **data-explorer:** Add router ([9ba3f7b](https://github.com/molgenis/molgenis-frontend/commit/9ba3f7b))
* **data-explorer:** Add shoppingcart ([#96](https://github.com/molgenis/molgenis-frontend/issues/96)) ([ceaf966](https://github.com/molgenis/molgenis-frontend/commit/ceaf966))
* **data-explorer:** setup to release to experimental repository ([9fdafab](https://github.com/molgenis/molgenis-frontend/commit/9fdafab))





# [0.5.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@0.4.0...@molgenis-ui/data-explorer@0.5.0) (2019-08-19)


### Features

* **data-explorer:** Add shoppingcart ([#96](https://github.com/molgenis/molgenis-frontend/issues/96)) ([ceaf966](https://github.com/molgenis/molgenis-frontend/commit/ceaf966))





# [0.4.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@0.3.0...@molgenis-ui/data-explorer@0.4.0) (2019-08-06)


### Bug Fixes

* **data-explorer:** Removed double slash in url ([1dab735](https://github.com/molgenis/molgenis-frontend/commit/1dab735))


### Features

* **data-explorer:** Add placeholder and empty tests ([b9056b9](https://github.com/molgenis/molgenis-frontend/commit/b9056b9))





# [0.3.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@0.2.0...@molgenis-ui/data-explorer@0.3.0) (2019-07-24)


### Features

* **data-explorer:** Add router ([9ba3f7b](https://github.com/molgenis/molgenis-frontend/commit/9ba3f7b))





# [0.2.0](https://github.com/molgenis/molgenis-frontend/compare/@molgenis-ui/data-explorer@0.1.1...@molgenis-ui/data-explorer@0.2.0) (2019-07-24)


### Features

* Added filters ([e25fee1](https://github.com/molgenis/molgenis-frontend/commit/e25fee1))
* **data-explorer:** Add filters ([bf36ed7](https://github.com/molgenis/molgenis-frontend/commit/bf36ed7))





## 0.1.1 (2019-07-18)


### Bug Fixes

* fixed e2e test ([c85ba22](https://github.com/molgenis/molgenis-frontend/commit/c85ba22))
