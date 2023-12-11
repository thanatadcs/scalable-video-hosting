# scalable-video-hosting
A scalable video hosting application to upload and stream video.

You can run this application with either `Docker Compose` or `Kubernetes`.

**Note:** [*ffmpeg* executable](https://www.ffmpeg.org/download.html) used in video processing worker is for arm64 macOS machine. You might need to change ffmpeg to the version that support your machine.
**Note2:** Do not forget to properly setup CORS in AWS S3.
## Run with Docker Compose
### Requirement
- [Docker Desktop](https://docs.docker.com/desktop/) (or alike)
- AWS S3
### Setup
You will need 2 `.env` files
```sh
# s3.env
AWS_ACCESS_KEY_ID=<YOUR_VALUE>
AWS_SECRET_ACCESS_KEY=<YOUR_VALUE>
AWS_REGION=<YOUR_VALUE>
S3_BUCKET=<YOUR_VALUE>

# db.env
POSTGRES_USER=<YOUR_VALUE>
POSTGRES_PASSWORD=<YOUR_VALUE>
```
### Running
```sh
docker compose up
```
## Run with Kubernetes
### Requirement
- A Kubernetes cluster (this application is tested with [Kubernetes on Docker Desktop](https://docs.docker.com/desktop/kubernetes/))
- AWS S3
### Setup
You will need ingress controller, and some Kubernetes' secrets and configMaps.
#### Ingress Controller
You need ingress controller setup for this. If you don't have ingress controller setup yet, you can use [Helm](https://helm.sh/docs/intro/install/) to install [Traefik](https://doc.traefik.io/traefik/getting-started/install-traefik/) or alike, refer to https://doc.traefik.io/traefik/getting-started/install-traefik/#use-the-helm-chart.
#### Configuration
Your will need 2 secrets and 1 configMaps in `k8s` folder. You can do so using the following commands.
```sh
cd k8s

kubectl create secret generic s3-secret \
--from-literal=AWS_ACCESS_KEY_ID=<YOUR_VALUE> \
--from-literal=AWS_SECRET_ACCESS_KEY=<YOUR_VALUE> \
--dry-run=client -o yaml > s3-secret.yaml

kubectl create configmap s3-config \
--from-literal=AWS_REGION=<YOUR_VALUE> \
--from-literal=S3_BUCKET=<YOUR_VALUE> \
--dry-run=client -o yaml > s3-config.yaml

kubectl create secret generic postgres-secret \
--from-literal=POSTGRES_USER=<YOUR_VALUE> \
--from-literal=POSTGRES_PASSWORD=<YOUR_VALUE> \
--dry-run=client -o yaml > postgres-secret.yaml
```
### Running
```sh
kubectl apply -f .
```
