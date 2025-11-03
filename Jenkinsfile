pipeline {
    agent { label 'new' }

    environment {
        IMAGE_NAME = "fardeenattar/mario-image"
        TAG = "${new Date().format('yyyyMMddHHmmss')}"
    }

    stages {
        stage('Checkout Source Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Fardeen313/super-mario.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    echo "Building Docker image..."
                    docker build -t ${IMAGE_NAME}:${TAG} .
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                // Use Docker Hub credentials here (username + password)
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "Logging in to Docker Hub..."
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                        echo "Pushing image to Docker Hub..."
                        docker push ${IMAGE_NAME}:${TAG}
                    '''
                }
            }
        }

       stage('Update Manifest Repo') {
    steps {
        withCredentials([string(credentialsId: 'manifestmario', variable: 'TOKEN')]) {
            sh '''
                echo "Cleaning up any old repo..."
                rm -rf Mario-game-manifest

                echo "Cloning manifest repository..."
                git clone https://x-access-token:${TOKEN}@github.com/Fardeen313/Mario-game-manifest.git
                cd Mario-game-manifest

                echo "Updating image tag in mario.yml..."
                sed -i "s|fardeenattar/mario-image:.*|fardeenattar/mario-image:${IMAGE_TAG}|g" mario.yml

                git config user.name "jenkins"
                git config user.email "jenkins@server.com"
                git commit -am "CI: update image tag to ${IMAGE_TAG}" || echo "No changes to commit"
                git push
            '''
        }
    }
}

    }
}

