const CONTACT_EMAIL = "thilakvoruganti@gmail.com";
const CONTACT_EMAIL_MAILTO = `mailto:${CONTACT_EMAIL}`;

export const EXTERNAL_LINKS = Object.freeze({
  site: "https://thilakvoruganti.me",
  resume: "https://drive.google.com/file/d/14rIFd_nmR8ka2wxoVfjtY1i1wiVu220n/view?usp=sharing",
  linkedin: "https://www.linkedin.com/in/thilakvoruganti/",
  github: "https://github.com/thilakvoruganti",
  leetcode: "https://leetcode.com/u/thilakvoruganti/",
  email: CONTACT_EMAIL_MAILTO,
  emailAddress: CONTACT_EMAIL,
});

export const SOCIAL_LINKS = Object.freeze({
  github: EXTERNAL_LINKS.github,
  linkedin: EXTERNAL_LINKS.linkedin,
  leetcode: EXTERNAL_LINKS.leetcode,
  email: EXTERNAL_LINKS.email,
});

export const CONTACT = Object.freeze({
  email: CONTACT_EMAIL,
  mailto: CONTACT_EMAIL_MAILTO,
});
