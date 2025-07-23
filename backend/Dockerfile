# Use official Python image
FROM python:3.11-slim

WORKDIR /app

# Set environment variables (prevents .pyc files and enables output flush)
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y build-essential

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy project files
COPY . .

# Expose Django port
EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
