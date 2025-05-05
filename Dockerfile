# Dockerfile

# Use official Python image
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Copy server code into image
COPY server/ /app/

# Install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose port (default Flask port)
EXPOSE 5000

# Run the app
CMD ["python", "run.py"]
