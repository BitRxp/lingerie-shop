#!/usr/bin/env bash
# Exit on error
set -o errexit

# Modify this line as needed for your package manager (pip, poetry, etc.)
pip install -r requirements.txt


# Convert static asset files
python backend/manage.py collectstatic --no-input
python backend/manage.py migrate