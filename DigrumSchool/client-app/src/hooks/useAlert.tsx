import {useState} from "react";
import {AppAlert} from "../utils/types";

export function useAlert() {
  const [alertData, setAlertData] = useState<AppAlert>({type: 'info', message: '', isShow: false})

  return {alertData, setAlertData}
}