# AI-Enabled Enterprise Document Summarizer

## Project Description
The AI-Enabled Enterprise Document Summarizer leverages LLM to automatically summarize lengthy enterprise documents, such as reports and contracts, into concise, actionable insights. Integrated with enterprise chatbots, the platform allows employees to query and receive real-time, contextual summaries, enhancing efficiency in information retrieval and decision-making.

## Problem Statement
Enterprises manage large volumes of documents daily, leading to inefficiencies and delayed decisions. Employees often spend excessive time extracting key information. This project aims to provide an AI-powered solution that delivers quick, actionable document summaries and real-time responses via chatbot integration.

## Personas

1. **Shantanu, Operations Manager (Age: 35)**  
   - **Pain Points**: Spends hours skimming reports and meeting notes to extract actionable insights.  
   - **Needs**: Summarized documents for quicker, data-driven decisions.  
   - **Goal**: Improve operational efficiency and team productivity.

2. **Kruti, Legal Analyst (Age: 29)**  
   - **Pain Points**: Struggles with lengthy contracts that require thorough review.  
   - **Needs**: Key summaries of legal terms for quick access to important clauses.  
   - **Goal**: Save time and focus on critical details while ensuring compliance.

3. **Srishti, HR Director (Age: 40)**  
   - **Pain Points**: Reviews numerous employee reports and policies for executive meetings.  
   - **Needs**: A quick summary and chatbot tool to answer questions about reports and policies.  
   - **Goal**: Make faster, informed decisions in meetings and evaluations.
     
4. **Sunil, Senior Financial Analyst (Age: 42)**  
   - **Pain Points**: Reviews extensive financial reports, forecasts, and budget documents, which are time-consuming to analyze.  
   - **Needs**: Concise summaries of financial data and key metrics to quickly assess performance and opportunities.  
   - **Goal**: Improve financial planning by focusing on high-level insights while reducing time spent on document analysis.

## System Architecture

Below is the system architecture for the AI-Enabled Enterprise Document Summarizer:

![System Architecture](https://github.com/user-attachments/assets/4b1bdb6a-a157-4bfd-8f87-45dfbe465955)

## Tech Stack

The following technologies and tools power this project:

### Frontend:
- **React.js**: For building the user-friendly and interactive frontend interface.
- **AWS Amplify**: For deploying and hosting the frontend.

### Backend:
- **Express.js**: For creating a lightweight and efficient server-side application.
- **AWS AppRunner**: For deploying the backend services.

### Database:
- **AWS RDS with PostgreSQL**: For secure and scalable storage of user data and session details.
- **Qdrant**: For storing and retrieving document embeddings efficiently.

### AI Models:
- **GPT-3.5-turbo**: For generating context-aware responses and summaries.
- **Text-Embedding-Ada-002**: For creating embeddings of uploaded documents.

### Other Tools:
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **In-Memory Caching**: To optimize performance by storing frequently accessed embeddings.

## Monitoring

To ensure the system operates efficiently and reliably, we use **AWS CloudWatch** for monitoring. Key metrics tracked include:
- **Frontend Performance**: Page load times and error rates are monitored to ensure a smooth user experience.
- **Backend Performance**: API response times, error logs, and system uptime are tracked to maintain stability.
- **Database Metrics**: Query performance, storage utilization, and connection health are monitored for both AWS RDS and Qdrant.
- **Resource Utilization**: CloudWatch provides insights into CPU, memory, and network usage to optimize scaling and resource allocation.

By leveraging AWS CloudWatch, the system can proactively identify and address potential bottlenecks, ensuring high performance and reliability for all users.
