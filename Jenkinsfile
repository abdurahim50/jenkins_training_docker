pipeline {                                                                            
    agent any
    
    stages {                                                                    
        
        stage('SCM') {
            steps {
                echo 'i m SCM'
                sh 'date'
                git branch: 'main', url: 'https://github.com/abdurahim50/jenkins_training_docker.git'
            }
        }
        stage('Build') {
            steps {
                echo 'i m Build'
            }
        }
        stage('Test') {
            steps {
                echo 'i m Test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'i m Deploy'
            }
        }
    }
}
