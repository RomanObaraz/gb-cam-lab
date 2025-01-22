import { BugReport, Coffee, GitHub } from "@mui/icons-material";
import { Link } from "@mui/material";

export default function Footer() {
    const footerLineClassName = "flex flex-wrap max-sm:flex-col justify-center gap-2";
    const linkGroupClassName = "flex flex-wrap gap-2 justify-center";
    const linkClassName = "flex items-center gap-1 whitespace-nowrap";

    return (
        <div className="flex flex-col gap-4 mt-16 px-4 max-lg:pb-20 font-medium">
            <div className={footerLineClassName}>
                <span>Enjoying the tool?</span>
                <div className={linkGroupClassName}>
                    <Link
                        className={linkClassName}
                        href="https://github.com/RomanObaraz/gb-cam-lab"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View the project's source code on GitHub"
                    >
                        View on GitHub <GitHub color="secondary" />
                    </Link>
                    <span>|</span>
                    <Link
                        className={linkClassName}
                        href="https://ko-fi.com/romanobaraz"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Support this project by buying me a coffee"
                    >
                        Buy me a coffee <Coffee color="secondary" />
                    </Link>
                </div>
            </div>
            <div className={footerLineClassName}>
                <span className="whitespace-nowrap">Found an issue?</span>
                <div className={linkGroupClassName}>
                    <Link
                        className={linkClassName}
                        href="https://github.com/RomanObaraz/gb-cam-lab/issues/new"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Report an issue on GitHub"
                    >
                        Report it on GitHub <BugReport color="secondary" />
                    </Link>
                    <span>|</span>
                    <Link
                        className={linkClassName}
                        href="mailto: gbcamlab@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Email support for the project"
                    >
                        Email at <b>gbcamlab@gmail.com</b> <BugReport color="secondary" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
