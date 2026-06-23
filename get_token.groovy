import jenkins.model.*
import com.cloudbees.plugins.credentials.*
import com.cloudbees.plugins.credentials.impl.*
import com.cloudbees.plugins.credentials.domains.*
import org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl

def creds = SystemCredentialsProvider.getInstance().getCredentials()
creds.each {
  if (it instanceof StringCredentialsImpl && it.id == 'sonarqube-token') {
    println "Token: " + it.secret.getPlainText()
  }
}
