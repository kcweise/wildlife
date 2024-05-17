"""Initial

Revision ID: ac65a2b4e2ad
Revises: 
Create Date: 2024-05-17 11:53:31.802658

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ac65a2b4e2ad'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('competition_photos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('votes', sa.Integer(), nullable=False),
    sa.Column('competition_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('photo_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['competition_id'], ['competitions.id'], name=op.f('fk_competition_photos_competition_id_competitions')),
    sa.ForeignKeyConstraint(['photo_id'], ['photos.id'], name=op.f('fk_competition_photos_photo_id_photos')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_competition_photos_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('competitions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('start_date', sa.DateTime(), nullable=False),
    sa.Column('end_date', sa.DateTime(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('winner_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['winner_id'], ['competition_photos.id'], name=op.f('fk_competitions_winner_id_competition_photos')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('phone', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('created_date', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email', name=op.f('uq_users_email')),
    sa.UniqueConstraint('username', name=op.f('uq_users_username'))
    )
    op.create_table('photos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('post_date_time', sa.DateTime(), nullable=True),
    sa.Column('taken_date_time', sa.DateTime(), nullable=True),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('animal', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('photo_url', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_photos_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ratings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('comp_photo_id', sa.Integer(), nullable=True),
    sa.Column('user_rated_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['comp_photo_id'], ['competition_photos.id'], name=op.f('fk_ratings_comp_photo_id_competition_photos')),
    sa.ForeignKeyConstraint(['user_rated_id'], ['users.id'], name=op.f('fk_ratings_user_rated_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('photo_access',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('access_level', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('photo_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['photo_id'], ['photos.id'], name=op.f('fk_photo_access_photo_id_photos')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_photo_access_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('photo_access')
    op.drop_table('ratings')
    op.drop_table('photos')
    op.drop_table('users')
    op.drop_table('competitions')
    op.drop_table('competition_photos')
    # ### end Alembic commands ###