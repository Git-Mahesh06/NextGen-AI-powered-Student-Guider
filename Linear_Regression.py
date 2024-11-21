import pandas as pd
from sklearn.linear_model import LinearRegression

# Load the CSV file
file_path = 'D:\AIGS\ML_MODEL\college_merit_cutoffs.csv'  # Replace with your actual file path
data = pd.read_csv(file_path)

# Ensure cutoff columns are numeric and handle any conversion issues
for year in range(2019, 2023 + 1):
    data[f'cutoff_{year}'] = pd.to_numeric(data[f'cutoff_{year}'], errors='coerce')

# Drop rows with any missing values in cutoff columns
data = data.dropna(subset=[f'cutoff_{year}' for year in range(2019, 2023 + 1)])

# Define features (X)
X = data[[f'cutoff_2019', f'cutoff_2020', f'cutoff_2021', f'cutoff_2022', f'cutoff_2023']]

# Initialize the model
model = LinearRegression()

# Train the model using the same data for X (we do not have y for 2024)
model.fit(X, X)

# Predict the 2024 cutoff
data['predicted_cutoff_2024'] = model.predict(X).mean(axis=1)

# Round off the predicted cutoff values to the nearest integer
data['predicted_cutoff_2024'] = data['predicted_cutoff_2024'].round().astype(int)

# Display the college, branch, and predicted 2024 cutoff
results = data[['college', 'branch', 'predicted_cutoff_2024']]

# Save the results to a CSV file
results.to_csv('predicted_cutoffs_2024.csv', index=False)

print("Predicted cutoff results have been saved to 'predicted_cutoffs_2024.csv'")
