## Legacy lib
**Deprecated**

The MOLGENIS legacy library. It contains all the components which are compiled committed in the MOLGENIS repository.

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