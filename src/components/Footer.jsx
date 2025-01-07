import { BugReport, Coffee, GitHub } from "@mui/icons-material";
import { Link } from "@mui/material";

export default function Footer() {
    const footerLineClassName = "flex justify-center gap-2";
    const linkClassName = "flex items-center gap-1";

    return (
        <div className="flex flex-col gap-2 absolute bottom-8 left-0 right-0 mx-auto w-fit font-medium">
            <div className={footerLineClassName}>
                Enjoying the tool?
                <Link
                    className={linkClassName}
                    href="https://github.com/RomanObaraz/gb-cam-lab"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View the project's source code on GitHub"
                >
                    View on GitHub <GitHub color="secondary" />
                </Link>
                |
                <Link
                    className={linkClassName}
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Support this project by buying me a coffee"
                >
                    Buy me a coffee <Coffee color="secondary" />
                </Link>
            </div>
            <div className={footerLineClassName}>
                Found an issue?
                <Link
                    className={linkClassName}
                    href="https://github.com/RomanObaraz/gb-cam-lab/issues/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View the project's source code on GitHub"
                >
                    Report it on GitHub <BugReport color="secondary" />
                </Link>
                |
                <Link
                    className={linkClassName}
                    href="mailto: gbcl-support@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Support this project by buying me a coffee"
                >
                    Email us at <b>gbcl-support@gmail.com</b>
                    <BugReport color="secondary" />
                </Link>
            </div>
        </div>
    );
}
