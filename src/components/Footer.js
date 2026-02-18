import GITHUB_ICON from '../images/footer/socials/Github.svg';
import LINKEDIN_ICON from '../images/footer/socials/Linkedin.svg';
import GMAIL_ICON from '../images/footer/socials/Gmail.svg';
import LEETCODE_ICON from '../images/footer/socials/leetcode.svg';
import { EXTERNAL_LINKS } from '../constants';
import { trackEvent } from '../lib/firebaseAnalytics';

const icons = [
  {
    label: 'GitHub',
    href: EXTERNAL_LINKS.github,
    src: GITHUB_ICON,
  },
  {
    label: 'LeetCode',
    href: EXTERNAL_LINKS.leetcode,
    src: LEETCODE_ICON,
  },
  {
    label: 'LinkedIn',
    href: EXTERNAL_LINKS.linkedin,
    src: LINKEDIN_ICON,
  },
  {
    label: 'Email',
    href: EXTERNAL_LINKS.email,
    src: GMAIL_ICON,
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-black text-white pt-16 pb-0 border-t border-white/15">
      <div className='f-container'>
        <div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-4 md:px-0">
          <h2 className="text-[32px] leading-[40px] font-bold md:text-[40px] md:leading-[48px]">
            Thilak Goud Voruganti
          </h2>

          <div className="flex items-center gap-3">
            {icons.map((icon) => (
              <a
                key={icon.label}
                href={icon.href}
                aria-label={icon.label}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  const label = icon.label.toLowerCase();
                  const name =
                    label === "github"
                      ? "social_github_click"
                      : label === "leetcode"
                      ? "social_leetcode_click"
                      : label === "linkedin"
                      ? "social_linkedin_click"
                      : "social_email_click";
                  trackEvent(name, {
                    label: icon.label,
                    target: icon.href,
                  });
                }}
              className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#2B2B2B] text-white"
              >
                <img
                  src={icon.src}
                  alt={icon.label}
                  className="h-[25px] w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ))}
          </div>

        <p className="w-full pt-10 mt-10 mb-5 text-center text-[16px] leading-[22px] text-white/80">
          © Copyright 2026 Design and Developed by{" "}
          <a
            href={EXTERNAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            Thilak Goud Voruganti
          </a>
        </p>
        </div>
      </div>
    </footer>
  );
}
