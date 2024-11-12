import { styled } from "@mui/material/styles";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import iconRemove from "../../assets/remove.svg?raw";

const StyledFilePond = styled(FilePond)(({ theme }) => ({
    width: "278px",
    height: "100px",
    fontFamily: theme.typography.fontFamily,
    ".filepond--drop-label": {
        color: theme.palette.primary.main,
        height: "100px",
    },
    ".filepond--panel-root": {
        borderRadius: "20px",
        backgroundColor: "transparent",
        border: `4px dashed ${theme.palette.primary.main}`,
    },
    ".filepond--item-panel": {
        borderRadius: "14px",
        overflow: "hidden",
        backgroundColor: theme.palette.base.dark,
    },
    ".filepond--item": {
        borderRadius: "14px",
        width: "240px",
        height: "64px",
        top: "2px",
        justifySelf: "center",
        backgroundColor: theme.palette.base.dark,
    },
    ".filepond--file": {
        alignItems: "center",
        color: theme.palette.primary.main,
    },
    ".filepond--drip-blob": {
        backgroundColor: theme.palette.secondary.main,
    },
    "[data-filepond-item-state*='error'] .filepond--item-panel": {
        backgroundColor: theme.palette.warning.light,
    },
    "[data-filepond-item-state*='invalid'] .filepond--item-panel": {
        backgroundColor: theme.palette.warning.light,
    },
    "[data-filepond-item-state='processing-complete'] .filepond--item-panel": {
        backgroundColor: theme.palette.success.main,
    },
    ".filepond--file-action-button": {
        width: "30px",
        height: "30px",
        cursor: "pointer",
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.base.main,
        borderRadius: "8px",
        border: `2px solid ${theme.palette.secondary.main}`,
        boxShadow: `2px 2px ${theme.palette.secondary.main}`,
        transitionDuration: "100ms",
        transitionProperty: "background-color, box-shadow, border-color, color, transform",
        transform: "none !important",
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        },
        "&:active": {
            boxShadow: `0 0 ${theme.palette.secondary.main}`,
            transform: "translateY(2px) !important",
        },
    },
}));

export default function MuiFilepond(props) {
    return <StyledFilePond iconRemove={iconRemove} {...props} />;
}
