web: PORT=4000 npm start --prefix client
api: gunicorn -b 127.0.0.1:5555 --chdir server app:app
scheduler: python server/winner_email.py #Scheduler for sending winners emails