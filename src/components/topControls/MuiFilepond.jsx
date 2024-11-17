import { styled, useColorScheme } from "@mui/material/styles";
import { FilePond } from "react-filepond";
import iconRemove from "../../assets/remove.svg?raw";
import { useEffect } from "react";

const StyledFilePond = styled(FilePond, {
    name: "MuiFilepond",
    slot: "root",
})(({ theme }) => ({
    width: "600px",
    height: "240px",
    fontFamily: theme.typography.fontFamily,

    // TODO: what do we do with transition animation?
    // transition: `${theme.transitions.create(["width", "height"], {
    //     duration: theme.transitions.duration.standard,
    //     easing: theme.transitions.easing.easeInOut,
    //     delay: "300ms",
    // })}`,
    "&.hasFile": {
        width: "278px",
        height: "100px",
    },
    ".filepond--panel-root": {
        borderRadius: "24px",
        backgroundColor: "transparent",
        border: "8px dashed var(--palette-primary-main)",
        backgroundImage:
            "radial-gradient(var(--palette-base-dark) 3px, transparent 3px), radial-gradient(var(--palette-base-dark) 3px, transparent 3px)",
        backgroundSize: "20px 20px",
        backgroundPosition: " 0 0, 10px 10px",
    },
    // TODO: transition here as well?
    "&.hasFile .filepond--panel-root": {
        borderWidth: "4px",
    },
    ".filepond--drop-label": {
        color: "var(--palette-primary-main)",
        height: "100%",
    },
    ".filepond--drop-label label": {
        fontSize: "20px",
        fontWeight: theme.typography.fontWeightMedium,
    },
    ".filepond--label-action": {
        fontWeight: theme.typography.fontWeightBold,
        textDecoration: "underline",
        cursor: "pointer",
    },
    ".filepond--item-panel": {
        borderRadius: "14px",
        overflow: "hidden",
        backgroundColor: "var(--palette-base-dark)",
    },
    ".filepond--item": {
        borderRadius: "14px",
        width: "240px",
        height: "64px",
        top: "2px",
        justifySelf: "center",
        backgroundColor: "var(--palette-base-dark)",
    },
    ".filepond--file": {
        alignItems: "center",
        color: "var(--palette-primary-main)",
    },
    ".filepond--drip-blob": {
        backgroundColor: "var(--palette-secondary-main)",
    },
    "[data-filepond-item-state*='error'] .filepond--item-panel": {
        backgroundColor: "var(--palette-warning-light)",
    },
    "[data-filepond-item-state*='invalid'] .filepond--item-panel": {
        backgroundColor: "var(--palette-warning-light)",
    },
    "[data-filepond-item-state='processing-complete'] .filepond--item-panel": {
        backgroundColor: "var(--palette-success-main)",
    },
    ".filepond--file-action-button": {
        width: "30px",
        height: "30px",
        cursor: "pointer",
        color: "var(--palette-primary-main)",
        backgroundColor: "var(--palette-base-main)",
        borderRadius: "8px",
        border: "2px solid var(--palette-secondary-main)",
        boxShadow: "2px 2px var(--palette-secondary-main)",
        transitionDuration: "100ms",
        transitionProperty: "background-color, box-shadow, border-color, color, transform",
        transform: "none !important",
        "&:hover": {
            backgroundColor: "var(--palette-action-hover)",
        },
        "&:active": {
            boxShadow: "0 0 var(--palette-secondary-main)",
            transform: "translateY(2px) !important",
        },
    },
}));

export default function MuiFilepond(props) {
    const { mode } = useColorScheme(); // this forces Filepond re-render to change colors

    //TODO: what to do with animations??

    useEffect(() => {
        const filepondRoot = document.getElementsByClassName("filepond--root")[0];
        if (filepondRoot) {
            if (props.className === "hasFile") {
                filepondRoot.classList.add("hasFile");
            } else {
                filepondRoot.classList.remove("hasFile");
            }
        }
    }, [props.className]);

    return <StyledFilePond key={mode} iconRemove={iconRemove} {...props} />;
}
