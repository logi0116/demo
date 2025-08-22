# TextAI - 번역, 요약, 의역 도구

AI 기반 텍스트 처리 도구로 번역, 요약, 의역 기능을 제공합니다.

## 🏗️ 아키텍처

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Spring Boot + Java
- **Database**: PostgreSQL (선택사항)
- **AI Services**: OpenAI API, Google Translate API

## 🚀 빠른 시작

### 개발 환경 설정

#### 1. 저장소 클론
\`\`\`bash
git clone <repository-url>
cd textai
\`\`\`

#### 2. 백엔드 설정 (Spring Boot)
\`\`\`bash
cd spring-boot-backend

# 환경 변수 설정
cp src/main/resources/application.yml.example src/main/resources/application.yml
# application.yml에서 API 키 설정

# 애플리케이션 실행
./mvnw spring-boot:run
\`\`\`

#### 3. 프론트엔드 설정 (React)
\`\`\`bash
cd react-version

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env에서 API 서버 주소 설정

# 개발 서버 실행
npm run dev
\`\`\`

### Docker를 사용한 실행

#### 1. 환경 변수 설정
\`\`\`bash
cp .env.example .env
# .env 파일에서 API 키들을 설정하세요
\`\`\`

#### 2. Docker Compose로 실행
\`\`\`bash
docker-compose up --build
\`\`\`

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Database: localhost:5432

## 📁 프로젝트 구조

\`\`\`
textai/
├── react-version/              # React 프론트엔드
│   ├── src/
│   │   ├── components/         # React 컴포넌트
│   │   ├── pages/             # 페이지 컴포넌트
│   │   ├── services/          # API 서비스
│   │   ├── hooks/             # 커스텀 훅
│   │   ├── contexts/          # React Context
│   │   └── utils/             # 유틸리티 함수
│   ├── public/                # 정적 파일
│   └── package.json
├── spring-boot-backend/        # Spring Boot 백엔드
│   ├── src/main/java/
│   │   ├── controller/        # REST 컨트롤러
│   │   ├── service/           # 비즈니스 로직
│   │   ├── dto/               # 데이터 전송 객체
│   │   └── config/            # 설정 클래스
│   └── pom.xml
└── docker-compose.yml         # Docker 설정
\`\`\`

## 🔧 개발 가이드

### API 엔드포인트

#### 번역 API
\`\`\`http
POST /api/translate
Content-Type: application/json

{
  "text": "번역할 텍스트",
  "sourceLang": "ko",
  "targetLang": "en"
}
\`\`\`

#### 요약 API
\`\`\`http
POST /api/summarize
Content-Type: application/json

{
  "text": "요약할 텍스트",
  "summaryType": "brief",
  "summaryLength": 30
}
\`\`\`

#### 의역 API
\`\`\`http
POST /api/paraphrase
Content-Type: application/json

{
  "text": "의역할 텍스트",
  "style": "formal",
  "creativity": 50
}
\`\`\`

### 환경 변수

#### Frontend (.env)
\`\`\`env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_ENV=development
VITE_DEBUG=true
\`\`\`

#### Backend (application.yml)
\`\`\`yaml
textai:
  openai:
    api-key: ${OPENAI_API_KEY}
  google:
    translate-api-key: ${GOOGLE_TRANSLATE_API_KEY}
\`\`\`

## 🚀 배포

### 프로덕션 빌드

#### Frontend
\`\`\`bash
cd react-version
npm run build
\`\`\`

#### Backend
\`\`\`bash
cd spring-boot-backend
./mvnw clean package
\`\`\`

### Docker 배포
\`\`\`bash
docker-compose -f docker-compose.prod.yml up -d
\`\`\`

## 🛠️ 기술 스택

### Frontend
- React 18
- Vite
- Tailwind CSS
- Lucide React (아이콘)
- Radix UI (컴포넌트)

### Backend
- Spring Boot 3
- Spring Web
- Spring Data JPA
- Validation
- Lombok

### DevOps
- Docker
- Docker Compose
- Nginx

## 📝 라이센스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 지원

문제가 있으시면 이슈를 생성해주세요.
