import { Divider } from "@mui/material";

export default function SelectDivider({ label }) {
    return (
        <div className="flex items-center gap-1 ml-2 h-4 text-[10px] opacity-60">
            {label}
            <Divider className="flex-1 mr-1" />
        </div>
    );
}
