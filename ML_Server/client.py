import requests

data = [
    {'course_name': 'Course A', 'rating': 4.7, 'review_count': 23},
    {'course_name': 'Course B', 'rating': 4.3, 'review_count': 49},
    {'course_name': 'Course C', 'rating': 2.9, 'review_count': 43}
]

response = requests.post('http://192.168.10.8:5000/predict_satisfaction', json=data)
print(response.json())
