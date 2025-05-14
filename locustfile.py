from locust import HttpUser, task, between

class ApiUser(HttpUser):
    wait_time = between(1, 3)  # Tiempo de espera entre cada petición (en segundos)

    @task
    def hello_world(self):
        self.client.get("/")  # Realiza una petición GET al endpoint /
