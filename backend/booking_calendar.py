import sys
import json
from pyairtable import Table
from dateutil import parser
import pytz
from config import Config
import logging

def book():
    """Create a new booking in Airtable."""
    # Read input from Node.js
    input_data = sys.stdin.read()
    data = json.loads(input_data)

    # Check if all required fields are provided
    required_fields = (
        "first_name",
        "last_name",
        "email",
        "phone_number",
        "date",
        "time",
        "uniqueId"
    )
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        print(json.dumps({"error": f"Missing fields: {', '.join(missing_fields)}"}))
        sys.exit(1)

    try:
        # Initialize Airtable
        table = Table(Config.AIRTABLE_API_KEY, Config.BASE_ID, Config.BOOKINGS_TABLE)

        # Parse the provided date and time
        local_datetime_str = f"{data['date']} {data['time']}"
        local_datetime = parser.parse(local_datetime_str)
        utc_datetime = pytz.timezone("Australia/Sydney").localize(local_datetime).astimezone(pytz.utc)

        # Create a new booking record
        new_record = {
            "Name": f"{data['first_name']} {data['last_name']}",
            "Date/time": utc_datetime.strftime("%Y-%m-%dT%H:%M:%S.000Z"),
            "Number": data["phone_number"],
            "Email": data["email"],
            "User ID": data["uniqueId"]  # Add the unique user ID
        }

        # Add the record to Airtable
        table.create(new_record)

        # Return success response
        print(json.dumps({"message": "Booking created successfully!"}))
    except Exception as e:
        logging.error(f"Error creating booking: {str(e)}")
        print(json.dumps({"error": f"Error creating booking: {str(e)}"}))
        sys.exit(1)

# Run the book function
if __name__ == "__main__":
    book()
