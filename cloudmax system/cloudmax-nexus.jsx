import React, { useState, useEffect, useRef } from 'react';
import { Zap, Cloud, Brain, Lock, TrendingUp, Settings, User, LogOut, Menu, X, Send, Activity, Shield, Cpu, Database } from 'lucide-react';

const CloudMaxNexus = () => {
  // ============= STATE MANAGEMENT =============
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [agents, setAgents] = useState([]);
  const [cloudMetrics, setCloudMetrics] = useState({
    activeInstances: 0,
    dataProcessed: 0,
    costs: 0,
    apiCalls: 0
  });
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [agentThinking, setAgentThinking] = useState(false);

  // ============= AI AGENTS SYSTEM =============
  const aiAgents = {
    'NEXUS': {
      name: 'NEXUS',
      role: 'Master Orchestrator',
      color: 'from-cyan-500 to-blue-500',
      icon: '🧠',
      description: 'Coordinates all cloud operations and agent workflows'
    },
    'CLOUD-ANALYZER': {
      name: 'CloudAnalyzer',
      role: 'Cloud Infrastructure Analyst',
      color: 'from-purple-500 to-pink-500',
      icon: '☁️',
      description: 'Analyzes global free-tier cloud systems and their capabilities'
    },
    'DATA-ENGINEER': {
      name: 'DataEngineer',
      role: 'Data Pipeline Architect',
      color: 'from-green-500 to-emerald-500',
      icon: '📊',
      description: 'Designs and optimizes data workflows across cloud platforms'
    },
    'SECURITY-GUARDIAN': {
      name: 'SecurityGuardian',
      role: 'Cloud Security Auditor',
      color: 'from-red-500 to-orange-500',
      icon: '🔐',
      description: 'Monitors security posture and compliance across cloud resources'
    },
    'COST-OPTIMIZER': {
      name: 'CostOptimizer',
      role: 'Financial Intelligence Agent',
      color: 'from-yellow-500 to-amber-500',
      icon: '💰',
      description: 'Identifies cost-saving opportunities and budget optimization'
    },
    'DEVOPS-SENTINEL': {
      name: 'DevOpsSentinel',
      role: 'Infrastructure Automation',
      color: 'from-indigo-500 to-purple-500',
      icon: '⚙️',
      description: 'Automates deployment, scaling, and infrastructure management'
    },
    'ML-GENIUS': {
      name: 'MLGenius',
      role: 'Machine Learning Optimizer',
      color: 'from-pink-500 to-rose-500',
      icon: '🤖',
      description: 'Optimizes ML models and provides predictive analytics'
    },
    'API-GATEWAY': {
      name: 'APIGateway',
      role: 'Integration Hub',
      color: 'from-teal-500 to-cyan-500',
      icon: '🌐',
      description: 'Manages APIs, webhooks, and third-party integrations'
    },
    'PREDICTOR': {
      name: 'Predictor',
      role: 'Future-Forecasting Engine',
      color: 'from-violet-500 to-purple-500',
      icon: '🔮',
      description: 'Uses DeepSeek reasoning for predictive insights and anomaly detection'
    },
    'AUTONOMY-ENGINE': {
      name: 'AutonomyEngine',
      role: 'Autonomous Task Executor',
      color: 'from-orange-500 to-red-500',
      icon: '⚡',
      description: 'Executes complex tasks autonomously with AI reasoning'
    }
  };

  // ============= AUTHENTICATION =============
  const handleLogin = (email) => {
    setIsAuthenticated(true);
    setUser({ email, avatar: email[0].toUpperCase() });
    addSystemMessage(`Welcome to CLOUDMAX NEXUS, ${email}! All 10 agents are now active.`);
    initializeAgents();
  };

  // ============= AGENT INITIALIZATION =============
  const initializeAgents = () => {
    const agentList = Object.entries(aiAgents).map(([key, agent]) => ({
      id: key,
      ...agent,
      status: 'active',
      lastUpdate: new Date(),
      metrics: {
        tasksCompleted: Math.floor(Math.random() * 100),
        avgResponse: Math.floor(Math.random() * 500) + 100
      }
    }));
    setAgents(agentList);
  };

  // ============= REAL-TIME METRICS =============
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      setCloudMetrics(prev => ({
        activeInstances: prev.activeInstances + Math.floor(Math.random() * 3),
        dataProcessed: prev.dataProcessed + Math.floor(Math.random() * 50),
        costs: (prev.costs + Math.random() * 0.5).toFixed(2),
        apiCalls: prev.apiCalls + Math.floor(Math.random() * 100)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // ============= MESSAGE HANDLING =============
  const addSystemMessage = (text) => {
    setMessages(prev => [...prev, { type: 'system', text, timestamp: new Date() }]);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    setMessages(prev => [...prev, { type: 'user', text: userInput, timestamp: new Date() }]);
    setUserInput('');
    setAgentThinking(true);

    // Simulate agent thinking and response
    await new Promise(resolve => setTimeout(resolve, 1500));

    const selectedAgent = agents[Math.floor(Math.random() * agents.length)];
    const responses = [
      `${selectedAgent.name} analyzed your request using DeepSeek reasoning framework. Cloud infrastructure optimized by 34%. Recommending auto-scaling for 2 AWS instances.`,
      `${selectedAgent.name} processed your query across 15 global cloud regions. Identified $127 in monthly savings through reserved instances.`,
      `${selectedAgent.name} executed ML-powered anomaly detection. 0 security threats detected. System health: 99.99% uptime.`,
      `${selectedAgent.name} generated predictive forecast: +23% resource demand in next 7 days. Recommending preemptive scaling.`,
      `${selectedAgent.name} analyzed all free-tier offerings. Recommended GCP BigQuery + AWS Lambda combination for optimal cost-efficiency.`,
    ];

    setMessages(prev => [...prev, {
      type: 'agent',
      agent: selectedAgent.name,
      text: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date()
    }]);

    setAgentThinking(false);
  };

  // ============= LOGIN SCREEN =============
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Animated background grid */}
        <div className="fixed inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-transparent to-purple-500 animate-pulse" />
          <div className="absolute inset-0 background-grid" />
        </div>

        {/* Login container */}
        <div className="relative flex items-center justify-center min-h-screen px-4">
          <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
            @keyframes pulse-border {
              0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.5); }
              50% { box-shadow: 0 0 40px rgba(0, 255, 255, 0.8); }
            }
            .background-grid {
              background-image: 
                linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
              background-size: 50px 50px;
            }
            .float-animation { animation: float 3s ease-in-out infinite; }
            .pulse-border { animation: pulse-border 2s ease-in-out infinite; }
          `}</style>

          <div className="relative w-full max-w-md">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-75 animate-pulse" />

            {/* Main container */}
            <div className="relative bg-gray-900 rounded-lg p-8 border border-cyan-500/50">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="float-animation text-5xl">
                    ⚡
                  </div>
                </div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  CLOUDMAX
                </h1>
                <p className="text-cyan-300 text-sm tracking-widest">NEXUS PORTAL v2.1</p>
                <p className="text-gray-400 text-xs mt-2">Advanced AI Cloud Intelligence Platform</p>
              </div>

              {/* Login form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-cyan-300 mb-2 uppercase tracking-wider">Cloud Email</label>
                  <input
                    type="email"
                    placeholder="admin@cloudmax.nexus"
                    defaultValue="admin@example.com"
                    className="w-full bg-gray-800 border border-cyan-500/30 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs text-cyan-300 mb-2 uppercase tracking-wider">Biometric Key</label>
                  <input
                    type="password"
                    placeholder="••••••••••"
                    defaultValue="cloudmax123"
                    className="w-full bg-gray-800 border border-cyan-500/30 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                  />
                </div>

                <button
                  onClick={() => handleLogin('admin@cloudmax.nexus')}
                  className="w-full mt-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded uppercase text-sm tracking-wider hover:shadow-lg hover:shadow-cyan-500/50 transition pulse-border"
                >
                  Access NEXUS
                </button>
              </div>

              {/* Status indicators */}
              <div className="mt-6 pt-6 border-t border-cyan-500/20 grid grid-cols-3 gap-2 text-xs text-center">
                <div className="bg-gray-800 rounded p-2">
                  <div className="text-cyan-400 font-bold">10</div>
                  <div className="text-gray-500">AI Agents</div>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <div className="text-purple-400 font-bold">150+</div>
                  <div className="text-gray-500">Cloud APIs</div>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <div className="text-green-400 font-bold">99.99%</div>
                  <div className="text-gray-500">Uptime</div>
                </div>
              </div>
            </div>

            {/* Footer info */}
            <div className="mt-6 text-center text-xs text-gray-500">
              <p>Powered by DeepSeek AI Reasoning Engine</p>
              <p className="mt-1">© 2026 CloudMax Inc. | All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============= MAIN DASHBOARD =============
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex">
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes glow-pulse { 0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 255, 0.3); } 50% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.6); } }
        @keyframes scan-line { 0% { top: 0%; } 100% { top: 100%; } }
        @keyframes data-flow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        .glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
        .float { animation: float 3s ease-in-out infinite; }
        .scan-line { animation: scan-line 3s linear infinite; }
        .data-flow { animation: data-flow 1.5s ease-in-out infinite; }
        .background-grid {
          background-image: 
            linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .gradient-text {
          background: linear-gradient(135deg, #00ffff, #ff00ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-950 border-r border-cyan-500/20 transition-all duration-300 flex flex-col relative overflow-hidden`}>
        <div className="absolute inset-0 background-grid opacity-5" />

        {/* Logo */}
        <div className="relative p-4 border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <div className="text-2xl float">⚡</div>
            {sidebarOpen && (
              <div>
                <div className="text-sm font-black gradient-text">CLOUDMAX</div>
                <div className="text-xs text-cyan-300">NEXUS</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Cloud },
            { id: 'agents', label: 'AI Agents', icon: Brain },
            { id: 'cloud-services', label: 'Cloud Services', icon: Zap },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'chat', label: 'AI Chat', icon: Send }
          ].map(item => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border border-cyan-500/50 text-cyan-300'
                    : 'text-gray-400 hover:text-cyan-300 hover:bg-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent size={18} />
                  {sidebarOpen && <span>{item.label}</span>}
                </div>
              </button>
            );
          })}
        </nav>

        {/* User section */}
        <div className="relative p-4 border-t border-cyan-500/20">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-gray-400 hover:text-red-400 transition"
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-4 top-1/2 bg-cyan-500 text-black p-1 rounded-full hover:bg-cyan-400 transition"
        >
          {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="h-16 bg-gray-950 border-b border-cyan-500/20 flex items-center justify-between px-6 relative">
          <div className="absolute inset-0 background-grid opacity-5" />
          <div className="relative flex items-center gap-2">
            <Zap className="text-cyan-400" size={20} />
            <h2 className="text-lg font-bold">{activeTab.toUpperCase().replace('-', ' ')}</h2>
          </div>
          <div className="relative flex items-center gap-4">
            <div className="text-sm text-gray-400">
              {user?.email}
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-xs font-bold">
              {user?.avatar}
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-auto relative">
          <div className="absolute inset-0 background-grid opacity-5" />

          <div className="relative p-6 max-w-7xl mx-auto">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Metrics grid */}
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: 'Active Instances', value: cloudMetrics.activeInstances, icon: Cloud, color: 'from-cyan-500 to-blue-500' },
                    { label: 'Data Processed (GB)', value: cloudMetrics.dataProcessed, icon: Database, color: 'from-purple-500 to-pink-500' },
                    { label: 'Monthly Cost ($)', value: cloudMetrics.costs, icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
                    { label: 'API Calls', value: cloudMetrics.apiCalls, icon: Zap, color: 'from-yellow-500 to-orange-500' }
                  ].map((metric, i) => {
                    const Icon = metric.icon;
                    return (
                      <div key={i} className="bg-gray-900 border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/50 transition group cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition" style={{ backgroundImage: `linear-gradient(to bottom right, rgb(0, 255, 255), rgb(255, 0, 255))` }} />
                        <div className="relative flex items-start justify-between">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{metric.label}</p>
                            <p className={`text-3xl font-black bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                              {metric.value}
                            </p>
                          </div>
                          <Icon className="text-gray-600 group-hover:text-cyan-400 transition" size={24} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Cloud Services section */}
                <div className="bg-gray-900 border border-cyan-500/20 rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Cloud size={20} className="text-cyan-400" />
                    Global Free Cloud Services Status
                  </h3>
                  <div className="grid grid-cols-5 gap-4">
                    {[
                      { name: 'AWS Free Tier', status: 'Active', users: '1.2M' },
                      { name: 'Google Cloud', status: 'Active', users: '800K' },
                      { name: 'Azure Free', status: 'Active', users: '650K' },
                      { name: 'Heroku Free', status: 'Active', users: '500K' },
                      { name: 'Firebase', status: 'Active', users: '450K' }
                    ].map((service, i) => (
                      <div key={i} className="bg-gray-800 rounded-lg p-4 border border-green-500/30 hover:border-green-500/60 transition">
                        <p className="text-sm font-bold mb-2">{service.name}</p>
                        <p className="text-xs text-green-400 mb-2">● {service.status}</p>
                        <p className="text-xs text-gray-500">{service.users} users</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* AI Agents Tab */}
            {activeTab === 'agents' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {agents.map((agent, i) => (
                    <div key={i} className="bg-gray-900 border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/50 transition group cursor-pointer relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition bg-gradient-to-r ${agent.color}`} />
                      <div className="relative">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-2xl mb-1">{agent.icon}</p>
                            <p className="text-sm font-bold">{agent.name}</p>
                            <p className="text-xs text-gray-500">{agent.role}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Activity size={16} className={`${agent.status === 'active' ? 'text-green-400 animate-pulse' : 'text-gray-500'}`} />
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mb-3">{agent.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-gray-800 rounded p-2">
                            <p className="text-gray-500">Tasks</p>
                            <p className="font-bold text-cyan-400">{agent.metrics.tasksCompleted}</p>
                          </div>
                          <div className="bg-gray-800 rounded p-2">
                            <p className="text-gray-500">Response</p>
                            <p className="font-bold text-cyan-400">{agent.metrics.avgResponse}ms</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cloud Services Tab */}
            {activeTab === 'cloud-services' && (
              <div className="space-y-4">
                <div className="bg-gray-900 border border-cyan-500/20 rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4">Integrated Cloud Platforms & APIs</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { category: 'Compute', services: ['AWS EC2', 'Google Compute', 'Azure VM', 'Heroku', 'Vercel'] },
                      { category: 'Storage', services: ['S3', 'GCS', 'Azure Blob', 'Firebase', 'Supabase'] },
                      { category: 'Database', services: ['RDS', 'Firestore', 'MongoDB Atlas', 'PostgreSQL', 'DynamoDB'] },
                      { category: 'AI/ML', services: ['SageMaker', 'Vertex AI', 'Hugging Face', 'Replicate', 'Together AI'] },
                      { category: 'Analytics', services: ['BigQuery', 'Dataflow', 'Athena', 'Redshift', 'Snowflake'] },
                      { category: 'DevOps', services: ['GitHub Actions', 'CloudBuild', 'Terraform', 'Docker', 'Kubernetes'] }
                    ].map((platform, i) => (
                      <div key={i} className="bg-gray-800 rounded-lg p-4 border border-purple-500/30 hover:border-purple-500/60 transition">
                        <p className="font-bold text-purple-400 mb-2">{platform.category}</p>
                        <ul className="space-y-1 text-xs text-gray-400">
                          {platform.services.map((service, j) => (
                            <li key={j} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                              {service}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 border border-cyan-500/20 rounded-lg p-6 relative overflow-hidden h-64">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500 via-transparent to-transparent data-flow" />
                    </div>
                    <div className="relative">
                      <p className="text-sm font-bold mb-4">Cost Trend (30 Days)</p>
                      <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="flex items-end gap-2">
                            <div className="text-xs text-gray-500 w-10">Day {(i+1)*6}</div>
                            <div className="h-8 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t" style={{ width: `${Math.random() * 200}px` }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 border border-cyan-500/20 rounded-lg p-6 relative overflow-hidden h-64">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-500 via-transparent to-transparent data-flow" />
                    </div>
                    <div className="relative">
                      <p className="text-sm font-bold mb-4">Resource Utilization</p>
                      <div className="space-y-3">
                        {['CPU', 'Memory', 'Storage', 'Network'].map((resource, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-xs mb-1">
                              <span>{resource}</span>
                              <span className="text-purple-400">{Math.floor(Math.random() * 100)}%</span>
                            </div>
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${Math.random() * 100}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-4">
                <div className="bg-gray-900 border border-green-500/20 rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Shield size={20} className="text-green-400" />
                    Security Status
                  </h3>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { label: 'Threats Detected', value: '0', color: 'text-green-400' },
                      { label: 'Auth Events', value: '2,847', color: 'text-blue-400' },
                      { label: 'Encryption Keys', value: '156', color: 'text-purple-400' },
                      { label: 'Compliance Score', value: '99.2%', color: 'text-green-400' }
                    ].map((item, i) => (
                      <div key={i} className="bg-gray-800 rounded-lg p-4 border border-green-500/20">
                        <p className="text-xs text-gray-500 mb-2">{item.label}</p>
                        <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* AI Chat Tab */}
            {activeTab === 'chat' && (
              <div className="h-full flex flex-col">
                <div className="flex-1 bg-gray-900 border border-cyan-500/20 rounded-lg p-4 mb-4 overflow-y-auto space-y-4">
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500">
                      <Brain size={48} className="mb-4 opacity-50" />
                      <p>Chat with AI agents to analyze cloud infrastructure,</p>
                      <p>optimize costs, or predict future resource needs</p>
                    </div>
                  ) : (
                    messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.type === 'user'
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                            : msg.type === 'system'
                            ? 'bg-gray-800 border border-green-500/50 text-green-300'
                            : 'bg-gray-800 border border-purple-500/50 text-purple-300'
                        }`}>
                          {msg.type === 'agent' && (
                            <p className="text-xs font-bold mb-1 text-purple-400">{msg.agent}</p>
                          )}
                          <p className="text-sm">{msg.text}</p>
                        </div>
                      </div>
                    ))
                  )}
                  {agentThinking && (
                    <div className="flex justify-start">
                      <div className="bg-gray-800 border border-purple-500/50 px-4 py-2 rounded-lg text-purple-300">
                        <p className="text-sm">Agents analyzing... <span className="animate-pulse">●●●</span></p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input area */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask agents about cloud optimization, costs, security..."
                    className="flex-1 bg-gray-900 border border-cyan-500/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={agentThinking || !userInput.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-50"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudMaxNexus;
