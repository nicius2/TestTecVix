import { useTranslation } from "react-i18next";
import { useZVM } from "../../../stores/useZVM";
import { DropDowText } from "./DropDowText";

export const BTNISOsSection = () => {
  const { t } = useTranslation();
  const { vmSO, setVmSO } = useZVM();

  const osOptions = [
    { label: "Ubuntu", value: "ubuntu" },
    { label: "Windows", value: "windows" },
    { label: "OS", value: "os" },
  ];

  return (
    <DropDowText
      label={t("createVm.operationalSystem")}
      data={osOptions}
      value={vmSO}
      onChange={setVmSO}
    />
  );
};
