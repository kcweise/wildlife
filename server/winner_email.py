import smtplib  # Import the smtplib module for sending emails
from datetime import datetime, timedelta  # Import datetime and timedelta for date and time manipulation
from apscheduler.schedulers.blocking import BlockingScheduler  # Import the BlockingScheduler from APScheduler
from sqlalchemy import create_engine  # Import create_engine for SQLAlchemy database connection
from sqlalchemy.orm import sessionmaker  # Import for creating database sessions
from models import Competition, CompetitionPhoto, User  # Import models
from config import Config
import logging  # Import the logging module

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Mailtrap configuration: You must get your own mailtrap testing/email credentials to make this functional. This is not functional as is.
MAILTRAP_SMTP_SERVER = "sandbox.smtp.mailtrap.io"  # Mailtrap SMTP server address
MAILTRAP_SMTP_PORT = 2525  # Mailtrap SMTP server port
MAILTRAP_USERNAME = "***************"  # Mailtrap username 
MAILTRAP_PASSWORD = "**************"  # Mailtrap password
MAILTRAP_SENDER = "Private Person <from@example.com>"  # Email sender information

# Database configuration (make sure this matches database URL)
DATABASE_URL = Config.SQLALCHEMY_DATABASE_URI  # URL for your database connection

# Create a database engine
engine = create_engine(DATABASE_URL)
# Create a configured "Session" class
Session = sessionmaker(bind=engine)

def check_closed_competitions():
    """
    Check for competitions that have closed in the last 24 hours
    and send an email to the winner.
    """
    session = Session()  # Create a new database session
    now = datetime.utcnow()  # Get the current UTC time
    one_day_ago = now - timedelta(days=1)  # Calculate the time 24 hours ago

    # Query for competitions that ended in the last 24 hours
    closed_competitions = session.query(Competition).filter(
        Competition.end_date <= now,
        Competition.end_date > one_day_ago
    ).all()
    
    logger.info(f"Found {len(closed_competitions)} closed competitions")

    # Process each closed competition
    for competition in closed_competitions:
        logger.info(f"Processing competition: {competition.name}")
        # Find the photo with the highest votes
        winner_photo = session.query(CompetitionPhoto).filter_by(competition_id=competition.id).order_by(CompetitionPhoto.votes.desc()).first()
        if winner_photo:
            logger.info(f"Found winner photo with ID: {winner_photo.id} and votes: {winner_photo.votes}")
            # Get the user who owns the winning photo
            winner_user = session.query(User).filter_by(id=winner_photo.user_id).first()
            if winner_user:
                logger.info(f"Found winner user with email: {winner_user.email}")
                # Send an email to the winner
                send_email(winner_user.email, competition)
            else:
                logger.warning(f"No user found for winner photo ID: {winner_photo.id}")
        else:
            logger.warning(f"No winner photo found for competition: {competition.name}")
            
                

    session.close()  # Close the database session

def send_email(to_email, competition):
    """
    Send an email to the competition winner.
    """
    
    sender = MAILTRAP_SENDER
    receiver = "A Test User <to@example.com>"
    subject = f"Congratulations! You've won the {competition.name} competition!"  # Email subject
    body = f"Dear {to_email},\n\nCongratulations! You've won the {competition.name} competition!\n\nBest regards,\nThe Wildlife Photos Team"  # Email body
    message = f"Subject: {subject}\nTo: {receiver}\nFrom: {sender}\n\n{body}"  # Complete email message
    
    message
           
    # Connect to the Mailtrap SMTP server and send the email
    try:
        with smtplib.SMTP(MAILTRAP_SMTP_SERVER, MAILTRAP_SMTP_PORT) as server:
            server.starttls()  # Start TLS encryption
            server.login(MAILTRAP_USERNAME, MAILTRAP_PASSWORD)  # Log in to the Mailtrap SMTP server
            server.sendmail(sender, receiver, message)  # Send the email            
        logger.info(f"Email sent to {to_email}")
    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {e}")

# Create an instance of the BlockingScheduler
scheduler = BlockingScheduler()
# Add a job to the scheduler to run the check_closed_competitions function every 24 hours
scheduler.add_job(check_closed_competitions, 'interval', seconds=24)

logger.info("Running initial job execution...")
check_closed_competitions() #Run the check_closed_competitions upon start up testing purposes, should remove upon launch

# Start the scheduler
logger.info("Starting scheduler...")
scheduler.start()