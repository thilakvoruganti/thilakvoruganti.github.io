import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EXTERNAL_LINKS } from "../constants";
import { trackEvent } from "../lib/firebaseAnalytics";
import GITHUB_ICON from "../images/footer/socials/Github.svg";
import LINKEDIN_ICON from "../images/footer/socials/Linkedin.svg";
import GMAIL_ICON from "../images/footer/socials/Gmail.svg";
import LEETCODE_ICON from "../images/footer/socials/leetcode.svg";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const {
    resume: RESUME_URL,
    linkedin: LINKEDIN_URL,
    github: GITHUB_URL,
    email: EMAIL_URL,
    leetcode: LEETCODE_URL,
  } = EXTERNAL_LINKS;

  const toggle = () => setOpen((v) => !v);
  const close = useCallback(() => setOpen(false), []);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollToSection = useCallback(
    (id) => {
      const runScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      };

      close();
      if (location.pathname !== "/") {
        navigate("/");
        let tries = 0;
        const tick = () => {
          tries += 1;
          if (runScroll() || tries > 25) return;
          window.setTimeout(tick, 40);
        };
        window.setTimeout(tick, 40);
      } else {
        runScroll();
      }
    },
    [close, location.pathname, navigate]
  );

  const sectionItems = useMemo(
    () => [
      { label: "Home", id: "landing" },
      { label: "About", id: "about" },
      { label: "Experience", id: "experience" },
      { label: "Skills", id: "skills" },
      { label: "Projects", id: "projects" },
      { label: "Design", id: "design" },
    ],
    []
  );

  const desktopSections = useMemo(
    () => [
      { label: "About", id: "about" },
      { label: "Experience", id: "experience" },
      { label: "Skills", id: "skills" },
      { label: "Projects", id: "projects" },
      { label: "Design", id: "design" },
    ],
    []
  );

  const items = useMemo(
    () => [
      {
        label: "Resume",
        onClick: () => {
          trackEvent("nav_resume_click", { label: "Resume" });
          close();
          window.open(RESUME_URL, "_blank", "noreferrer");
        },
      },
      {
        label: "LinkedIn",
        onClick: () => {
          trackEvent("nav_linkedin_click", { label: "LinkedIn" });
          close();
          window.open(LINKEDIN_URL, "_blank", "noreferrer");
        },
      },
      {
        label: "LeetCode",
        onClick: () => {
          trackEvent("nav_leetcode_click", { label: "LeetCode" });
          close();
          window.open(LEETCODE_URL, "_blank", "noreferrer");
        },
      },
      {
        label: "Gmail",
        onClick: () => {
          trackEvent("nav_gmail_click", { label: "Gmail" });
          close();
          window.location.href = EMAIL_URL;
        },
      },
    ],
    [close, EMAIL_URL, LEETCODE_URL, LINKEDIN_URL, RESUME_URL]
  );

  const navInnerStyle = {
    width: "min(1540px, calc(100vw - 48px))",
    marginInline: "auto",
  };

  return (
    <>
      <div
        className="fig-1rs6q0e"
        style={{
          "--text-color": "#000000",
          "--bg-color": "#FFFFFF",
          "--f-text-color": "#000000",
          "--f-bg-color": "#FFFFFF",
        }}
      >
      <header className="fig-1jciw8t">
        <div
          className="hidden h-[81px] items-center justify-between min-[960px]:flex"
          style={navInnerStyle}
        >
          <div className="flex items-center gap-10">
            <button
              className="shrink-0"
              aria-label="Go home"
              onClick={() => {
                trackEvent("nav_home_click", { label: "Home" });
                navigate("/");
                scrollTop();
                close();
              }}
            >
              <svg className="h-[30px] w-auto" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0.000366211L0 7.50037L7.63483 0.000366211L0 0.000366211Z" fill="#000" />
                <rect x="7.63477" width="11.4522" height="30" fill="#000" />
                <path d="M49.6266 0H34.3569L41.9918 15L49.6266 0Z" fill="#000" />
                <path d="M33.3472 0H19.0869L34.0978 30L41.2279 15.75L33.3472 0Z" fill="#000" />
              </svg>
            </button>

            <nav className="flex items-center gap-8">
              {desktopSections.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    trackEvent("nav_section_click", { section: item.id });
                    scrollToSection(item.id);
                  }}
                  className="text-[clamp(18px,1.3vw,30px)] font-medium tracking-tight text-black transition-opacity hover:opacity-70"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-8">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              onClick={() => trackEvent("nav_github_click", { label: "GitHub" })}
            >
              <img src={GITHUB_ICON} alt="GitHub" className="h-8 w-8" />
            </a>
            <a
              href={LEETCODE_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="LeetCode"
              onClick={() => trackEvent("nav_leetcode_click", { label: "LeetCode" })}
            >
              <img src={LEETCODE_ICON} alt="LeetCode" className="h-8 w-8" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              onClick={() => trackEvent("nav_linkedin_click", { label: "LinkedIn" })}
            >
              <img src={LINKEDIN_ICON} alt="LinkedIn" className="h-8 w-8" />
            </a>
            <a
              href={EMAIL_URL}
              aria-label="Gmail"
              onClick={() => trackEvent("nav_gmail_click", { label: "Gmail" })}
            >
              <img src={GMAIL_ICON} alt="Gmail" className="h-8 w-8" />
            </a>
            <button
              onClick={() => {
                trackEvent("nav_resume_click", { label: "Resume" });
                window.open(RESUME_URL, "_blank", "noreferrer");
              }}
              className="rounded-[8px] bg-black px-8 py-3 text-[clamp(16px,1vw,24px)] font-medium text-white transition hover:bg-[#1f1f1f]"
            >
              Resume
            </button>
          </div>
        </div>

        <div
          className="flex h-[81px] items-center justify-between min-[960px]:hidden"
          style={navInnerStyle}
        >
          <button
            className="shrink-0"
            aria-label="Go home"
            onClick={() => {
              trackEvent("nav_home_click", { label: "Home" });
              navigate("/");
              scrollTop();
              close();
            }}
          >
            <svg className="h-[30px] w-auto" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0.000366211L0 7.50037L7.63483 0.000366211L0 0.000366211Z" fill="#000" />
              <rect x="7.63477" width="11.4522" height="30" fill="#000" />
              <path d="M49.6266 0H34.3569L41.9918 15L49.6266 0Z" fill="#000" />
              <path d="M33.3472 0H19.0869L34.0978 30L41.2279 15.75L33.3472 0Z" fill="#000" />
            </svg>
          </button>

          <div className="relative flex items-center">
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={toggle}
              className="relative flex h-8 w-8 items-center justify-center"
            >
              <span
                className={`absolute left-1/2 h-0.5 w-6 -translate-x-1/2 transition-transform duration-300 ${
                  open ? "translate-y-0 rotate-45" : "-translate-y-1.5"
                } bg-neutral-900`}
              />
              <span
                className={`absolute left-1/2 h-0.5 w-6 -translate-x-1/2 transition-transform duration-300 ${
                  open ? "translate-y-0 -rotate-45" : "translate-y-1.5"
                } bg-neutral-900`}
              />
            </button>
          </div>
        </div>
      </header>
      </div>

      <div
        className={`fixed inset-x-0 top-[81px] bottom-0 z-40 bg-white transition-transform duration-300 ease-out min-[960px]:hidden ${
          open ? "translate-y-0" : "-translate-y-full pointer-events-none"
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-[120rem] flex-col px-6 pt-10 pb-10">
          <div className="flex flex-1 flex-col items-start justify-start gap-5">
            {sectionItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  trackEvent("nav_section_click", { section: item.id });
                  scrollToSection(item.id);
                }}
                className="text-left text-4xl font-semibold tracking-tight text-neutral-900 transition hover:opacity-70"
                style={{ transitionDelay: `${open ? idx * 50 : 0}ms` }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-auto flex flex-col items-start gap-4 border-t border-black/10 pt-8">
            {items.map((item, idx) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className="text-left text-lg font-medium tracking-tight text-neutral-900 transition hover:opacity-70"
                style={{ transitionDelay: `${open ? (sectionItems.length + idx) * 40 : 0}ms` }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
