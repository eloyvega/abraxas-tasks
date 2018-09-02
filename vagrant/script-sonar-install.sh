apt-get install -y unzip
apt-get install -y pylint
wget https://sonarsource.bintray.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-3.2.0.1227-linux.zip
unzip sonar-scanner-cli-3.2.0.1227-linux.zip
mv sonar-scanner-3.2.0.1227-linux/ /opt/
echo -e 'export PATH="$PATH:/opt/sonar-scanner-3.2.0.1227-linux/bin/"' >> /home/vagrant/.bashrc
