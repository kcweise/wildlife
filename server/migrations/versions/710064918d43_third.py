"""Third

Revision ID: 710064918d43
Revises: f6aee1b1eec3
Create Date: 2024-05-25 14:55:23.569805

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '710064918d43'
down_revision = 'f6aee1b1eec3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('public_private', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('public_private')

    # ### end Alembic commands ###
