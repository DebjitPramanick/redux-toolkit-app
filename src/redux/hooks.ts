import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store";
import { StoreState } from "../types";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<StoreState>();
