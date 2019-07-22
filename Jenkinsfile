pipeline {
    agent {
        kubernetes {
            label 'node-carbon'
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
                        env.GITHUB_TOKEN = sh(script: 'vault read -field=value secret/ops/token/github', returnStdout: true)
                        env.CODECOV_TOKEN = sh(script: 'vault read -field=molgenis-frontend secret/ops/token/codecov', returnStdout: true)
                        env.NEXUS_AUTH = sh(script: 'vault read -field=base64 secret/ops/account/nexus', returnStdout: true)
                        env.DOCKERHUB_AUTH = sh(script: 'vault read -field=value secret/ops/token/dockerhub', returnStdout: true)
                        env.NPM_TOKEN = sh(script: 'vault read -field=value secret/ops/token/npm', returnStdout: true)
                    }
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
                    sh "yarn install"
                    sh "yarn lerna bootstrap"
                    sh "yarn lerna run unit"
                    sh "yarn lerna run build"
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
                TAG = "PR-${CHANGE_ID}-${BUILD_NUMBER}"
                DOCKER_CONFIG="/root/.docker"
            }
            steps {
                container (name: 'kaniko', shell: '/busybox/sh') {
                    sh "#!/busybox/sh\nmkdir -p ${DOCKER_CONFIG}"
                    sh "#!/busybox/sh\necho '{\"auths\": {\"registry.molgenis.org\": {\"auth\": \"${NEXUS_AUTH}\"}}}' > ${DOCKER_CONFIG}/config.json"
                    sh "#!/busybox/sh\n. ${WORKSPACE}/docker/preview-config/copy_package_dist_dirs.sh"
                    sh "#!/busybox/sh\n/kaniko/executor --context ${WORKSPACE}/docker/preview-config --destination ${LOCAL_REPOSITORY}:${TAG}"
                }
            }
        }
        stage('Deploy preview [ PR ]') {
            when {
                changeRequest()
            }
            environment {
                TAG = "PR-${CHANGE_ID}-${BUILD_NUMBER}"
                NAME = "preview-frontend-${TAG.toLowerCase()}"
            }
            steps {
                container('vault') {
                    sh "mkdir /home/jenkins/.rancher"
                    sh 'vault read -field=value secret/ops/jenkins/rancher/cli2.json > /home/jenkins/.rancher/cli2.json'
                }
                container('rancher') {
                    sh "rancher context switch dev-molgenis"
                    sh "rancher apps install " +
                        "cattle-global-data:molgenis-helm-molgenis-frontend " +
                        "${NAME} " +
                        "--no-prompt " +
                        "--set environment=dev " +
                        "--set image.tag=${TAG} " +
                        "--set image.repository=${LOCAL_REGISTRY} " +
                        "--set proxy.backend.url=http://master-molgenis.molgenis-abcde.svc:8080 " +
                        "--set image.pullPolicy=Always"
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
                    sh "yarn lerna run build"
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
                            sh "#!/busybox/sh\necho '{\"auths\": {\"registry.hub.docker.com\": {\"auth\": \"${DOCKERHUB_AUTH}\"}}}' > ${DOCKER_CONFIG}/config.json"
                            sh "#!/busybox/sh\n/kaniko/executor --context ${WORKSPACE}/docker/proxy-config --build-arg MOLGENIS_VERSION=lts --destination ${REPOSITORY}:${TAG}-lts"
                            sh "#!/busybox/sh\n/kaniko/executor --context ${WORKSPACE}/docker/proxy-config --build-arg MOLGENIS_VERSION=stable --destination ${REPOSITORY}:${TAG}-stable"
                            sh "#!/busybox/sh\n/kaniko/executor --context ${WORKSPACE}/docker/proxy-config --build-arg MOLGENIS_VERSION=latest --destination ${REPOSITORY}:latest"
                        }
                    }
                }
            }
        }
    }
    post{
        success {
            hubotSend(message: 'Build success', status:'INFO', site: 'slack-pr-app-team')
        }
        failure {
            hubotSend(message: 'Build failed', status:'ERROR', site: 'slack-pr-app-team')
        }
    }
}
