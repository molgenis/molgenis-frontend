## Context
**Deprecated**

The MOLGENIS context app provides MOLGENIS with the following components:

- HeaderComponent (menu)
- FooterComponent (footer)
- CookieWall (cookie questions)

> note: This is legacy frontend code. The new Apps use the @molgenis/molgenis-ui-context module directly. This serves only the integration with the old MOLGENIS plugins.

### Testing
We use the index.html and the App.vue to test the different components. These are not exported in the build. Only the actual components of ```@molgenis/molgenis-ui-context``` are included.

To view the mock instance, please run:

```yarn serve```

Access the application on:

```http://localhost:8081```

### Integration
The integration in MOLGENIS resides on the proxy configuration within the frontend. Here we specify the version of the context module in the Docker image.
- docker/proxy-config/proxy.d/frontend/lts.conf
- docker/proxy-config/proxy.d/frontend/stable.conf

The file references are located in:

- molgenis/molgenis-core-ui/src/main/resources/templats/molgenis-header.ftl
  - HeaderComponent
  - CookieWall
- molgenis/molgenis-core-ui/src/main/resources/templats/molgenis-footer.ftl
  - FooterComponent