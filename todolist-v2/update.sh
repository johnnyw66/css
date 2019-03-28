touch Procfile
git add .
git commit -m 'update to restart'
git push heroku master
heroku logs --tail

