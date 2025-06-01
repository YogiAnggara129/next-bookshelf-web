#!/bin/sh

# Replace semua placeholder __API_URL__ dengan env sebenarnya
echo "Replacing __API_URL__ with '${API_URL}'..."
find .next -type f -exec sed -i "s|__API_URL__|${API_URL}|g" {} +

# Lanjutkan ke command asli (npm start)
exec "$@"
