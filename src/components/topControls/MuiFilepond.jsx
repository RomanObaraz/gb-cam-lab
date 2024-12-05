import { styled } from "@mui/material/styles";
import { FilePond } from "react-filepond";
import RemoveIcon from "../../assets/remove.svg?raw";
import { useEffect } from "react";

const StyledFilePond = styled(FilePond, {
    name: "MuiFilepond",
    slot: "root",
})(({ theme }) => ({
    width: 600,
    height: 240,
    fontFamily: theme.typography.fontFamily,

    transition: `${theme.transitions.create(["width", "height"], {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeInOut,
    })}`,
    [theme.breakpoints.down("sm")]: {
        width: 340,
        height: 140,
    },
    "&.hasFile": {
        width: 278,
        height: 100,
        [theme.breakpoints.down("sm")]: {
            width: 250,
            height: 90,
        },
    },
    ".filepond--panel-root": {
        borderRadius: 24,
        backgroundColor: "transparent",
        border: "8px dashed var(--palette-text-primary)",
        backgroundImage:
            "radial-gradient(var(--palette-base-dark) 3px, transparent 3px), radial-gradient(var(--palette-base-dark) 3px, transparent 3px)",
        backgroundSize: "20px 20px",
        backgroundPosition: " 0 0, 10px 10px",
    },
    "&.hasFile .filepond--panel-root": {
        borderWidth: 4,
        borderRadius: 20,
        borderColor: "var(--palette-primary-main)",
    },
    ".filepond--drop-label": {
        color: "var(--palette-text-primary)",
        height: "100%",
    },
    ".filepond--drop-label label": {
        fontSize: 20,
        fontWeight: theme.typography.fontWeightMedium,
        [theme.breakpoints.down("sm")]: {
            fontSize: 16,
        },
    },
    ".filepond--label-action": {
        color: "var(--palette-secondary-main)",
        fontWeight: theme.typography.fontWeightBold,
        textDecoration: "underline",
        cursor: "pointer",
    },
    ".filepond--item-panel": {
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: "var(--palette-base-dark)",
    },
    ".filepond--item": {
        borderRadius: 14,
        width: 240,
        height: 64,
        top: 2,
        justifySelf: "center",
        backgroundColor: "var(--palette-base-dark)",
        [theme.breakpoints.down("sm")]: {
            width: 220,
            height: 60,
            top: -2,
            left: -2,
        },
    },
    ".filepond--file": {
        alignItems: "center",
        color: "var(--palette-text-primary)",
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
        width: 30,
        height: 30,
        cursor: "pointer",
        color: "var(--palette-text-primary)",
        backgroundColor: "var(--palette-base-main)",
        borderRadius: 8,
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

    return <StyledFilePond iconRemove={RemoveIcon} {...props} />;
}
