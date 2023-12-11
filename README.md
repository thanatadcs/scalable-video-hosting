# scalable-video-hosting
A scalable video hosting application to upload and stream video.

You can run this application with either `Docker Compose` or `Kubernetes`.

> [!NOTE]
> [*ffmpeg*](https://www.ffmpeg.org/download.html) executable used in video processing worker is for arm64 macOS machine. You might need to change ffmpeg to the version that support your machine.

## Run with Docker Compose
### Requirement
- [Docker Desktop](https://docs.docker.com/desktop/) (or alike)
- AWS S3
> [!IMPORTANT]
> Do not forget to properly setup CORS in AWS S3.

### Setup
#### Submodule
Because of [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules), all the inner folders are empty and you needs all the file to run with docker compose (this is by design to test local code).

When you clone, you can use the following command to also clone all the submodules
```sh
git clone --recurse-submodules https://github.com/thanatadcs/scalable-video-hosting.git
```
Or if you already clone with empty submodules, you can use the following command when you are in the project folder to clone all the submodules.
```sh
git submodule update --init --recursive
```
#### Configuration
You will need 2 `.env` files in the project folder
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

> [!IMPORTANT]
> Do not forget to properly setup CORS in AWS S3.

### Setup
You will need ingress controller as well as some Kubernetes secrets and configMaps.
#### Ingress Controller
You need ingress controller setup for this. If you don't have ingress controller setup yet, you can use [Helm](https://helm.sh/docs/intro/install/) to install [Traefik](https://doc.traefik.io/traefik/getting-started/install-traefik/) or alike, refer to https://doc.traefik.io/traefik/getting-started/install-traefik/#use-the-helm-chart.
#### Configuration
Your will need 2 secrets and 1 configMaps in `k8s` folder. You can do so using the following commands when you are in `k8s` folder.
```sh
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
In the `k8s` folder use this command
```sh
kubectl apply -f .
```
