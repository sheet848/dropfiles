import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isValidEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export const parseObj = (obj: unknown) => {
  return JSON.parse(JSON.stringify(obj));
}

export const getFileIcon = (extension: string) => {
  const ext = extension.replace(".", "").toLowerCase();

  switch (ext) {
    case "pdf":
      return "https://cdn-icons-png.flaticon.com/128/4726/4726010.png";

    case "doc":
      return "https://cdn-icons-png.flaticon.com/128/4725/4725970.png";

    case "docx":
      return "https://cdn-icons-png.flaticon.com/128/9496/9496422.png";

    case "txt":
      return "https://cdn-icons-png.flaticon.com/128/2306/2306185.png";

    case "svg":
      return "https://cdn-icons-png.flaticon.com/128/2306/2306179.png";

    case "csv":
      return "https://cdn-icons-png.flaticon.com/128/9797/9797918.png";

    case "xls":
    case "xlsx":
      return "https://cdn-icons-png.flaticon.com/128/9798/9798110.png";

    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "webp":
    case "bmp":
    case "tiff":
    case "ico":
      return "https://cdn-icons-png.flaticon.com/128/4725/4725998.png";

    case "mp4":
    case "mkv":
    case "mov":
    case "avi":
    case "webm":
    case "flv":
      return "https://cdn-icons-png.flaticon.com/128/4726/4726036.png";

    case "mp3":
    case "mpeg":
    case "wav":
    case "aac":
    case "ogg":
    case "flac":
    case "m4a":
      return "https://cdn-icons-png.flaticon.com/128/11223/11223019.png";

    case "zip":
    case "rar":
    case "7z":
    case "tar":
    case "gz":
      return "https://cdn-icons-png.flaticon.com/128/2258/2258836.png";

    case "json":
    case "xml":
    case "yml":
    case "yaml":
      return "https://cdn-icons-png.flaticon.com/128/136/136525.png";

    case "js":
    case "ts":
    case "html":
    case "css":
    case "cpp":
      return "https://cdn-icons-png.flaticon.com/128/15548/15548996.png";

    default:
      return "https://cdn-icons-png.flaticon.com/128/4726/4726038.png";
  }
}

export const getFileType = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!extension) {
    return { type: "other", extension: "" };
  }

  const documentExtensions = [
    "txt",
    "docx",
    "pdf",
    "csv",
    "doc",
    "ppt",
    "xlsx",
    "ods",
    "odp",
    "html",
    "rtf",
    "epub",
    "fig",
    "md",
    "pages",
    "xd",
    "psd",
    "afphoto",
    "indd",
    "sketch",
    "afdesign",
  ];
  const imageExtension = ["jpeg", "jpg", "png", "gif", "bmp", "svg", "webp"];
  const videoExtension = ["mp4", "mov", "mkv", "webm", "avi"];
  const audioExtension = ["mp3", "wav", "flac", "ogg"];

  if (documentExtensions.includes(extension)) {
    return { type: "document", extension };
  }
  if (imageExtension.includes(extension)) {
    return { type: "image", extension };
  }
  if (videoExtension.includes(extension)) {
    return { type: "video", extension };
  }
  if (audioExtension.includes(extension)) {
    return { type: "audio", extension };
  }

  return { type: "other", extension };
};

export const convertFileToUrl = (file: File) => {
  return URL.createObjectURL(file);
};