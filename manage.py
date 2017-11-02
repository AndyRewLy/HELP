from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from backend.server import app


if __name__ == '__main__':
   app.run(port='5000') 
