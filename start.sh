#!/bin/bash
docker build -t dl_proj .
docker run -d -p 5001:5000 dl_proj