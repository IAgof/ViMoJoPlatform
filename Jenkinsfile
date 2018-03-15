pipeline {
    agent { node { label 'docker-ci' } }

    environment {
        DOCKER_MACHINE_IP = ''
        COMPOSE_CHAIN = "-f docker-compose.yml -f docker-compose.override.yml -f jenkins-vars.yml"
        DOCKER_MACHINE_NAME = "mojofy.jenkins.aws.t2medium"
    }


    stages {
        stage('Clone repository') {
            steps {
                checkout([
                      $class: 'GitSCM',
                      branches: scm.branches,
                      doGenerateSubmoduleConfigurations: true,
                      extensions: scm.extensions + [[$class: 'SubmoduleOption', parentCredentials: true]],
                      userRemoteConfigs: scm.userRemoteConfigs
                ])
            }
        }

        stage("Create docker-machine") {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'videonaAWS',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh "docker-machine create -d amazonec2 --amazonec2-access-key ${AWS_ACCESS_KEY_ID} \
                        --amazonec2-secret-key ${AWS_SECRET_ACCESS_KEY} --amazonec2-region us-east-1  \
                        --amazonec2-zone a --amazonec2-vpc-id vpc-bc023cd8 --amazonec2-security-group mojofy-testing \
                        --amazonec2-instance-type t2.medium ${DOCKER_MACHINE_NAME}"
                }
                //DOCKER_MACHINE_IP = sh (
                //    script: "docker-machine ip ${DOCKER_MACHINE_NAME}",
                //    returnStdout: true
                //    ).trim()

            }
        }

        stage("Build and start test image") {
            steps {
                withEnv(["FLAVOUR=vimojo DOCKER_MACHINE_IP=${DOCKER_MACHINE_IP}"]) {
                    //DOCKER_MACHINE_IP=172.31.59.47
                    //DOCKER_MACHINE_IP=`docker-machine ip ${DOCKER_MACHINE_NAME}`
                    sh "docker-compose ${COMPOSE_CHAIN} build"
                    sh "docker-compose ${COMPOSE_CHAIN} up -d"
                }
            }
        }

        stage("Run tests") {
            steps {
                sh "mkdir reports"
                sh "chmod 1777 reports"
                withEnv(["FLAVOUR=vimojo DOCKER_MACHINE_IP=${DOCKER_MACHINE_IP}"]) {
                    sh "docker-compose ${COMPOSE_CHAIN} -f docker-compose.admin.yml run --rm e2e-runner"
                }
            }

            post {
                always {
                    junit "reports/*.xml"
                    archiveArtifacts artifacts: 'reports/videos/**/*.mov', fingerprint: true
                    archiveArtifacts artifacts: 'reports/videos/**/*.srt', fingerprint: true
                    archiveArtifacts artifacts: 'reports/logs/**/*.txt', fingerprint: true
                    //zip zipFile: 'screenshotsReport.zip', archive: true, dir: 'reports/screenshots/'
                }
            }
        }

    }

    post {
      always {
          sh "docker-compose down || true"
          sh "docker-machine rm ${DOCKER_MACHINE_NAME}"
      }
    }

}
