"""alter reservation

Revision ID: fd9955226199
Revises: e8d91381912a
Create Date: 2024-01-27 14:00:28.482712

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fd9955226199'
down_revision = 'e8d91381912a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('properties', schema=None) as batch_op:
        batch_op.drop_constraint('properties_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('reservations', schema=None) as batch_op:
        batch_op.drop_constraint('reservations_user_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('reservations_property_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key(None, 'properties', ['property_id'], ['id'], ondelete='CASCADE')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reservations', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('reservations_property_id_fkey', 'properties', ['property_id'], ['id'])
        batch_op.create_foreign_key('reservations_user_id_fkey', 'users', ['user_id'], ['id'])

    with op.batch_alter_table('properties', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('properties_user_id_fkey', 'users', ['user_id'], ['id'])

    # ### end Alembic commands ###
