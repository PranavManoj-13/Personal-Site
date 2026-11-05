const profile = {
  name: "Pranav",
  role: "Data science Student",
  email: "mpranavmanoj@gmail.com",
  github: "https://github.com/PranavManoj-13",
  linkedin: "https://linkedin.com/in/pranavmanoj13",
  instagram: "https://instagram.com/pranxvxv/",
  location: "Thiruvananthapuram, India",
  cv: "/cv.pdf",
  intro: "I'm a data science student interested in using data to guide better decision-making. My main focus is machine learning and biomedical AI, with a strong interest in web development."
};
const techStack = [
  { name: "HTML", logo: "/logos/html.svg", use: "Structure & semantics" },
  { name: "CSS", logo: "/logos/css.svg", use: "Interfaces & visual design" },
  { name: "Python", logo: "/logos/python.svg", use: "Scientific computing & AI" },
  { name: "C", logo: "/logos/c.svg", use: "Systems & fundamentals" },
  { name: "C++", logo: "/logos/cplusplus.svg", use: "Performance & algorithms" },
  { name: "R", logo: "/logos/r.svg", use: "Statistics & biological data" },
  { name: "Canva", logo: "/logos/canva.svg", use: "Visual communication" },
  { name: "SQL", logo: "/logos/sql.svg", use: "Querying & organising data" }
];
const projects = [
  {
    id: "intellimf",
    title: "IntelliMF — Intelligent Mutual Funds",
    description: "A web application that uses historical Indian mutual fund data to compare SIP investment frequencies and discover funds frequently bought together.",
    tags: ["Python", "HTML", "CSS", "JavaScript"],
    visual: "bars",
    color: "sage",
    question: "How does SIP investment frequency affect historical returns, and which mutual funds do investors commonly buy together?",
    approach: "I analysed historical net asset value (NAV) data for Indian mutual funds to compare weekly, bi-weekly, monthly, and bi-monthly Systematic Investment Plan (SIP) strategies. I also applied FP-Growth to investor baskets to identify funds frequently bought together. Built with Python, HTML, CSS, and JavaScript, the application brings these analyses together through a Flask API and a PostgreSQL database.",
    takeaway: "IntelliMF brings together historical performance analysis and association rule mining to explore two sides of mutual fund investing: when investments are made and which funds are held together.",
    githubUrl: "https://github.com/PranavManoj-13/IntelliMF",
    liveUrl: "https://intellimf.pranavmanoj.in"
  }
];

export {
  profile,
  projects,
  techStack
};
