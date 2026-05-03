import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Linkedin, GraduationCap, Twitter, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { portfolioData } from '../mock';

const Home = () => {
  const [expandedPub, setExpandedPub] = useState(null);
  const [expandedProj, setExpandedProj] = useState(null);
  const [openSections, setOpenSections] = useState({
    publications: false,
    projects: false,
    awards: false
  });
  const mapMyVisitorsWidgetSrc = "https://mapmyvisitors.com/map.js?cl=080808&w=500&t=tt&d=p_b13DPH_wIlvxdVFxRPKMWjiEVy4WhzWTl6AU8htFI&co=ffffff&cmo=3acc3a&cmn=ff5353&ct=808080";

  const togglePublication = (id) => {
    setExpandedPub(expandedPub === id ? null : id);
  };

  const toggleProject = (id) => {
    setExpandedProj(expandedProj === id ? null : id);
  };

  const toggleSection = (section) => {
    setOpenSections((currentSections) => ({
      ...currentSections,
      [section]: !currentSections[section]
    }));
  };

  useEffect(() => {
    const globeHost = document.getElementById("visitor-map-globe-host");
    if (!globeHost) {
      return undefined;
    }

    globeHost.innerHTML = "";

    const globeScript = document.createElement("script");
    globeScript.type = "text/javascript";
    globeScript.id = "mapmyvisitors";
    globeScript.src = mapMyVisitorsWidgetSrc;
    globeHost.appendChild(globeScript);

    return () => {
      globeHost.innerHTML = "";
    };
  }, [mapMyVisitorsWidgetSrc]);

  return (
    <div className="portfolio-container">
      {/* Header */}
      <header className="site-header">
        <div className="header-content">
          <nav className="site-nav">
            <a href="#about" className="nav-link">About</a>
            <a href="#publications" className="nav-link">Publications</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#awards" className="nav-link">Awards</a>
            <a href="#updates" className="nav-link">Updates</a>
            <Link to="/writings" className="nav-link">Writings</Link>
            <Link to="/miscellaneous" className="nav-link">Miscellaneous</Link>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="about">
        <div className="hero-content-with-photo">
          <div className="hero-photo">
            <img src={`${process.env.PUBLIC_URL}/profile.jpg`} alt={portfolioData.personal.name} className="profile-image" />
          </div>
          <div className="hero-text">
            <h1 className="hero-title">{portfolioData.personal.name}</h1>
            <p className="hero-subtitle">{portfolioData.personal.title}</p>
            <blockquote className="hero-quote">
              <span>"Only by being able to endure what people cannot bear, can you do what people cannot do."</span>
              <cite className="hero-quote-author">— John D. Rockefeller's Letter to His Son</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="content-section" id="about-detail">
        <h2 className="section-title">About</h2>
        <div className="section-content">
          <p className="bio-text">{portfolioData.personal.bio}</p>
        </div>
      </section>

      {/* Publications Section */}
      <section className="content-section" id="publications">
        <button
          className="section-toggle"
          type="button"
          onClick={() => toggleSection('publications')}
          aria-expanded={openSections.publications}
          aria-controls="publications-content"
        >
          <span className="section-title">Publications</span>
          {openSections.publications ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
        {openSections.publications && (
          <div className="section-content section-dropdown-content" id="publications-content">
            <div className="publications-list">
              {portfolioData.publications.map((pub) => (
                <div key={pub.id} className="publication-card">
                  <div
                    className="publication-header"
                    onClick={() => togglePublication(pub.id)}
                  >
                    <div className="publication-main">
                      <h3 className="publication-title">{pub.title}</h3>
                      <p className="publication-authors">{pub.authors}</p>
                      <p className="publication-venue">{pub.venue}, {pub.year}</p>
                    </div>
                    <button className="expand-btn" type="button" aria-label="Expand publication details">
                      {expandedPub === pub.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                  {expandedPub === pub.id && (
                    <div className="publication-details">
                      <p className="publication-desc">{pub.description}</p>
                      {pub.links.length > 0 && (
                        <div className="publication-links">
                          {pub.links.map((link, idx) => (
                            <a key={idx} href={link.url} className="pub-link" target="_blank" rel="noopener noreferrer">
                              {link.text}
                              <ExternalLink size={14} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Projects Section */}
      <section className="content-section" id="projects">
        <button
          className="section-toggle"
          type="button"
          onClick={() => toggleSection('projects')}
          aria-expanded={openSections.projects}
          aria-controls="projects-content"
        >
          <span className="section-title">Projects</span>
          {openSections.projects ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
        {openSections.projects && (
          <div className="section-content section-dropdown-content" id="projects-content">
            <div className="projects-list">
              {portfolioData.projects.map((proj) => (
                <div key={proj.id} className="project-card">
                  <div
                    className="project-header"
                    onClick={() => toggleProject(proj.id)}
                  >
                    <div className="project-main">
                      <h3 className="project-title">{proj.title}</h3>
                      <p className="project-org">{proj.organization}</p>
                      <p className="project-duration">{proj.duration}</p>
                    </div>
                    <button className="expand-btn" type="button" aria-label="Expand project details">
                      {expandedProj === proj.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                  {expandedProj === proj.id && (
                    <div className="project-details">
                      <p className="project-desc">{proj.description}</p>
                      <div className="project-skills">
                        {proj.skills.map((skill, idx) => (
                          <span key={idx} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Awards & Services Section */}
      <section className="content-section" id="awards">
        <button
          className="section-toggle"
          type="button"
          onClick={() => toggleSection('awards')}
          aria-expanded={openSections.awards}
          aria-controls="awards-content"
        >
          <span className="section-title">Awards & Services</span>
          {openSections.awards ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
        {openSections.awards && (
          <div className="section-content section-dropdown-content" id="awards-content">
            <div className="subsection">
              <h3 className="subsection-title">Awards & Honors</h3>
              <div className="awards-list">
                {portfolioData.awards.map((award, index) => (
                  <div key={index} className="award-item">
                    <div className="award-header">
                      <h4 className="award-title">{award.title}</h4>
                      <span className="award-year">{award.year}</span>
                    </div>
                    <p className="award-org">{award.organization}</p>
                    <p className="award-desc">{award.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">Services</h3>
              <div className="services-list">
                {portfolioData.services.map((service, index) => (
                  <div key={index} className="service-item">
                    <div className="service-header">
                      <h4 className="service-role">{service.role}</h4>
                      <span className="service-year">{service.year}</span>
                    </div>
                    <p className="service-org">{service.organization}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Updates Section */}
      <section className="content-section" id="updates">
        <h2 className="section-title">Updates</h2>
        <div className="section-content">
          <div className="updates-list">
            {portfolioData.updates.map((update, index) => (
              <div key={index} className="update-item">
                <span className="update-date">{update.date}</span>
                <p className="update-text">{update.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* References Section */}
      <section className="content-section" id="references">
        <h2 className="section-title">References</h2>
        <div className="section-content">
          <div className="references-list">
            {portfolioData.references.map((ref, index) => (
              <div key={index} className="reference-item">
                <h4 className="ref-name">{ref.name}</h4>
                <p className="ref-position">{ref.position}</p>
                <p className="ref-org">{ref.organization}</p>
                <a href={`mailto:${ref.email}`} className="ref-email">{ref.email}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="content-section" id="contact">
        <h2 className="section-title">Contact</h2>
        <div className="section-content">
          <p className="contact-text">Feel free to reach out for collaborations, research discussions, or just to connect.</p>
          <div className="contact-info">
            <a href={`mailto:${portfolioData.personal.email}`} className="contact-link">
              <Mail size={20} />
              {portfolioData.personal.email}
            </a>
            <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="contact-link">
              <Github size={20} />
              {portfolioData.personal.github.replace('https://github.com/', '')}
            </a>
            <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
              <Linkedin size={20} />
              {portfolioData.personal.linkedin.replace('https://www.linkedin.com/in/', '').replace(/\/$/, '')}
            </a>
            <a href={portfolioData.personal.scholar} target="_blank" rel="noopener noreferrer" className="contact-link">
              <GraduationCap size={20} />
              Google Scholar
            </a>
            <a href={portfolioData.personal.x} target="_blank" rel="noopener noreferrer" className="contact-link">
              <Twitter size={20} />
              {portfolioData.personal.x.replace('https://x.com/', '@')}
            </a>
          </div>
        </div>
      </section>

      {/* Visitor Map Section */}
      <section className="content-section visitor-map-section" id="visitor-map">
        <h2 className="section-title">Visitor Map</h2>
        <div className="section-content">
          <div className="visitor-map-frame visitor-map-globe-frame">
            <div id="visitor-map-globe-host" className="visitor-map-globe-host" aria-label="Live visitor globe"></div>
            <p className="visitor-map-caption">Powered by MapMyVisitors.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
