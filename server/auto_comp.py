from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from apscheduler import APScheduler
import random
from datetime import datetime, timedelta
from models import Competition

scheduler = APScheduler()

def schedule_new_competition():
    # Calculate the date one week ago from today
    one_week_ago = datetime.utcnow() - timedelta(days=7)
    # Fetch all competitions older than one week
    past_competitions = Competition.query.filter(Competition.start_date < one_week_ago).all()

    if past_competitions:
        # Select a random past competition
        selected_competition = random.choice(past_competitions)

        # Set the new competition's start and end dates
        start_date = datetime.utcnow() + timedelta(days=7)
        end_date = start_date + timedelta(days=7)

        # Create a new competition
        new_competition = Competition(
            name=selected_competition.name,
            start_date=start_date,
            end_date=end_date,
            description=selected_competition.description,
        )

        db.session.add(new_competition)
        db.session.commit()
        print(f"Scheduled new competition: {new_competition.name} from {start_date} to {end_date}")

# Configure the scheduler job
scheduler.add_job(id='schedule_new_competition', func=schedule_new_competition, trigger='interval', days=2)
scheduler.start()