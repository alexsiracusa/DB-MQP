## To Run Backend
1. Install `pipenv` globally, on mac do `sudo -H pip install -U pipenv`
2. `cd backend` then `pipenv install`
3. create a .env file at `backend/.env` with the following variables set to whatever postgres db you have running:
   ```
   DATABASE_NAME = 'postgres'
   DATABASE_USER = 'postgres'
   DATABASE_PASSWORD = 'postgres'
   DATABASE_PORT = 5432
   ```
5. to run the server use `pipenv run python manage.py runserver`

## To Initialize The Database
1. Make sure you have the .env file made from the "To Run Backend" Section
2. Follow the instructions in the `backend/tables/README.md` file and populate the `backend/tables/` directory with the necessary csv files
3. Run the `backend/initialize_database/import_tables_postgres.py` file using python, making sure the current directory is set to `backend/initialize_database/` (it uses relative paths so this is necessary)
4. The file should take 5-15 minutes to run and will show progress in the console, once it finishes without error everything should be setup

## API Documentation
The official documentation for the Database Comparisons MQP backend server API can be found [here](https://docs.google.com/document/d/1B1xUGPmOIDTEQIid9YhgwJ5izbkABrPRAQSxMi_hqDw/edit#heading=h.r622w7lo9cqg).  It lists all valid endpoints that are accepted, their parameters, and what data they may return.
