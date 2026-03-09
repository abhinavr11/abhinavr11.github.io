const publicUrl = process.env.PUBLIC_URL && process.env.PUBLIC_URL !== '.'
  ? process.env.PUBLIC_URL
  : '';

export const portfolioData = {
  personal: {
    name: "Abhinav Raghuvanshi",
    title: "Researcher & Engineer",
    location: "Thane, Maharashtra",
    email: "abhinav.raghuvanshi2.ar@gmail.com",
    github: "https://github.com/abhinavr11",
    linkedin: "https://www.linkedin.com/in/abhinavr11/",
    scholar: "https://scholar.google.com/citations?hl=en&user=iF4H3-EAAAAJ",
    x: "https://x.com/abhinxvr",
    bio: "I am a researcher, working at the intersection of optimization, machine learning, and graph neural networks. I completed my B.Tech in Aerospace Engineering with a Minor in Computer Science from IIT Bombay. My research focuses on developing scalable algorithms for complex real-world problems, from railway scheduling to spatial transcriptomics."
  },
  
  education: [
    {
      institution: "Indian Institute of Technology, Bombay",
      degree: "B.Tech in Aerospace Engineering",
      minor: "Minor in Computer Science and Engineering",
      duration: "2020 - 2024",
      grade: "CPI 8.27/10"
    },
    {
      institution: "JB Academy",
      degree: "Intermediate/+2",
      duration: "2004 - 2019",
      grade: "97.40%"
    }
  ],

  updates: [
    {
      date: "January 2025",
      text: "Paper on gradient-based optimal function learning submitted to TMLR"
    },
    {
      date: "May 2024",
      text: "Received Undergraduate Research Award for best undergraduate thesis"
    }
  ],

  awards: [
    {
      title: "Undergraduate Research Award",
      organization: "IIT Bombay",
      year: "2024",
      description: "Best undergraduate thesis"
    }
  ],

  services: [
    {
      role: "Head Teaching Assistant",
      organization: "CS86 - Distributed Optimization and Machine Learning, NPTEL",
      year: "2025"
    },
    {
      role: "Reviewer",
      organization: "Eleventh Indian Control Conference (ICC-11)",
      year: "2025"
    },
    {
      role: "Teaching Assistant",
      organization: "Operating System Bootcamp, CSERL, IITB",
      year: "2022"
    },
    {
      role: "Mentor",
      organization: "Seasons of Code - Multiple Projects",
      year: "2022-2023"
    }
  ],

  publications: [
    {
      id: "pub1",
      title: "On a Gradient Approach to Optimal Function Learning via Chebyshev Centers",
      authors: "Abhinav Raghuvanshi, Mayank Baranwal, Debasish Chatterjee",
      venue: "Accepted at TMLR",
      year: "2025",
      description: "Introduced gradOL++, a novel gradient-based approach to solve Chebyshev center problems for function learning. Demonstrated faster empirical performance compared to gradOL v1 and SIPAMPL. Performed formal convergence analysis showing enhanced stability and refined learning rate selection.",
      links: [{ text: "OpenReview", url: "https://openreview.net/forum?id=lPZVsDhyj3" }]
    },
    {
      id: "pub5",
      title: "Quantized Stochastic Primal–Dual Methods for Distributed Optimization under Relaxed Global Geometry",
      authors: "Abhinav Raghuvanshi*, Susmit Sarkar*, Kushal Chakrabarti, Mayank Baranwal",
      venue: "Under review in UAI",
      year: "2026",
      description: "We study distributed optimization with stochastic gradients and finite-bit communication modeled by random (unbiased) quantization. We propose q-PDGD, a quantized stochastic primal–dual method, and analyze it under relaxed global geometry. Under restricted secant inequality (RSI), a constant step-size yields linear contraction to an explicit neighborhood determined by gradient noise.",
      links: []
    },
    {
      id: "pub2",
      title: "Fast Tracks Only: Delay-Prioritized Event Queues for Efficient Scalable Railway Scheduling",
      authors: "Anandsingh Chauhan, Abhinav Raghuvanshi, Tamoghno Kandar, Mayank Baranwal",
      venue: "Under review in AAMAS",
      year: "2026",
      description: "Tackled the NP-hard railway scheduling problem as a multi-agent dynamical system. Designed PRIORITY-Q, a resource-aware optimization algorithm using prioritized event queues. Provided formal safety guarantees (collision- and deadlock-free) and achieved faster computation than RL baselines.",
      links: []
    },
    {
      id: "pub3",
      title: "STING: A Graph Neural Network Approach for Computational Inference of Spatial Transcriptomic Profiles",
      authors: "Kaushik Karambelkar, Abhinav Raghuvanshi, Arvind Rao, Mayank Baranwal",
      venue: "To be submitted",
      year: "2024",
      description: "Developed STING, combining KimiaNet and graph neural networks to infer spatially resolved gene expression from histopathology images. Achieved Pearson correlation coefficients up to 0.79 for super-resolution and 0.69 for tissue-wide inference.",
      links: []
    },
    {
      id: "pub4",
      title: "GGNNs: Generalizing GNNs using Residual Connections and Weighted Message Passing",
      authors: "Abhinav Raghuvanshi, Kushal Sokke Malleshappa",
      venue: "Preprint",
      year: "2023",
      description: "Proposed generalized graph neural network architecture with residual connections and weighted message passing mechanisms.",
      links: [{text: "PDF", url: "#"}]
    }
  ],

  projects: [
    {
      id: "proj1",
      title: "Railway Scheduling Optimization System",
      organization: "Prof Baranwal's Research Group",
      duration: "Aug 2024 - Present",
      description: "Tackled NP-hard railway scheduling as multi-agent system with real-world constraints. Designed PRIORITY-Q algorithm with prioritized event queues and look-ahead planning. Achieved faster computation and lower delay costs than RL baselines on Indian Railways networks.",
      skills: ["Multi-agent Systems", "Optimization", "Graph Algorithms"]
    },
    {
      id: "proj2",
      title: "STING: Spatial Transcriptomics Inference",
      organization: "Prof Baranwal's Research Group",
      duration: "Aug 2024 - Present",
      description: "Developed computational framework combining KimiaNet and GNNs for spatial gene expression inference. Modeled tissue architecture as nearest-neighbor graphs. Validated on public datasets with strong correlation coefficients.",
      skills: ["Graph Neural Networks", "Computer Vision", "Bioinformatics"]
    },
    {
      id: "proj3",
      title: "Space Vehicle Trajectory Control using RL",
      organization: "IIT Kanpur",
      duration: "Aug 2022 - Sept 2023",
      description: "Developed RL frameworks for unstable spacecraft trajectories. Designed simulation environment for satellite capture. Implemented and benchmarked PPO and A2C algorithms for autonomous guidance.",
      skills: ["Reinforcement Learning", "Control Systems", "Simulation"]
    },
    {
      id: "proj4",
      title: "STRIDE - Autonomous Quadruped Robot",
      organization: "IIT Bombay",
      duration: "Oct 2021 - Jun 2022",
      description: "Worked on autonomous quadruped for hazardous environments under $14,000 grant. Engineered end-to-end ASR system with 50% parameter reduction. Implemented vision and manipulation modules using OpenCV and ROS.",
      skills: ["Robotics", "Computer Vision", "ROS", "ASR"]
    },
    {
      id: "proj5",
      title: "The Humanoid Project",
      organization: "IIT Bombay",
      duration: "Dec 2022 - Jun 2023",
      description: "Led navigation system development for humanoid robot under $1700 grant. Implemented Kalman filter-based SLAM algorithm. Developed real-time localization using AprilTag fiducial markers in ROS2.",
      skills: ["SLAM", "Navigation", "ROS2", "Computer Vision"]
    }
  ],

  technicalWritings: [
    {
      id: "pdf1",
      title: "Unconstrained Nonsmooth Nonconvex Convergence Analysis",
      date: "January 2025",
      excerpt: "A comprehensive analysis of convergence properties in unconstrained optimization problems involving nonsmooth and nonconvex functions.",
      readTime: "Research Paper",
      isPdf: true,
      pdfUrl: `${publicUrl}/unconstrained_nonsmooth_nonconvex_convergence.pdf`
    }
  ],

  nonTechnicalWritings: [],

  writingContent: {
    tech2: {
      title: "Optimization Algorithms for Large-Scale Systems",
      date: "November 2024",
      content: `# Optimization Algorithms for Large-Scale Systems

Optimization is at the heart of modern machine learning and systems design. In this article, we examine gradient-based methods for large-scale problems.

## Gradient Descent Fundamentals

The basic gradient descent update is:

$$\theta_{t+1} = \theta_t - \eta \nabla f(\theta_t)$$

where $\eta$ is the learning rate and $f$ is the objective function.

## Stochastic Gradient Descent

For large datasets, we use stochastic approximations:

$$\theta_{t+1} = \theta_t - \eta \nabla f_i(\theta_t)$$

where $f_i$ is computed on a mini-batch of data.

## Convergence Analysis

Under convex assumptions, we can bound the convergence rate:

$$f(\theta_T) - f^* \leq \frac{1}{\eta T} ||\theta_0 - \theta^*||^2$$

This provides theoretical guarantees for optimization.

## Distributed Optimization

For multi-agent systems, consensus-based methods are effective:

$$x_i^{k+1} = \sum_{j \in \mathcal{N}_i} w_{ij} x_j^k - \eta \nabla f_i(x_i^k)$$

where $w_{ij}$ are mixing weights between agents.

## Conclusion

Efficient optimization algorithms are essential for scaling machine learning to real-world applications.`
    },
    non2: {
      title: "From Aerospace to Computer Science: A Branch Change Story",
      date: "September 2024",
      content: `# From Aerospace to Computer Science: A Branch Change Story

When I entered IIT Bombay in 2020 with an Aerospace Engineering seat, I wasn't entirely sure what aerospace engineering entailed. Like many students, I had chosen based on JEE rank and perceived prestige rather than genuine interest.

## The Realization

My first semester exposed me to the beauty of mathematics and programming. I found myself spending more time on CS assignments than on aerospace courses. I was fascinated by algorithms, machine learning, and the endless possibilities of software.

## The Decision

Branch change at IIT Bombay is highly competitive—only the top 5-6% of students can switch branches. The decision to pursue it wasn't easy. It meant doubling down on academics during my first year, sacrificing social activities and personal projects.

## The Journey

I spent that year learning not just for exams, but for understanding. I attended extra lectures, solved additional problems, and sought help from seniors. The pressure was intense, but it was driven by a clear goal: to study what I truly loved.

## The Outcome

When the results came out, I was among the 120 students who secured a branch change. Moving to Computer Science felt like coming home. Suddenly, every course was exciting. Every project was an opportunity to learn something I genuinely cared about.

## Reflections

Looking back, I'm grateful for the experience. It taught me about determination, goal-setting, and the importance of pursuing your passion. My aerospace background also gave me a unique perspective in CS—systems thinking, mathematical rigor, and problem-solving skills that continue to serve me well.

To students considering branch change: if you're genuinely passionate about a different field, go for it. The effort is worth it.`
    }
  },

  skills: {
    programming: ["Python", "C/C++", "JavaScript", "Dart"],
    frameworks: ["PyTorch", "TensorFlow", "HuggingFace", "OpenCV", "Scikit-learn"],
    tools: ["Git", "ROS", "AWS", "Docker", "Linux"],
    areas: ["Machine Learning", "Graph Neural Networks", "Optimization", "Reinforcement Learning", "Computer Vision"]
  },

  references: [
    {
      name: "Prof. Debasish Chatterjee",
      position: "Professor, Centre for Systems and Control",
      organization: "IIT Bombay",
      email: "dchatter@iitb.ac.in"
    },
    {
      name: "Dr. Mayank Baranwal",
      position: "Senior Scientist, Data & Decision Sciences, TCS Research",
      organization: "Adjunct Assistant Professor, IIT Bombay",
      email: "mbaranwal@iitb.ac.in"
    },
    {
      name: "Prof. Anand Sivasubramaniam",
      position: "Distinguished Professor, Computer Science and Engineering",
      organization: "The Pennsylvania State University",
      email: "anand@cse.psu.edu"
    },
    {
      name: "Diptiman Purbey",
      position: "Senior Software Engineering Manager",
      organization: "Ex-Microsoft, Currently - Uber",
      email: "Diptiman.Purbey@microsoft.com"
    }
  ]
};
