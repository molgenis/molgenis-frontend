# TROUBLESHOOTING
This guide is for all the things you encounter setting up the build environment for the MOLGENIS frontend.

## Setting up node and yarn
If you setup node and yarn please check:

- **NodeJS**
  - Windows: [NVM for Windows](https://github.com/coreybutler/nvm-windows)
  - Mac and Linux: [NVM](https://github.com/creationix/nvm)
- **Yarn**
  - Windows: Download yarn MSI file from [yarn website](https://yarnpkg.com/)
  - Mac and Linux: ```curl -o- -L https://yarnpkg.com/install.sh | bash```
    Could be usefull to reload your terminal, because of updates in you ```.bash_profile```

### Using NVM
To install NodeJS or a new version of NodeJS on your system please follow the steps below.

*Mac or Linux*
```bash
# to install node (latest)
nvm install node

# to use a specific version of node
nvm list
nvm use #node version#
```

*Windows*
```powershell
# to install node (latest)
nvm install node

# to use a specific version of node
nvm list
nvm use #node version#
```

