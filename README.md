#### To Run Backend:
1. Install `pipenv` globally, on mac do `sudo -H pip install -U pipenv`
2. `cd backend` then `pipenv install`
3. create a .env file with the following variables set to whatever postgres db you have running:
   ```
   DATABASE_NAME = 'postgres'
   DATABASE_USER = 'postgres'
   DATABASE_PASSWORD = 'postgres'
   ```
5. to run the server `pipenv run python manage.py runserver`
