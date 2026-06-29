import {
    ChartPie,
    Download,
    Files, 
    FolderPen,
    Images,
    Info,
    LayoutDashboard,
    PictureInPicture,
    Share,
    Trash,
} from "lucide-react";

export const SIDEBAR_ITEMS = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        url: "/",
    },
    {
        name: "Documents",
        icon: Files,
        url: "/documents",
    },
    {
        name: "Images",
        icon: Images,
        url: "/images",
    },
    {
        name: "Media",
        icon: PictureInPicture,
        url: "/media",
    },
    {
        name: "Others",
        icon: ChartPie,
        url: "/others",
    },
];

export const HERO_IMAGE = "";

export const USER_ICON = "https://png.pngtree.com/png-vector/20250514/ourlarge/pngtree-3d-profile-icon-png-image_16279302.png";