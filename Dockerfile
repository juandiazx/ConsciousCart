# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set the working directory in the container
WORKDIR /app

# Copy only the requirements file into the container at /app
COPY requirements.txt requirements.txt

# Install the required Python packages
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

# Copy the rest of the application files into the container at /app
COPY . .

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run app.py when the container launches
CMD ["python", "app.py"]

