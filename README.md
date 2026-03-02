## 🚀 Project Overview

This project demonstrates a complete **DevOps CI/CD pipeline** using **free and open-source tools**. We'll automate the entire software delivery lifecycle from code commit to production deployment.

### 🎯 Key Features

- **Version Control**: Git & GitHub
- **CI/CD Automation**: Jenkins
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Infrastructure as Code**: Terraform
- **Monitoring**: Prometheus & Grafana
- **Notifications**: Slack
- **Security**: SonarQube

### 🛠️ Tech Stack

| Category | Tool | Purpose |
|----------|------|---------|
| **Source Control** | GitHub | Code hosting & collaboration |
| **CI/CD** | Jenkins | Build, test, and deploy automation |
| **Containerization** | Docker | Package applications |
| **Orchestration** | Docker Compose | Multi-container management |
| **IaC** | Terraform | Infrastructure provisioning |
| **Monitoring** | Prometheus | Metrics collection |
| **Visualization** | Grafana | Dashboards & visualization |
| **Code Quality** | SonarQube | Static code analysis |
| **Notifications** | Slack | Real-time alerts |

---

## 📂 Project Structure

```
simple-devops-project/
├── jenkins/                    # Jenkins configuration
│   ├── Jenkinsfile             # CI/CD pipeline definition
│   ├── Dockerfile              # Jenkins Docker image
│   └── docker-compose.yml      # Jenkins setup
├── terraform/                  # Terraform configurations
│   ├── main.tf                 # Infrastructure definition
│   └── variables.tf            # Variable definitions
├── prometheus/                 # Prometheus configuration
│   ├── prometheus.yml          # Prometheus config
│   └── docker-compose.yml      # Prometheus setup
├── grafana/                    # Grafana configuration
│   ├── docker-compose.yml      # Grafana setup
│   └── dashboards/             # Custom dashboards
├── sonarqube/                  # SonarQube configuration
│   └── docker-compose.yml      # SonarQube setup
├── app/                        # Sample application
│   ├── Dockerfile              # App Dockerfile
│   └── docker-compose.yml      # App setup
├── scripts/                    # Utility scripts
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Docker** (v20.10+) installed
- **Docker Compose** (v2.0+) installed
- **Git** installed
- **GitHub account**
- **Slack workspace** (for notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/simple-devops-project.git
   cd simple-devops-project
   ```

2. **Configure Slack notifications**
   - Create a Slack channel for notifications
   - Get your Slack webhook URL
   - Update `jenkins/Jenkinsfile` with your webhook URL

3. **Configure Terraform variables**
   - Create `terraform/terraform.tfvars`
   - Add your cloud provider credentials

4. **Start all services**
   ```bash
   docker-compose up -d
   ```

---

## 🛠️ Usage

### 1. Jenkins Pipeline

The pipeline is defined in `jenkins/Jenkinsfile` and includes:

- **Checkout**: Pull code from GitHub
- **Build**: Build Docker image
- **Test**: Run unit tests
- **Security Scan**: SonarQube analysis
- **Deploy**: Deploy to Docker Compose
- **Notify**: Send Slack notifications

**Trigger the pipeline**:
1. Go to Jenkins UI: `http://localhost:8080`
2. Click "Build Now"

### 2. Terraform

**Deploy infrastructure**:
```bash
cd terraform
terraform init
terraform apply
```

**Destroy infrastructure**:
```bash
terraform destroy
```

### 3. Monitoring

**Access dashboards**:
- **Prometheus**: `http://localhost:9090`
- **Grafana**: `http://localhost:3000`
  - Default login: admin/admin
  - Import dashboards from `grafana/dashboards/`

### 4. SonarQube

**Access SonarQube**:
- `http://localhost:9000`
- Default login: admin/admin
- Generate API token in SonarQube settings
- Update `jenkins/Jenkinsfile` with your token

---

## 🔄 CI/CD Workflow

```
Developer → GitHub → Jenkins → Docker → Terraform → Monitoring
```

1. **Commit code** to GitHub
2. **Jenkins detects** the change
3. **Builds Docker image**
4. **Runs tests**
5. **Scans code** with SonarQube
6. **Deploys** with Terraform
7. **Monitors** with Prometheus/Grafana
8. **Notifies** via Slack

---

## 📝 Configuration

### Jenkins

Update `jenkins/Jenkinsfile` with:
- GitHub repository URL
- Slack webhook URL
- SonarQube credentials

### Terraform

Update `terraform/terraform.tfvars` with:
- Cloud provider credentials
- Region and zone
- Resource names

### Monitoring

Edit `prometheus/prometheus.yml` to:
- Add new targets to scrape
- Configure alert rules

---

## 🧪 Testing

### Run tests
```bash
# Run application tests
cd app
docker-compose run --rm app pytest

# Run Jenkins pipeline tests
# (Trigger via Jenkins UI)
```

### Verify deployment
```bash
# Check all services are running
docker-compose ps

# Check application is accessible
curl http://localhost:8080

# Check monitoring dashboards
# Open Grafana at http://localhost:3000
```

---

## 🔐 Security

- Use strong passwords for Jenkins, Grafana, and SonarQube
- Store secrets in environment variables or secret management tools
- Regularly rotate API tokens
- Implement proper access control

---

## 📈 Monitoring

Monitor key metrics:
- Build success/failure rates
- Deployment times
- Application response times
- Error rates
- Resource utilization

Set up alerts for:
- Failed builds
- High error rates
- Resource exhaustion
- Security violations

---

## 📚 Documentation

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Terraform Documentation](https://www.terraform.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [SonarQube Documentation](https://docs.sonarqube.org/)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Authors

- [Your Name] - [Your Email]

---

## 🙏 Acknowledgments

- Thanks to the open-source community for these amazing tools!
- Special thanks to the teams behind Jenkins, Docker, Terraform, Prometheus, Grafana, and SonarQube.

---

## 📞 Support

For issues or questions, please open
