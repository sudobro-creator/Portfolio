import {
  ArrowUpRight,
  Linkedin,
  Mail,
} from "lucide-react";

export default function SidebarFooter() {
  return (
    <footer className="profile-footer">

      {/* EMAIL */}

      <div className="contact-row">

        <div className="contact-label">

          <Mail
            size={21}
            strokeWidth={1.7}
          />

          <span>
            Email
          </span>

        </div>

        <a href="mailto:gizkidesigns@gmail.com">

          <span>
            gizkidesigns@gmail.com
          </span>

          <ArrowUpRight
            size={18}
            strokeWidth={1.7}
          />

        </a>

      </div>


      {/* LINKEDIN */}

      <div className="contact-row">

        <div className="contact-label">

          <Linkedin
            size={21}
            strokeWidth={1.7}
          />

          <span>
            Linkedin
          </span>

        </div>

        <a
          href="https://www.linkedin.com/in/Samuel-Nwankwoala"
          target="_blank"
          rel="noreferrer"
        >

          <span>
            /in/Samuel Nwankwoala
          </span>

          <ArrowUpRight
            size={18}
            strokeWidth={1.7}
          />

        </a>

      </div>


      {/* X */}

      <div className="contact-row">

        <div className="contact-label">

          <span className="x-logo">
            𝕏
          </span>

          <span>
            X.com
          </span>

        </div>

        <a
          href="https://x.com/gizkidesigns"
          target="_blank"
          rel="noreferrer"
        >

          <span>
            gizkidesigns
          </span>

          <ArrowUpRight
            size={18}
            strokeWidth={1.7}
          />

        </a>

      </div>


      {/* COPYRIGHT */}

      <div className="copyright">

        <span>
          Gizkidesigns
        </span>

        <span>
          © 2026 All rights reserved.
        </span>

      </div>

    </footer>
  );
}