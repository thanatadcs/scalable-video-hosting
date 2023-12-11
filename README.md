# scalable-video-hosting
## Setup
You will need 2 `.env` files
```sh
# s3.env
AWS_ACCESS_KEY_ID=<YOUR_VALUE>
AWS_SECRET_ACCESS_KEY=<YOUR_VALUE>
AWS_REGION=<YOUR_VALUE>

# db.env
POSTGRES_USER=<YOUR_VALUE>
POSTGRES_PASSWORD=<YOUR_VALUE>
POSTGRES_DB=<YOUR_VALUE>
```
## Running
### With Docker Compose
```sh
docker compose up
```
**Note:** *ffmpeg* executable used in video processing worker is for arm64 machine.
