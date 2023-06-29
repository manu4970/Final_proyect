"""empty message

Revision ID: 7cf28d5478aa
Revises: 1633f11f226e
Create Date: 2023-06-20 00:32:40.791416

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7cf28d5478aa'
down_revision = '1633f11f226e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('rentas',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('disponibility', sa.DateTime(), nullable=False),
    sa.Column('is_available', sa.Boolean(), nullable=False),
    sa.Column('counter', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('sport',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('canchas',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('location', sa.String(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('sport_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['sport_id'], ['sport.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('rentas_user',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('rentas_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['rentas_id'], ['rentas.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], )
    )
    op.create_table('canchas_rentas',
    sa.Column('rentas_id', sa.Integer(), nullable=True),
    sa.Column('canchas_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['canchas_id'], ['rentas.id'], ),
    sa.ForeignKeyConstraint(['rentas_id'], ['canchas.id'], )
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=120), nullable=True))
        batch_op.add_column(sa.Column('lastname', sa.String(length=120), nullable=True))
        batch_op.add_column(sa.Column('is_admin', sa.Boolean(), nullable=True))
        batch_op.add_column(sa.Column('is_renter', sa.Boolean(), nullable=True))
        batch_op.add_column(sa.Column('dob', sa.DateTime(), nullable=True))
        batch_op.add_column(sa.Column('rut', sa.String(length=10), nullable=True))
        batch_op.alter_column('email',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.String(length=500),
               nullable=True)
        batch_op.create_unique_constraint(None, ['rut'])
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.alter_column('password',
               existing_type=sa.String(length=500),
               type_=sa.VARCHAR(length=80),
               nullable=False)
        batch_op.alter_column('email',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)
        batch_op.drop_column('rut')
        batch_op.drop_column('dob')
        batch_op.drop_column('is_renter')
        batch_op.drop_column('is_admin')
        batch_op.drop_column('lastname')
        batch_op.drop_column('name')

    op.drop_table('canchas_rentas')
    op.drop_table('rentas_user')
    op.drop_table('canchas')
    op.drop_table('sport')
    op.drop_table('rentas')
    # ### end Alembic commands ###