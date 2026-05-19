# 1. Use an official lightweight Python image
FROM python:3.12-slim

# 2. Set the working directory inside the container
WORKDIR /Backend

# 3. Copy requirements first to take advantage of Docker caching layers
COPY requirements.txt .

# 4. Install the required dependencies
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the remaining application files into the container
# This brings over main.py and your spam_pipeline.pkl file
COPY . .

# 6. Expose the port FastAPI runs on
EXPOSE 8000

# 7. Clean, standardized production command to start Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]