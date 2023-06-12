"use client"
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { red } from "@mui/material/colors";

export const Person = () => { return <AccountCircleIcon className="h-auto w-auto" /> };
export const Shopping = () => { return <LocalMallOutlinedIcon className="h-auto w-auto" /> };
export const Search = () => { return <SearchIcon className="h-auto w-auto" /> };
export const Remove = () => { return <DeleteOutlineIcon sx={{color: red[500]}} /> };