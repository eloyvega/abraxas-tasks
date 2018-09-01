# Install PyEnv
wget https://raw.githubusercontent.com/pyenv/pyenv-installer/master/bin/pyenv-installer
bash pyenv-installer
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.bashrc
rm pyenv-installer
