from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
import os

app = Flask(__name__)
database_url = os.environ.get('DATABASE_URL')
if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

print(f"Database URL: {database_url}")

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
db = SQLAlchemy(app)

def reset_database():
    try:
        with app.app_context():
            # Desactivar restricciones de clave foránea
            db.session.execute(text('SET CONSTRAINTS ALL DEFERRED'))
            
            # Eliminar todas las tablas
            db.session.execute(text('''
                DO $$ DECLARE
                    r RECORD;
                BEGIN
                    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
                        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
                    END LOOP;
                END $$;
            '''))
            
            # Confirmar los cambios
            db.session.commit()
        print("Base de datos reiniciada con éxito.")
    except Exception as e:
        print(f"Error al reiniciar la base de datos: {str(e)}")

if __name__ == '__main__':
    reset_database()