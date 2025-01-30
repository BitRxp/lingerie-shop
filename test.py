import requests

url = "https://lingerie-shop.onrender.com/api/v1/products/1/"

try:
    response = requests.get(url)
    response.raise_for_status()  # Raise an error for HTTP error responses
    data = response.json()
except requests.exceptions.RequestException as e:
    data = {"error": str(e)}

data
print(data)