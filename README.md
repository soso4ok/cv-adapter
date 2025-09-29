# CV Adapter

An AI-powered CV adaptation tool that helps job seekers tailor their resumes to specific job descriptions using Google's Gemini AI. The application consists of a FastAPI backend and a React frontend, deployable via Docker and Kubernetes.

## 🚀 Features

- **AI-Powered CV Adaptation**: Uses Google Gemini AI to analyze CVs and job descriptions
- **PDF Processing**: Extracts text from PDF CVs for analysis
- **Modern Web Interface**: Built with React, Material-UI, and TypeScript
- **RESTful API**: FastAPI backend with comprehensive error handling
- **Containerized Deployment**: Docker and Kubernetes support
- **Persistent Storage**: File storage with Kubernetes PVC
- **CORS Support**: Cross-origin resource sharing for web applications

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External      │
│   (React)       │◄──►│   (FastAPI)     │◄──►│   (Gemini AI)   │
│   Port: 80      │    │   Port: 80      │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   Nginx         │    │   PVC Storage   │
│   (Ingress)     │    │   (/data)       │
└─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐
│   Kubernetes    │
│   Secrets       │
│  - API_KEY      │
└─────────────────┘

```

## 📋 Prerequisites

- **Docker** and **Docker Compose**
- **Kubernetes** cluster (minikube, kind, or cloud provider)
- **kubectl** configured for your cluster
- **Node.js** 18+ (for local development)
- **Python** 3.12+ (for local development)
- **Google Gemini AI API Key**

## 🛠️ Local Development

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd back-end
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create environment file:**
   ```bash
   cp .env.example .env  # Create from template
   # Edit .env and add your GEMINI_AI_API_KEY
   ```

5. **Run the backend:**
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd front-end
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 🐳 Docker Deployment

### Build and Run with Docker Compose

1. **Create environment file:**
   ```bash
   # Create .env in project root
   echo "GEMINI_AI_API_KEY=your_api_key_here" > .env
   ```

2. **Build and start services:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000

### Individual Docker Builds

**Backend:**
```bash
cd back-end
docker build -t cv-adapter-backend .
docker run -p 8000:80 -e GEMINI_AI_API_KEY=your_key cv-adapter-backend
```

**Frontend:**
```bash
cd front-end
docker build -t cv-adapter-frontend .
docker run -p 3000:80 cv-adapter-frontend
```

## ☸️ Kubernetes Deployment

### Prerequisites

- Kubernetes cluster running
- kubectl configured
- Docker images built and available in cluster

### 1. Create Kubernetes Secret

```bash
# Create secret for Gemini API key
kubectl create secret generic gemini-api-key \
  --from-literal=api-key=your_gemini_api_key_here
```

### 2. Deploy Backend

```bash
# Deploy PVC for file storage
kubectl apply -f kube/back-end/pvc.yaml

# Deploy backend service
kubectl apply -f kube/back-end/service.yaml

# Deploy backend deployment
kubectl apply -f kube/back-end/deployment.yaml
```

### 3. Deploy Frontend

```bash
# Deploy frontend service
kubectl apply -f kube/front-end/service.yaml

# Deploy frontend deployment
kubectl apply -f kube/front-end/deployment.yaml
```

### 4. Configure Ingress

```bash
# Deploy ingress (requires nginx-ingress controller)
kubectl apply -f kube/ingress.yaml
```

### 5. Verify Deployment

```bash
# Check all resources
kubectl get all

# Check services
kubectl get services

# Check ingress
kubectl get ingress

# Check PVC
kubectl get pvc
```

### 6. Access the Application

- **With Ingress**: Access via your ingress controller's external IP
- **Port Forward** (for testing):
  ```bash
  # Frontend
  kubectl port-forward service/frontend-service 3000:80
  
  # Backend
  kubectl port-forward service/backend-service 8000:80
  ```

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
GEMINI_AI_API_KEY=your_gemini_api_key_here
DEBUG=false
ALLOWED_ORIGINS=["*"]
```

**Kubernetes Secret:**
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: gemini-api-key
type: Opaque
data:
  api-key: <base64_encoded_api_key>
```

### File Storage

- **Local Development**: Files saved to `./data` directory
- **Docker**: Files saved to `/data` in container
- **Kubernetes**: Files saved to PVC mounted at `/data`

### CORS Configuration

The backend is configured to allow CORS from all origins in development. For production, update the `allowed_origins` in `back-end/app/core/config.py`.

## 📁 Project Structure

```
cv-adapter/
├── back-end/                 # FastAPI backend
│   ├── app/
│   │   ├── core/            # Configuration
│   │   ├── routers/         # API routes
│   │   ├── schemas/         # Pydantic models
│   │   ├── services/        # Business logic
│   │   └── utils/           # Utilities
│   ├── Dockerfile
│   └── requirements.txt
├── front-end/               # React frontend
│   ├── src/
│   │   ├── features/cv/     # CV-related components
│   │   ├── shared/          # Shared components
│   │   └── app/             # App configuration
│   ├── Dockerfile
│   └── package.json
├── kube/                    # Kubernetes manifests
│   ├── back-end/
│   ├── front-end/
│   └── ingress.yaml
├── docker-compose.yml
└── README.md
```

## 🔌 API Endpoints

### Health Check
- `GET /health` - Service health status

### CV Generation
- `POST /api/cv/generate` - Generate adapted CV
  - **Body**: `multipart/form-data`
    - `cv_file`: PDF file
    - `job_description`: Text description
  - **Response**: Adapted CV in Markdown format

### API Documentation
- `GET /docs` - Interactive API documentation (Swagger UI)
- `GET /redoc` - Alternative API documentation

## 🧪 Testing

### Backend Tests
```bash
cd back-end
python -m pytest tests/
```

### Frontend Tests
```bash
cd front-end
npm test
```

### Integration Tests
```bash
# Test API endpoints
curl -X POST "http://localhost:8000/api/cv/generate" \
  -F "cv_file=@sample_cv.pdf" \
  -F "job_description=Software Engineer position..."
```

## 🚨 Troubleshooting

### Common Issues

1. **API Key Not Found**
   - Ensure `GEMINI_AI_API_KEY` is set in environment
   - Check Kubernetes secret is created correctly

2. **File Upload Fails**
   - Verify file size is under 10MB
   - Check file type is PDF
   - Ensure storage path is writable

3. **CORS Errors**
   - Update `allowed_origins` in backend config
   - Check ingress CORS annotations

4. **Kubernetes Deployment Issues**
   - Verify images are built and available
   - Check resource limits and requests
   - Ensure PVC is bound correctly

### Logs

**Backend:**
```bash
# Docker
docker logs cv-adapter-backend

# Kubernetes
kubectl logs deployment/backend-deployment
```

**Frontend:**
```bash
# Docker
docker logs cv-adapter-frontend

# Kubernetes
kubectl logs deployment/frontend-deployment
```

## 🔒 Security Considerations

- **API Keys**: Store in Kubernetes secrets, never in code
- **File Uploads**: Validate file types and sizes
- **CORS**: Configure appropriate origins for production
- **Storage**: Use secure PVC with appropriate access modes
- **Network**: Use ingress with TLS termination

## 📈 Monitoring and Scaling

### Resource Limits
```yaml
resources:
  requests:
    memory: "128Mi"
    cpu: "100m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

### Horizontal Scaling
```bash
# Scale backend
kubectl scale deployment backend-deployment --replicas=3

# Scale frontend
kubectl scale deployment frontend-deployment --replicas=2
```

---

**Note**: This application requires a valid Google Gemini AI API key to function. Ensure you have proper API access and billing configured with Google Cloud.
