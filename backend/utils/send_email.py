import sys
sys.stdout.reconfigure(encoding="utf-8")  # ✅ Force UTF-8 encoding
import smtplib
import json
import sys
import base64
from email.message import EmailMessage
from string import Template
from pathlib import Path
import os

# Load environment variables (Avoid hardcoding passwords)
EMAIL_USER = os.getenv("EMAIL_USER", "dummymailpragun@gmail.com")
EMAIL_PASS = os.getenv("EMAIL_PASS", "aldv sutq kklm ruvn")

# Read HTML template
html = Template(Path("mail.html").read_text())

def send_email(to_email, name):
    """Send personalized email to a single recipient."""
    email = EmailMessage()
    email["from"] = "Pragun Kakkar"
    email["to"] = to_email
    email["subject"] = "We Miss You! Come Back 🎉"

    email.set_content(html.substitute(name=name), "html")

    try:
        with smtplib.SMTP(host="smtp.gmail.com", port=587) as smtp:
            smtp.ehlo()
            smtp.starttls()
            smtp.login(EMAIL_USER, EMAIL_PASS)
            smtp.send_message(email)
            print(f"✅ Email sent to {to_email}")

    except smtplib.SMTPAuthenticationError as e:
        print(f"❌ Authentication error: {e.smtp_code}, {e.smtp_error}")
    except Exception as e:
        print(f"❌ Error sending email to {to_email}: {e}")

# Get Base64-encoded JSON from command-line argument
if len(sys.argv) > 1:
    try:
        # Decode Base64 input
        encoded_data = sys.argv[1]
        json_data = base64.b64decode(encoded_data).decode("utf-8")

        # Parse JSON
        users = json.loads(json_data)  # Expecting a JSON list of { email, name }

        for user in users:
            if "email" in user and "name" in user:
                send_email(user["email"], user["name"])  # Send email to each user
            else:
                print(f"⚠️ Skipping invalid user data: {user}")
    except json.JSONDecodeError as e:
        print(f"⚠️ JSON Parsing Error: {e}")
    except UnicodeDecodeError as e:
        print(f"❌ Unicode Error: {e}. Try running with UTF-8 encoding.")
    except Exception as e:
        print(f"⚠️ Error processing input data: {e}")
else:
    print("⚠️ No emails provided.")
