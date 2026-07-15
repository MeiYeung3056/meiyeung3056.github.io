const content = window.siteContent;
const year = document.querySelector("#year");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");

const setText = (selector, value) => {
  const element = document.querySelector(selector);

  if (element && value) {
    element.textContent = value;
  }
};

const setLink = (selector, href) => {
  const element = document.querySelector(selector);

  if (element && href) {
    element.setAttribute("href", href);
      if (href.startsWith("http")) {
        element.setAttribute("target", "_blank");
        element.setAttribute("rel", "noreferrer");
      }
  }
};

const createParagraph = (text) => {
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  return paragraph;
};

const renderProfile = () => {
  if (!content?.profile) {
    return;
  }

  const { profile } = content;
  const title = `${profile.name} | Personal Website`;
  document.title = title;

  const description = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');

  if (description) {
    description.setAttribute("content", `Personal website for ${profile.name}.`);
  }

  if (ogTitle) {
    ogTitle.setAttribute("content", title);
  }

  if (ogDescription && profile.summary) {
    ogDescription.setAttribute("content", profile.summary);
  }

  setText(".logo", profile.name);
  setText(".hero .eyebrow", profile.label);
  setText(".english-name", profile.name);
  setText(".chinese-name", profile.chineseName);
  setText(".name-pronunciation", profile.pronunciation);
  setText(".hero-subtitle", profile.title);
  setText(".hero-text", profile.summary);
  setText(".profile-card h2", profile.cardTitle);
  setText(".profile-card p", profile.cardText);
  setLink('[data-profile-link="resume"]', profile.resumeUrl);
  setLink('[data-profile-link="googleScholar"]', content.contact?.googleScholar);
  setLink('[data-profile-link="linkedin"]', content.contact?.linkedin);

  const footer = document.querySelector(".site-footer p");
  if (footer) {
    footer.textContent = `Copyright ${new Date().getFullYear()} ${profile.name}. All rights reserved.`;
  }

  const resumeContactLink = document.querySelector('.contact-links a[data-contact="resume"]');
  if (resumeContactLink && profile.resumeUrl) {
    resumeContactLink.setAttribute("href", profile.resumeUrl);
  }

  const photo = document.querySelector(".profile-photo-placeholder");
  if (photo) {
    photo.textContent = profile.photoPlaceholder || profile.initials || "";

    if (profile.profileImage) {
      photo.innerHTML = "";
      const image = document.createElement("img");
      image.src = profile.profileImage;
      image.alt = `${profile.name} profile photo`;
      photo.append(image);
      photo.classList.add("has-image");
    }
  }
};

const renderAbout = () => {
  const aboutCard = document.querySelector("#about .content-card");

  if (!aboutCard || !Array.isArray(content?.about)) {
    return;
  }

  aboutCard.innerHTML = "";
  content.about.forEach((paragraph) => {
    aboutCard.append(createParagraph(paragraph));
  });
};

const renderNews = () => {
  const newsList = document.querySelector(".news-list");

  if (!newsList || !Array.isArray(content?.news)) {
    return;
  }

  newsList.innerHTML = "";
  content.news.forEach((item) => {
    const article = document.createElement("article");
    article.className = "news-item";

    const date = document.createElement("p");
    const text = document.createElement("p");
    date.className = "news-date";
    date.textContent = item.date;
    text.textContent = item.text;

    article.append(date, text);
    newsList.append(article);
  });
};

const renderEducation = () => {
  const timeline = document.querySelector("#education .timeline");

  if (!timeline || !Array.isArray(content?.education)) {
    return;
  }

  timeline.innerHTML = "";
  content.education.forEach((item) => {
    const article = document.createElement("article");
    article.className = "timeline-item";

    const logoWrap = document.createElement("div");
    logoWrap.className = "education-logo";

    if (item.logo) {
      const logo = document.createElement("img");
      logo.src = item.logo;
      logo.alt = `${item.school} logo`;
      logo.loading = "lazy";
      logoWrap.append(logo);
    }

    const headingGroup = document.createElement("div");
    const school = document.createElement("h3");
    const meta = document.createElement("p");
    const details = document.createElement("p");

    school.textContent = item.school;
    meta.className = "meta";
    meta.textContent = [item.degree, item.dates].filter(Boolean).join(" - ");
    details.textContent = item.details;

    headingGroup.append(school, meta);
    article.append(logoWrap, headingGroup, details);
    timeline.append(article);
  });
};

const renderProjects = () => {
  const grid = document.querySelector("#research .grid");

  if (!grid || !Array.isArray(content?.projects)) {
    return;
  }

  grid.innerHTML = "";
  content.projects.forEach((item) => {
    const article = document.createElement("article");
    article.className = "project-card";

    const title = document.createElement("h3");
    const description = document.createElement("p");
    const tags = document.createElement("p");
    const link = document.createElement("a");

    title.textContent = item.title;
    description.textContent = item.description;
    tags.className = "tags";
    tags.textContent = Array.isArray(item.tags) ? item.tags.join(" / ") : "";
    if (item.link && item.link !== "#") {
      link.href = item.link;
      link.textContent = "View project";
      link.setAttribute("aria-label", `View ${item.title}`);
    }

    article.append(title, description, tags);
    if (item.link && item.link !== "#") {
      article.append(link);
    }
    grid.append(article);
  });
};

const renderPublications = () => {
  const publicationList = document.querySelector(".publication-list");

  if (!publicationList || !Array.isArray(content?.publications)) {
    return;
  }

  publicationList.innerHTML = "";
  content.publications.forEach((item) => {
    const article = document.createElement("article");
    article.className = "publication-card";

    const title = document.createElement("h3");
    const authors = document.createElement("p");
    const venue = document.createElement("p");

    title.textContent = item.title;
    authors.className = "publication-authors";
    authors.textContent = item.authors;
    venue.className = "meta";
    venue.textContent = item.venue;

    article.append(authors, title, venue);
    publicationList.append(article);
  });
};

const renderAwards = () => {
  const awardList = document.querySelector(".award-list");

  if (!awardList || !Array.isArray(content?.awards)) {
    return;
  }

  awardList.innerHTML = "";
  content.awards.forEach((item) => {
    const article = document.createElement("article");
    article.className = "award-card";

    const title = document.createElement("h3");
    const meta = document.createElement("p");

    title.textContent = item.title;
    meta.className = "meta";
    meta.textContent = item.detail;

    article.append(title, meta);
    awardList.append(article);
  });
};

const renderSkills = () => {
  const skillsList = document.querySelector(".skills-list");

  if (!skillsList || !Array.isArray(content?.skills)) {
    return;
  }

  skillsList.innerHTML = "";
  content.skills.forEach((skill) => {
    const item = document.createElement("span");
    item.textContent = skill;
    skillsList.append(item);
  });
};

const renderBeyondLab = () => {
  const list = document.querySelector(".beyond-lab-list");

  if (!list || !Array.isArray(content?.beyondLab) || content.beyondLab.length === 0) {
    return;
  }

  list.innerHTML = "";
  content.beyondLab.forEach((item) => {
    const article = document.createElement("article");
    article.className = "content-card beyond-lab-card";

    const title = document.createElement("h3");
    const meta = document.createElement("p");
    const details = document.createElement("p");

    title.textContent = item.title;
    meta.className = "meta";
    meta.textContent = item.meta || "";
    details.textContent = item.details;

    article.append(title);
    if (item.meta) {
      article.append(meta);
    }
    article.append(details);
    list.append(article);
  });
};

const renderContact = () => {
  if (!content?.contact) {
    return;
  }

  setText("#contact .content-card > p", content.contact.message);

  const contactLinks = document.querySelector(".contact-links");
  if (!contactLinks) {
    return;
  }

  contactLinks.innerHTML = "";

  const links = [
    {
      label: "Email",
      href: content.contact.email ? `mailto:${content.contact.email}` : ""
    },
    {
      label: "GitHub",
      href: content.contact.github
    },
    {
      label: "Google Scholar",
      href: content.contact.googleScholar
    },
    {
      label: "LinkedIn",
      href: content.contact.linkedin
    },
    {
      label: "Resume",
      href: content.profile?.resumeUrl
    },
    ...(Array.isArray(content.contact.extraLinks) ? content.contact.extraLinks : [])
  ];

  links
    .filter((link) => link.href)
    .forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.textContent = link.label;
      if (link.href.startsWith("http")) {
        anchor.target = "_blank";
        anchor.rel = "noreferrer";
      }
      contactLinks.append(anchor);
    });
};

const organizeAboutSections = () => {
  const contactSection = document.querySelector("#contact");
  const beyondLabSection = document.querySelector("#beyond-lab");

  if (contactSection && beyondLabSection) {
    contactSection.before(beyondLabSection);
  }
};

const renderContent = () => {
  renderProfile();
  renderAbout();
  renderNews();
  renderEducation();
  renderProjects();
  renderPublications();
  renderAwards();
  renderBeyondLab();
  renderSkills();
  renderContact();
};

if (year) {
  year.textContent = new Date().getFullYear();
}

organizeAboutSections();
renderContent();

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}
