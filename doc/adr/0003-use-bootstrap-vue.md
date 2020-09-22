# 3. Use Bootstrap Vue

Date: 2020-09-24

## Status

Pending

## Context

For all our projects we use Bootstrap theming. We currently use (sometimes) the
Vue wrapper for this framework, called Bootstrap-Vue and we want to make this decision explicit.

### Reason:

> Some Bootstrap 4 functions require jQuery, Popper.js, and these functions will conflict with Vue. (These functions modify the DOM directly. Vue won't keep track of these modifications. Any changes made using jQuery could be overwritten by Vue.)


The following functions are affected:
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

Bootstrap-vue converted most of these functions into Vue, so that it works as expected.

## Decision

We will use Bootstrap Vue as a dependancy to help us style and compose our applications. 

## Consequences

- We have an external dependency for our projects.
- We need to learn BootstrapVue, Bootstrap and Vue