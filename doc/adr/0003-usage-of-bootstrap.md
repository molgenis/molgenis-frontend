# 3. Use Bootstrap

Date: 2020-09-24

## Status

Pending

## Context

For all our projects we use Bootstrap theming. We currently use (sometimes) the
Vue wrapper for this framework, called Bootstrap-Vue. 


## Decision

We will stop using Bootstrap Vue and organically refactor the usage overtime
to remove the additional external dependancy

## Consequences

- We accept that the jQuery and Popper dependant function are not compatible with the Vue framework and might not work as expected

```
These functions include:

-   Affix
-   Alert
-   Button
-   Carousel
-   Collapse
-   Dropdown
-   Modal
-   Popover
-   Scrollspy
-   Tab
-   Tooltip
```

- We limit ourselves to use the Bootstrap CSS to avoid incompatibility issues 
