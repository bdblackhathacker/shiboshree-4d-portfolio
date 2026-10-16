const SUMMARY =
  'Full-Stack Software Engineer experienced in building scalable, production-grade web applications using Ruby on Rails, PostgreSQL, Hotwire, Turbo, Stimulus.js, React, TypeScript, and ASP.NET. Expert in RESTful API design, authentication/authorization, database architecture, performance optimization, and Agile/Git-based workflows.'

type Role = {
  role: string
  company: string
  period: string
  location: string
  bullets: string[]
}

const ROLES: Role[] = [
  {
    role: 'Senior Software Engineer',
    company: 'Multinational Force & Outsourcing Service Ltd. (MFOSL)',
    period: 'Mar 2026 – Jun 2026',
    location: 'Dhaka, Bangladesh',
    bullets: [
      'Built full-stack enterprise applications with Ruby on Rails, PostgreSQL, Hotwire, Turbo, Stimulus.js, and Tailwind CSS.',
      'Implemented RESTful APIs, authentication/authorization, PostgreSQL query optimization, and Render deployments.'
    ]
  },
  {
    role: 'Full-Stack Developer',
    company: 'Orgatro IT',
    period: 'Sep 2024 – Dec 2025',
    location: 'Dhaka, Bangladesh',
    bullets: [
      'Built scalable platforms using Rails, React, TypeScript, Hotwire, and PostgreSQL.',
      'Engineered digital wallets, payment integrations, task management systems, and admin dashboards.'
    ]
  },
  {
    role: 'Junior Software Engineer',
    company: 'Weinspect',
    period: 'Aug 2023 – Jan 2024',
    location: 'Remote',
    bullets: [
      'Developed enterprise applications using ASP.NET, AngularJS, PostgreSQL, and SCSS.',
      'Built responsive HR dashboards and interactive drag-and-drop components.'
    ]
  }
]

const SKILL_GROUPS: [string, string][] = [
  ['Languages', 'Ruby, JavaScript, TypeScript, Python, PHP, C, C++, Java, Go, Rust'],
  ['Backend & Architecture', 'Ruby on Rails, ASP.NET, RESTful APIs, MVC, Active Record, Devise, JWT, Microservices, GraphQL'],
  ['Frontend', 'Hotwire, Turbo, Stimulus.js, React, AngularJS, Tailwind CSS, Bootstrap, HAML, SCSS'],
  ['Databases & DevOps', 'PostgreSQL, MySQL, SQLite, Redis, Sidekiq, Docker, Kubernetes, AWS, Render, Git, SonarQube']
]

const EDU = 'Diploma in Computer Science & Engineering (CSE) — Aptouch Polytechnic Institute, GPA 3.73/4.00'
const CERTS = 'Expert Ruby on Rails; Ruby of Rails Building Projects; Python Programming'

const CONTACT = {
  name: 'Shiboshree Roy',
  title: 'Full-Stack Software Engineer | Ruby on Rails Developer',
  email: 'shiboshreeroycse@gmail.com',
  phone: '+880 1570252680',
  location: 'Dhaka, Bangladesh',
  github: 'github.com/ShiboshreeRoy',
  linkedin: 'linkedin.com/in/shiboshree-roy',
  site: 'shiboshreeroy.vercel.app'
}

function plainTextResume(): string {
  return `${CONTACT.name.toUpperCase()}
${CONTACT.title}
${CONTACT.location} | ${CONTACT.email} | ${CONTACT.phone}
GitHub: ${CONTACT.github} | LinkedIn: ${CONTACT.linkedin} | ${CONTACT.site}

SUMMARY
${SUMMARY}

EXPERIENCE
${ROLES.map(
  (r) => `${r.role} — ${r.company} | ${r.period} | ${r.location}
${r.bullets.map((b) => `- ${b}`).join('\n')}`
).join('\n\n')}

SKILLS
${SKILL_GROUPS.map(([g, s]) => `${g}: ${s}`).join('\n')}

EDUCATION
${EDU}
Certifications: ${CERTS}
`
}

export function downloadATSResume() {
  const blob = new Blob([plainTextResume()], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'Shiboshree_Roy_ATS_Resume.txt'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

function resumeHTML(): string {
  const roleBlocks = ROLES.map(
    (r) => `
      <section class="role">
        <div class="role-head">
          <h3>${r.role}</h3>
          <span class="period">${r.period}</span>
        </div>
        <p class="company">${r.company} · ${r.location}</p>
        <ul>${r.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
      </section>`
  ).join('')

  const skillBlocks = SKILL_GROUPS.map(
    ([g, s]) => `<p class="skill"><strong>${g}:</strong> ${s}</p>`
  ).join('')

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${CONTACT.name} — Resume</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, Helvetica, sans-serif; color: #111; background: #fff; line-height: 1.5; }
  .page { max-width: 820px; margin: 0 auto; padding: 40px 44px; }
  header { border-bottom: 3px solid #CC0000; padding-bottom: 14px; }
  h1 { font-size: 30px; letter-spacing: 1px; }
  .title { color: #CC0000; font-weight: 600; margin-top: 2px; }
  .meta { font-size: 12.5px; color: #333; margin-top: 6px; }
  .meta a { color: #0b5cad; text-decoration: none; }
  h2 { font-size: 13px; letter-spacing: 2px; color: #CC0000; margin: 22px 0 8px; text-transform: uppercase; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
  .summary { font-size: 13px; color: #222; }
  .role { margin-bottom: 14px; }
  .role-head { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
  .role-head h3 { font-size: 14.5px; }
  .period { font-size: 12px; color: #555; white-space: nowrap; }
  .company { font-size: 12.5px; color: #444; font-style: italic; margin-bottom: 4px; }
  ul { padding-left: 18px; }
  li { font-size: 12.5px; color: #222; margin-bottom: 3px; }
  .skill { font-size: 12.5px; margin-bottom: 4px; }
  .edu { font-size: 12.5px; }
  .print-hint { text-align: center; font-size: 12px; color: #888; padding: 10px; }
  @media print {
    .page { padding: 24px 30px; }
    .print-hint { display: none; }
    @page { margin: 12mm; }
  }
</style>
</head>
<body>
  <div class="page">
    <header>
      <h1>${CONTACT.name.toUpperCase()}</h1>
      <p class="title">${CONTACT.title}</p>
      <p class="meta">
        ${CONTACT.location} · <a href="mailto:${CONTACT.email}">${CONTACT.email}</a> · ${CONTACT.phone}<br/>
        <a href="https://${CONTACT.github}">${CONTACT.github}</a> · <a href="https://${CONTACT.linkedin}">${CONTACT.linkedin}</a> · <a href="https://${CONTACT.site}">${CONTACT.site}</a>
      </p>
    </header>
    <h2>Summary</h2>
    <p class="summary">${SUMMARY}</p>
    <h2>Experience</h2>
    ${roleBlocks}
    <h2>Skills</h2>
    ${skillBlocks}
    <h2>Education</h2>
    <p class="edu">${EDU}</p>
    <h2>Certifications</h2>
    <p class="edu">${CERTS}</p>
    <p class="print-hint">Press Ctrl/Cmd + P → “Save as PDF” for a pixel-perfect ATS file.</p>
  </div>
  <script>window.addEventListener('load', function () { setTimeout(function () { window.print() }, 250) })</script>
</body>
</html>`
}

export function printResume() {
  const w = window.open('', '_blank', 'width=920,height=1080')
  if (w && w.document) {
    w.document.open()
    w.document.write(resumeHTML())
    w.document.close()
    return
  }
  const blob = new Blob([resumeHTML()], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'Shiboshree_Roy_Resume.html'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}
