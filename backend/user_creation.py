from pyairtable import Table
import uuid
import json
import sys
from config import Config  # Importing the Config class

def get_airtable_table(table_name):
    """Retrieve the Airtable table using the Config class."""
    airtable_api_key = Config.AIRTABLE_API_KEY
    base_id = Config.BASE_ID
    return Table(airtable_api_key, base_id, table_name)

def create_user():
    """Function to handle user creation."""
    try:
        # Read the input from stdin (from Node.js)
        input_data = sys.stdin.read()
        data = json.loads(input_data)

        # Airtable table setup
        table = get_airtable_table(Config.USERS_TABLE)  # Use USERS_TABLE from Config

        # Validate required fields
        required_fields = ["first_name", "last_name", "email", "password"]
        if not all(field in data for field in required_fields):
            response = {"message": "Missing required fields"}
            print(json.dumps(response))
            return

        # Generate a unique ID for the user
        unique_id = str(uuid.uuid4())

        # Prepare the user data
        user_data = {
            "First Name": data["first_name"],
            "Last Name": data["last_name"],
            "Email": data["email"],
            "Password": data["password"],  # Hash this in a production app
            "Unique ID": unique_id,
        }

        # Create the user in Airtable
        table.create(user_data)

        response = {"message": "User created successfully!"}
        print(json.dumps(response))
    except Exception as e:
        response = {"message": f"Error creating user: {str(e)}"}
        print(json.dumps(response))

def sign_in():
    """Function to handle user sign-in."""
    try:
        # Read the input from stdin (from Node.js)
        input_data = sys.stdin.read()
        data = json.loads(input_data)

        # Airtable table setup
        table = get_airtable_table(Config.USERS_TABLE)

        # Validate required fields
        required_fields = ["email", "password"]
        if not all(field in data for field in required_fields):
            response = {"message": "Missing email or password"}
            print(json.dumps(response))
            return

        email = data["email"]
        password = data["password"]

        # Query Airtable for the user by email
        records = table.all(formula=f"{{Email}} = '{email}'")

        if not records:
            response = {"message": "Invalid email or password"}
            print(json.dumps(response))
            return

        # Check the password
        user = records[0]["fields"]  # Get the first matched user
        if user.get("Password") != password:
            response = {"message": "Invalid email or password"}
            print(json.dumps(response))
            return

        # Success - you can include more user details here if needed
        response = {
            "message": "Sign-in successful!",
            "user": {
                "first_name": user.get("First Name"),
                "last_name": user.get("Last Name"),
                "email": user.get("Email"),
            }
        }
        print(json.dumps(response))
    except Exception as e:
        response = {"message": f"Error during sign-in: {str(e)}"}
        print(json.dumps(response))

# Determine the function to execute based on the input from Node.js
if __name__ == "__main__":
    if len(sys.argv) > 1:
        action = sys.argv[1]
        if action == "create_user":
            create_user()
        elif action == "sign_in":
            sign_in()
        else:
            print(json.dumps({"message": "Invalid action"}))
