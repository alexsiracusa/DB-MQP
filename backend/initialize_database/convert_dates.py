import pandas as pd
import os
import sys


# function to convert date string to integer
def convert_date_to_int(date_str):
    try:
        # Initialize default values for day, month, and year
        day, month, year = "00", "00", "0000"

        # If it's a float (possibly NaN from pandas)
        if isinstance(date_str, float):
            if not pd.isna(date_str):
                print(date_str)

        # Check if the format is "DD/MM/YYYY"
        elif '/' in date_str:
            day, month, year = date_str.split('/')

        # Format "YYYY-MM-DD"
        else:
            year, month, day = date_str.split('-')

        # Check for 'None' and ensure proper length
        year = str(year).zfill(4) if year != "None" else "0000"
        month = str(month).zfill(2) if month != "None" else "00"
        day = str(day).zfill(2) if day != "None" else "00"

        return year + month + day

    except Exception as e:
        print(f"Error parsing value: {date_str}, Type: {type(date_str)}, Error: {e}")
        sys.exit(1)  # Exit the program with an error code


# function to process each CSV file
def process_csv_file(file_path, target_directory):
    print(f"\nProcessing file: {os.path.basename(file_path)}")
    df = pd.read_csv(file_path)

    target_columns = ["date_of_birth", "date_of_death", "start_date", "end_date"]

    # Check if none of the target columns are in the CSV file
    if not set(target_columns) & set(df.columns):
        print(f"None of the target columns found in {os.path.basename(file_path)}. Saving file without changes.")
        # Save the original dataframe to the target directory without changes
        output_file_path = os.path.join(target_directory, os.path.basename(file_path))
        df.to_csv(output_file_path, index=False)
        return

    for col in target_columns:
        if col in df.columns:
            print(f"Processing column: {col}")
            for idx, value in enumerate(df[col]):
                #if idx % 1000 == 0:
                #    print(f"Processing row: {idx}")
                df.at[idx, col] = convert_date_to_int(value)
        else:
            print(f"Column {col} not found in the file.")

    # Save the processed dataframe to the target directory
    output_file_path = os.path.join(target_directory, os.path.basename(file_path))
    df.to_csv(output_file_path, index=False)
    print(f"Processed data saved to {output_file_path}")


def main():
    repository_directory = 'C:/Github/CS542/'

    # directory that contains all the CSV files to process
    input_directory = repository_directory + "Tables/"

    # directory to save the processed CSV files
    target_directory = repository_directory + "processing_data/date_processed/"

    # Ensure the target directory exists
    if not os.path.exists(target_directory):
        os.makedirs(target_directory)

    # Process each CSV file in the input directory
    for file_name in os.listdir(input_directory):
        if file_name.endswith('.csv'):
            file_path = os.path.join(input_directory, file_name)
            process_csv_file(file_path, target_directory)


if __name__ == "__main__":
    main()
