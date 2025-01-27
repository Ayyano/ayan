#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p images

# Download project images
curl "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19" -o images/project1.jpg
curl "https://images.unsplash.com/photo-1522542550221-31fd19575a2d" -o images/project2.jpg
curl "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c" -o images/project3.jpg
curl "https://images.unsplash.com/photo-1498050108023-c5249f4df085" -o images/about.jpg
