git init 
heroku login
heroku create
#Creating app... done, ⬢ guarded-beach-89497
#https://guarded-beach-89497.herokuapp.com/ | https://git.heroku.com/guarded-beach-89497.git
echo '.password.ini' > .gitignore
echo 'node_modules/*' >> .gitignore
git push heroku master
