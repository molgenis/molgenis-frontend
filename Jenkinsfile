pipeline {
    agent {
        kubernetes {
            label 'node-erbium'
        }
    }
    environment {
        REPOSITORY = 'molgenis/molgenis-frontend'
        LOCAL_REPOSITORY = "${LOCAL_REGISTRY}/molgenis/molgenis-frontend"
        npm_config_registry = "https://registry.npmjs.org"
    }
    stages {
        stage('Prepare') {
            steps {
                script {
                    env.GIT_COMMIT = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
                }
                container('vault') {
                    script {
                        env.TUNNEL_IDENTIFIER = sh(script: 'echo ${GIT_COMMIT}-${BUILD_NUMBER}', returnStdout: true)
                        env.GITHUB_TOKEN = sh(script: 'vault read -field=value secret/ops/token/github', returnStdout: true)
                        env.CODECOV_TOKEN = sh(script: 'vault read -field=molgenis-frontend secret/ops/token/codecov', returnStdout: true)
                        env.NEXUS_AUTH = sh(script: 'vault read -field=base64 secret/ops/account/nexus', returnStdout: true)
                        env.DOCKERHUB_AUTH = sh(script: 'vault read -field=value secret/gcc/token/dockerhub', returnStdout: true)
                        env.NPM_TOKEN = sh(script: 'vault read -field=value secret/ops/token/npm', returnStdout: true)
                        env.SONAR_TOKEN = sh(script: 'vault read -field=value secret/ops/token/sonar', returnStdout: true)
                        env.SAUCE_CRED_USR = sh(script: 'vault read -field=username secret/ops/token/saucelabs', returnStdout: true)
                        env.SAUCE_CRED_PSW = sh(script: 'vault read -field=value secret/ops/token/saucelabs', returnStdout: true)
                    }
                }
                container('node') {
                    sh "daemon --name=sauceconnect -- /usr/local/bin/sc -u ${SAUCE_CRED_USR} -k ${SAUCE_CRED_PSW} -i ${TUNNEL_IDENTIFIER}"
                }
                sh "git remote set-url origin https://${GITHUB_TOKEN}@github.com/${REPOSITORY}.git"
                sh "git fetch --tags"
            }
        }
        stage('Install and test: [ pull request ]') {
            when {
                changeRequest()
            }
            steps {
                container('node') {
                    sh "git fetch --no-tags origin ${CHANGE_TARGET}:refs/remotes/origin/${CHANGE_TARGET}" // For lerna
                    sh "yarn install"
                    sh "npm config set unsafe-perm true"
                    sh "yarn lerna bootstrap --since origin/master"
                    sh "yarn lerna run unit --since origin/master"
                    // Todo reenable safari when bug is fixed, https://bugs.webkit.org/show_bug.cgi?id=202589
                    sh "yarn lerna run e2e -- --since origin/master -- --env ci_chrome,ci_firefox"
                }
                container('sonar') {
                    // Fetch the target branch, sonar likes to take a look at it
                    sh "git fetch --no-tags origin ${CHANGE_TARGET}:refs/remotes/origin/${CHANGE_TARGET}"
                    sh "sonar-scanner -Dsonar.login=${env.SONAR_TOKEN} -Dsonar.github.oauth=${env.GITHUB_TOKEN} -Dsonar.pullrequest.base=${CHANGE_TARGET} -Dsonar.pullrequest.branch=${BRANCH_NAME} -Dsonar.pullrequest.key=${env.CHANGE_ID} -Dsonar.pullrequest.provider=GitHub -Dsonar.pullrequest.github.repository=molgenis/molgenis-frontend"
                }
            }
            post {
                always {
                    container('node') {
                        sh "curl -s https://codecov.io/bash | bash -s - -c -F unit -K -C ${GIT_COMMIT}"
                    }
                }
            }
        }
        stage('Build container serving the artifacts [ PR ]') {
            when {
                changeRequest()
            }
            environment {
                TAG = "PR-${CHANGE_ID}"
                DOCKER_CONFIG="/root/.docker"
            }
            steps {
                container('node') {
                    sh "yarn lerna run build --since origin/master"
                    sh "yarn lerna run styleguide:build -- --since origin/master --scope @molgenis-ui/components-library"
                }
                container (name: 'kaniko', shell: '/busybox/sh') {
                    sh "#!/busybox/sh\nmkdir -p ${DOCKER_CONFIG}"
                    sh "#!/busybox/sh\necho '{\"auths\": {\"registry.molgenis.org\": {\"auth\": \"${NEXUS_AUTH}\"}}}' > ${DOCKER_CONFIG}/config.json"
                    sh "#!/busybox/sh\n. ${WORKSPACE}/docker/preview-config/copy_package_dist_dirs.sh"
                    sh "#!/busybox/sh\n. ${WORKSPACE}/docker/preview-config/copy_component_styleguide.sh"
                    sh "#!/busybox/sh\n/kaniko/executor --context ${WORKSPACE}/docker/preview-config --destination ${LOCAL_REPOSITORY}:${TAG}"
                }
            }
        }
        stage('Deploy preview [ PR ]') {
            when {
                changeRequest()
            }
            environment {
                TAG = "PR-${CHANGE_ID}"
                NAME = "preview-frontend-${TAG.toLowerCase()}"
            }
            steps {
                container('vault') {
                    sh "mkdir ${JENKINS_AGENT_WORKDIR}/.rancher"
                    sh "vault read -field=value secret/ops/jenkins/rancher/cli2.json > ${JENKINS_AGENT_WORKDIR}/.rancher/cli2.json"
                }
                container('rancher') {
                    sh "rancher apps delete ${NAME} || true" 
                    sh "sleep 5s" // wait for deletion
                    sh "rancher apps install " +
                        "cattle-global-data:molgenis-helm-molgenis-frontend " +
                        "${NAME} " +
                        "--no-prompt " +
                        "--set environment=dev " +
                        "--set image.tag=${TAG} " +
                        "--set image.repository=${LOCAL_REGISTRY} " +
                        "--set proxy.backend.service.targetNamespace=molgenis-abcde " +
                        "--set proxy.backend.service.targetRelease=master " +
                        "--set image.pullPolicy=Always " +
                        "--set readinessPath=/@molgenis-ui/heartbeat.txt"
                }
            }
            post {
                success {
                    hubotSend(message: "PR Preview available on https://${NAME}.dev.molgenis.org", status:'INFO', site: 'slack-pr-app-team')
                    container('node') {
                        sh "set +x; curl -X POST -H 'Content-Type: application/json' -H 'Authorization: token ${GITHUB_TOKEN}' " +
                            "--data '{\"body\":\":star: PR Preview available on https://${NAME}.dev.molgenis.org\"}' " +
                            "https://api.github.com/repos/molgenis/molgenis-frontend/issues/${CHANGE_ID}/comments"
                    }
                }
            }
        }
        stage('Install, test and build: [ master ]') {
            when {
                branch 'master'
            }
            steps {
                container('node') {
                    sh "yarn install"
                    sh "yarn lerna bootstrap"
                    sh "yarn lerna run unit"
                    // Todo reenable safari when bug is fixed, https://bugs.webkit.org/show_bug.cgi?id=202589
                    sh "yarn lerna run e2e -- --scope @molgenis-ui/questionnaires -- --env ci_chrome,ci_ie11,ci_firefox"
                    // Todo reenable safari when bug is fixed, https://bugs.webkit.org/show_bug.cgi?id=202589
                    sh "yarn lerna run e2e -- --scope @molgenis-ui/data-explorer -- --env ci_chrome,ci_firefox"
                    sh "yarn lerna run build"
                    sh "yarn lerna run styleguide:build -- --scope @molgenis-ui/components-library"
                }
                container('sonar') {
                    sh "sonar-scanner"
                }
            }
            post {
                always {
                    container('node') {
                        sh "curl -s https://codecov.io/bash | bash -s - -c -F unit -K -C ${GIT_COMMIT}"
                    }
                }
            }
        }
        stage('Release: [ master ]') {
            when {
                allOf {
                    branch 'master'
                    not {
                        changelog '.*\\[skip ci\\]$'
                    }
                }
            }
            environment {
                GIT_AUTHOR_EMAIL = 'molgenis+ci@gmail.com'
                GIT_AUTHOR_NAME = 'molgenis-jenkins'
                GIT_COMMITTER_EMAIL = 'molgenis+ci@gmail.com'
                GIT_COMMITTER_NAME = 'molgenis-jenkins'
                TAG = '8'
                DOCKER_CONFIG='/root/.docker'
            }
            stages {
                stage('Build and publish: [master]') {
                    steps {
                        milestone 1
                        container('node') {
                            sh "set +x; npm set //registry.npmjs.org/:_authToken ${NPM_TOKEN}"
                            sh "yarn lerna publish"
                        }
                    }
                }
                stage('Release docker image: [ master ]') {
                    steps {
                        container (name: 'kaniko', shell: '/busybox/sh') {
                            sh "#!/busybox/sh\nmkdir -p ${DOCKER_CONFIG}"
                            sh "#!/busybox/sh\necho '{\"auths\": {\"https://index.docker.io/v1/\": {\"auth\": \"${DOCKERHUB_AUTH}\"}}}' > ${DOCKER_CONFIG}/config.json"
                            sh "#!/busybox/sh\n/kaniko/executor --context ${WORKSPACE}/docker/proxy-config --build-arg MOLGENIS_VERSION=lts --destination ${REPOSITORY}:${TAG}-lts"
                            sh "#!/busybox/sh\n/kaniko/executor --context ${WORKSPACE}/docker/proxy-config --build-arg MOLGENIS_VERSION=stable --destination ${REPOSITORY}:${TAG}-stable"
                            sh "#!/busybox/sh\n/kaniko/executor --context ${WORKSPACE}/docker/proxy-config --build-arg MOLGENIS_VERSION=latest --destination ${REPOSITORY}:latest"
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            container('node') {
                sh "daemon --name=sauceconnect --stop"
            }
        }
        success {
            hubotSend(message: 'Build success', status:'INFO', site: 'slack-pr-app-team')
        }
        failure {
            hubotSend(message: 'Build failed', status:'ERROR', site: 'slack-pr-app-team')
        }
    }
}
