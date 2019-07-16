# Frontend deployment
The frontend deployment is deployed with an NGINX docker image at the moment. We run production releases for test, acceptance and production. For development we use the preview images.

## Production (for test, acceptance and production environments)

### Developing

### Testing
You can test the deployment using ```docker-compose.yaml```
By executing ```docker-compose up``` you can test the container using **unpkg.com** as tbe service that is serving the frontend. The image that is used to run the production frontends is composed of a set of apps with certain major versions defined in the ```docker/production/conf.d/frontend/stable.conf``` file.

```
location /@molgenis-ui/app-manager/ {
  proxy_pass https://unpkg.com/@molgenis-ui/app-manager**@~0**/;
  proxy_intercept_errors on;
  recursive_error_pages on;
  error_page 301 302 307 = @handle_redirect;
}
```

The highlighted part is representing the major version resolvement. There in total 3 different setups you can have in your app.

- **lts.conf**
  Contains the longtime support versions of apps that are compatible with a specific major version of MOLGENIS. The tag is called for example **8-lts**
- **stable.conf**
  Contains the stable versions of apps that are compatible with a specific major version of MOLGENIS. These contain the bugfixes and features that are deployed a long the way as well. The tag is called for example **8-stable**
- **latest.conf**
  Contains all the last versions of apps which are at least compatible with the development version of MOLGENIS.

The configuration files which are always deployed are:

- **experimental.conf**
  Contains all apps thaat are publish to @molgenis-experimental scope on https://npmjs.org
- **common.conf**
  Adds the redirect configuration for the proxy
- **backend.conf**
  Adds the MOLGENIS backend configuration

### Building
The production image is build during a merge with the master. At this moment the tag is set to **8**. This is managed manually. When you want to deploy a new set of apps with a different tag you need to update it in the Jenkinsfile.

## Previews (PR-flow)
The CI is setup differently. We have an image of NGINX which serves all the frontend files to preview the latest changes in the frontend repository. You can find the preview on preview-frontend-PR-#CHANGE_ID#-#BUILD_NUMBER#.dev.molgenis.org. 

## Deployment
We are now only deploying the frontend at dev time or in production on the cluster. For production usage you can point at the **molgenis-frontend** chart in Rancher. you can choose of three version of MOLGENIS

- 8-lts 
- 8-stable
- latest

These version represent the apps that a going to be served.







