#!/bin/bash

# Apagar pastas node_modules, dist, .turbo e o arquivo pnpm-lock.yaml
echo "Removendo pastas node_modules, dist, .turbo e pnpm-lock.yaml..."

find . -type d \( -name "node_modules" -o -name "dist" -o -name ".turbo" \) -exec rm -rf {} +
find . -type f -name "pnpm-lock.yaml" -exec rm -f {} +

echo "Limpeza concluída!"
