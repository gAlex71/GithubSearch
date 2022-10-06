import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store";

//Позволяет забирать данные из стора
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector