# SLSmart: Enhancing the Singapore Learning System with AI-Powered Features

SMU HackForCities 2025

- By Jovan Ng (NUS Y1 CS) and Jia Xin (NUS Y2 CS)

## Project Description

SLSmart is an innovative solution designed to enhance the Singapore Learning System (SLS) ePortal by integrating Generative AI technologies. The platform addresses two critical issues faced by students and teachers: lack of student engagement and user experience challenges. By leveraging Retrieval-Augmented Generation (RAG) and AI-powered tools, SLSmart provides a personalized, interactive, and seamless learning experience.

### Key Features

1. **AI-Powered Interactive Notes:** Enables students to "chat" with lecture materials for instant, personalized feedback and clarification.
2. **AI-Generated Quizzes:** Automatically generates tailored quizzes based on uploaded notes, helping teachers save time and providing students with practice materials.
3. **AI-Generated Summaries:** Creates concise summaries of notes for quick review and simplified understanding.
4. **Improved User Experience:** Seamlessly integrates AI tools into the existing platform, ensuring intuitive navigation and interaction.
5. **Ethical Considerations:** Includes a transparent feedback mechanism and periodic audits to ensure accurate and unbiased AI responses.

## Problem It Solves

- **Lack of Engagement:** Provides instant clarification and personalized assistance, enhancing student motivation and understanding.
- **UX Challenges:** Simplifies navigation and interaction with digital learning materials, creating a more user-friendly platform.
- **Teacher Workload:** Reduces the burden of creating quizzes and summaries, allowing teachers to focus on teaching.

### Limitations

While SLSmart offers promising solutions to enhance the learning experience, there are a few limitations that need to be considered:

1. **Dependency on Material Quality:**  
   The AI’s performance is highly dependent on the quality and clarity of the uploaded notes and materials. Poorly prepared resources may lead to less effective interactions and responses.

2. **Integration Challenges:**  
   Initial integration with the existing SLS infrastructure may require significant effort, especially if compatibility issues arise with legacy systems.

3. **Language and Context Understanding:**  
   The AI may occasionally struggle with understanding complex queries or those written in informal language, which could affect its ability to provide accurate responses.

4. **Ethical and Security Concerns:**  
   Ensuring the security of sensitive educational data and preventing misuse of the platform’s features (e.g., students using it to bypass genuine effort) requires robust measures.

---

### Future Improvements

To address the current limitations and further enhance the platform, the following improvements are planned:

1. **AI-Powered Video Interaction:**

   - Extend capabilities to include video lectures by transcribing and indexing the content.
   - Allow students to \"chat\" with specific sections of a video for targeted help.

2. **Strength and Weakness Analysis:**

   - Implement an AI-driven analysis to identify areas where students struggle most, based on their quiz performance and queries.
   - Provide targeted practice questions and tailored feedback to address these weaknesses.

3. **Multilingual Support:**

   - Enhance the AI’s ability to support multiple languages and dialects, enabling a broader range of students to benefit from the platform.

4. **Gamification Elements:**
   - Introduce features like achievement badges, progress tracking, and competitive leaderboards to boost student engagement and motivation.

---

## Setup Instructions

### Prerequisites

- **System Requirements:**
  - Python 3.8 or higher
  - Node.js 14.0 or higher

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-repo/slsmart.git
   cd slsmart
   ```

2. **Install dependencies for frontend and backend**

   ```bash
   cd frontend
   npm install --legacy-peer-deps
   ```

   Make sure that you are using virtual environment for backend python

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. Set up .env variables in .env file for both backend and frontend

```txt
# Backend
OPENAI_API_KEY="
QDRANT_API_KEY=""
QDRANT_URL=""
```

```txt
AUTH_SECRET=""
AUTH_TRUST_HOST=""
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""

DIRECT_URL=""
DATABASE_URL=""

OPENAI_API_KEY=""

UPLOADTHING_TOKEN=''
NEXT_PUBLIC_BACKEND_URL="http://127.0.0.1:8000"

```

4. Run the frontend and backend

   ```bash
   cd frontend
   npm run dev
   ```

   ```bash
   cd backend
   python app.py
   ```
