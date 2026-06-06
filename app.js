document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // MOBILE NAV MENU TOGGLE
    // ==========================================================================
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Simple indicator rotation
        mobileMenuToggle.style.transform = navMenu.classList.contains('active') ? 'rotate(90deg)' : 'none';
    });

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.style.transform = 'none';
        });
    });

    // ==========================================================================
    // LIGHT / DARK MODE THEME SYSTEM
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    const body = document.body;

    // Load theme preference from localStorage or fallback to system dark-theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        body.className = prefersDark ? 'dark-theme' : 'light-theme';
    }
    updateThemeIcons();

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
        updateThemeIcons();
    });

    function updateThemeIcons() {
        if (body.classList.contains('dark-theme')) {
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        } else {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
    }

    // ==========================================================================
    // EXPERIENCE & EDUCATION TAB SWITCHER
    // ==========================================================================
    const tabExperience = document.getElementById('tab-experience');
    const tabEducation = document.getElementById('tab-education');
    const panelExperience = document.getElementById('tabpanel-experience');
    const panelEducation = document.getElementById('tabpanel-education');

    tabExperience.addEventListener('click', () => {
        tabExperience.classList.add('active');
        tabExperience.setAttribute('aria-selected', 'true');
        tabEducation.classList.remove('active');
        tabEducation.setAttribute('aria-selected', 'false');
        
        panelExperience.classList.add('active');
        panelEducation.classList.remove('active');
    });

    tabEducation.addEventListener('click', () => {
        tabEducation.classList.add('active');
        tabEducation.setAttribute('aria-selected', 'true');
        tabExperience.classList.remove('active');
        tabExperience.setAttribute('aria-selected', 'false');
        
        panelEducation.classList.add('active');
        panelExperience.classList.remove('active');
    });

    // ==========================================================================
    // AI AGENT INTERACTIVE TERMINAL SIMULATOR
    // ==========================================================================
    const cliInput = document.getElementById('terminal-cli-input');
    const terminalOutputs = document.getElementById('terminal-outputs');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');

    // Document store containing structured information for our simulated RAG engine
    const documentStore = {
        etihad: "At Etihad, Rachana built a multi-agent flight chatbot using LangChain and LangGraph. She optimized a FAQ RAG model over MongoDB Vector DB using HNSW indexing and constructed an enterprise MCP Server using WebSockets (Starlette/Uvicorn) with Okta OAuth 2.0 and Azure Key Vault.",
        goldman: "At Goldman Sachs, she implemented semantic schema mapping using Cohere LLM over Amazon Bedrock and Qdrant Vector Search. She also managed real-time feature stores feeding daily pipelines using Airflow, Redshift, and PySpark on AWS EMR.",
        optum: "At Optum, Rachana was a Data & AI Engineer. She engineered streaming pipelines using Kafka, GCP BigQuery, and Confluent Schema Registry. She also led a 100+ TB claims data migration to GCP.",
        equifax: "At Equifax, she worked on Greenplum Database pipelines and developed automation scripts using Python, SAS (base/macros), and MySQL.",
        skills: "AI Orchestration: LangGraph, LangChain, Router-ReAct, MCP (FastMCP).\nMLOps & Observability: Langfuse, LangGraph Studio, WebSockets, Pydantic, Grafana.\nData Engineering: PySpark, Databricks Workflows, dbt, Delta Lake, Snowflake, BigQuery.\nDatabases: MongoDB Vector DB, Qdrant, Pinecone, Greenplum, PostgreSQL.",
        certifications: "Rachana holds certifications: Databricks Certified Data Engineer Professional, Microsoft Azure AI Engineer Associate (AI-102), AWS Certified Data Engineer Associate, DP-203 Azure Data Engineer, and SAS 9.4 fundamentals.",
        projects: "Featured Repositories:\n- FastMCP-Aviation-Tooling (Custom flight data MCP server via WebSockets)\n- Agentic-RAG-Framework (Self-correcting GraphRAG using LangGraph & Qdrant)\n- Privacy-Redactor-LLM (Local PII anonymizer for secure LLM pipelines)"
    };

    // Command listener
    cliInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = cliInput.value.trim();
            if (cmd) {
                processCommand(cmd);
            }
            cliInput.value = '';
        }
    });

    // Suggestions handler
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            processCommand(cmd);
        });
    });

    function printLine(text, cssClass = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${cssClass}`;
        line.innerHTML = text;
        terminalOutputs.appendChild(line);
        
        // Auto scroll
        const bodyContainer = document.getElementById('terminal-body');
        bodyContainer.scrollTop = bodyContainer.scrollHeight;
    }

    function processCommand(rawCmd) {
        // Output the prompt line
        printLine(`rachana-agent-cli> ${rawCmd}`, 'user-line');
        
        const lowerCmd = rawCmd.toLowerCase();
        
        if (lowerCmd === 'clear') {
            terminalOutputs.innerHTML = '';
            return;
        }
        
        if (lowerCmd === 'help') {
            printLine(`Available commands in PortfolioBot CLI:`, 'system-line');
            printLine(`  <span class="highlight-cyan">help</span>          - Displays this menu`);
            printLine(`  <span class="highlight-cyan">skills</span>        - Outputs Rachana's technical skills matrix`);
            printLine(`  <span class="highlight-cyan">projects</span>      - Lists GitHub repositories & open-source tools`);
            printLine(`  <span class="highlight-cyan">certs</span>         - Displays certification details`);
            printLine(`  <span class="highlight-cyan">agent-run</span>     - Runs a simulated LangGraph routing/RAG query about Rachana`);
            printLine(`  <span class="highlight-cyan">clear</span>         - Wipes out the terminal screen`);
            return;
        }
        
        if (lowerCmd === 'skills') {
            printLine(`[Node: SkillsEngine] Fetching skills context...`, 'system-line');
            setTimeout(() => {
                printLine(documentStore.skills.replace(/\n/g, '<br>'));
            }, 250);
            return;
        }

        if (lowerCmd === 'projects') {
            printLine(`[Node: GitEngine] Indexing GitHub repositories...`, 'system-line');
            setTimeout(() => {
                printLine(documentStore.projects.replace(/\n/g, '<br>'));
            }, 250);
            return;
        }

        if (lowerCmd === 'certs' || lowerCmd === 'certifications') {
            printLine(`[Node: CredentialEngine] Matching digital badges...`, 'system-line');
            setTimeout(() => {
                printLine(documentStore.certifications.replace(/\n/g, '<br>'));
            }, 250);
            return;
        }

        if (lowerCmd.startsWith('agent-run')) {
            const query = rawCmd.slice(9).trim();
            if (!query) {
                printLine(`Usage: agent-run [query] (e.g. <span class="highlight-yellow">agent-run did she work at Etihad?</span>)`, 'system-line');
                return;
            }
            runAgenticRAG(query);
            return;
        }

        // Implicit agent-run fallback if it doesn't match a static command
        runAgenticRAG(rawCmd);
    }

    function runAgenticRAG(query) {
        printLine(`[Agentic RAG] Initializing sub-agent workflow...`, 'system-line');
        printLine(`[Node: Router] Analyzing query tokens: <span class="highlight-yellow">"${query}"</span>`, 'system-line');
        
        setTimeout(() => {
            let matchedDocs = [];
            const queryLower = query.toLowerCase();
            
            // Check keywords for matching knowledge store
            if (queryLower.includes('etihad') || queryLower.includes('flight') || queryLower.includes('airline')) {
                matchedDocs.push(documentStore.etihad);
                printLine(`[Node: Retrieval] Qdrant Similarity Search matched Etihad docs (Score: 0.94)`, 'system-line');
            }
            if (queryLower.includes('goldman') || queryLower.includes('sachs') || queryLower.includes('risk') || queryLower.includes('bedrock')) {
                matchedDocs.push(documentStore.goldman);
                printLine(`[Node: Retrieval] Qdrant Similarity Search matched Goldman Sachs docs (Score: 0.91)`, 'system-line');
            }
            if (queryLower.includes('optum') || queryLower.includes('claims') || queryLower.includes('kafka') || queryLower.includes('gcp')) {
                matchedDocs.push(documentStore.optum);
                printLine(`[Node: Retrieval] Qdrant Similarity Search matched Optum docs (Score: 0.89)`, 'system-line');
            }
            if (queryLower.includes('equifax') || queryLower.includes('greenplum') || queryLower.includes('sas')) {
                matchedDocs.push(documentStore.equifax);
                printLine(`[Node: Retrieval] Qdrant Similarity Search matched Equifax docs (Score: 0.87)`, 'system-line');
            }
            if (queryLower.includes('cert') || queryLower.includes('certified') || queryLower.includes('databricks')) {
                matchedDocs.push(documentStore.certifications);
                printLine(`[Node: Retrieval] Search matched Certifications docs (Score: 0.85)`, 'system-line');
            }
            if (queryLower.includes('project') || queryLower.includes('code') || queryLower.includes('git')) {
                matchedDocs.push(documentStore.projects);
                printLine(`[Node: Retrieval] Search matched Projects docs (Score: 0.88)`, 'system-line');
            }
            if (queryLower.includes('skill') || queryLower.includes('langgraph') || queryLower.includes('python')) {
                matchedDocs.push(documentStore.skills);
                printLine(`[Node: Retrieval] Search matched Skills matrix (Score: 0.84)`, 'system-line');
            }
            
            setTimeout(() => {
                if (matchedDocs.length === 0) {
                    // Fallback to searching all
                    printLine(`[Node: Retrieval] No direct keyword match. Scanning full vector store...`, 'system-line');
                    setTimeout(() => {
                        printLine(`[Node: Generation] Synthesizing general response from profile context:`, 'system-line');
                        printLine(`Rachana Patwal is an AI Engineer and Data Architect. Her expertise spans LangGraph multi-agent design, FastAPI, vector search, Spark, and Databricks. Try asking about her experience at <span class="highlight-cyan">Etihad</span>, <span class="highlight-cyan">Goldman Sachs</span>, or <span class="highlight-cyan">Optum</span>.`);
                    }, 500);
                } else {
                    printLine(`[Node: Self-Correction] Evaluating retrieved contexts for relevancy (Passed: 100% check)`, 'system-line');
                    setTimeout(() => {
                        printLine(`[Node: Generation] Formulating grounded answer:`, 'system-line');
                        matchedDocs.forEach(doc => {
                            printLine(doc.replace(/\n/g, '<br>'));
                        });
                    }, 400);
                }
            }, 300);
        }, 400);
    }

    // ==========================================================================
    // CONTACT FORM CLIENT SIMULATOR
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Check form validity
            if (contactForm.checkValidity()) {
                submitBtn.disabled = true;
                submitBtn.innerText = 'Routing Message...';
                
                // Simulate agent message routing
                setTimeout(() => {
                    contactForm.classList.add('hidden');
                    formSuccess.classList.remove('hidden');
                }, 1200);
            }
        });
    }
});
