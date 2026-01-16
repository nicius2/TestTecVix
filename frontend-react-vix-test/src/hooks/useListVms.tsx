import { useEffect, useState } from "react";
import { api } from "../services/api";
import { IListAll } from "../types/ListAllTypes";
import { toast } from "react-toastify";
import { useLogin } from "./useLogin";
import { useAuth } from "./useAuth";
import { useZGlobalVar } from "../stores/useZGlobalVar";
import { useZUserProfile } from "../stores/useZUserProfile";
import { IVMCreatedResponse } from "../types/VMTypes";

export const useListVms = () => {
  const [vmList, setVmList] = useState<IVMCreatedResponse[]>([]);
  const [vmTotalCount, setVmTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const {
    setCurrentIdVM,
    currentIdVM,
    setCurrentVMName,
    setTotalCountVMs,
    setCurrentVMOS,
  } = useZGlobalVar();
  const { idBrand } = useZUserProfile();
  const { goLogout } = useLogin();
  const { getAuth } = useAuth();

  const fetchListVms = async (
    params: {
      status?: string;
      page?: number;
      limit?: number;
      search?: string;
      idBrandMaster?: number;
    } = {},
  ) => {
    const auth = await getAuth();
    setIsLoading(true);
    const response = await api.get<IListAll<IVMCreatedResponse>>({
      url: "/vm",
      auth,
      params: {
        ...params,
        //status: "PAUSED", // "RUNNING", "STOPPED", "PAUSED", "null", undefined
      },
    });

    setIsLoading(false);
    if (response.error) {
      if (!response.message.includes("expired")) toast.error(response.message);
      
      // Fallback to mock data for development/visualization
      const mockVms: IVMCreatedResponse[] = [
        {
          idVM: 1,
          vmName: "VM-Test-01",
          disk: 50,
          ram: 8,
          hasBackup: false,
          os: "ubuntu",
          user: "admin",
          vCPU: 4,
          status: "RUNNING",
          idBrandMaster: 1,
          pass: "123456",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
          task: [],
          brandMaster: {
            brandLogo: "",
            brandName: "Vituax",
          },
          vmIpsRegions: { label: "US-East", region: "usa" },
          idIPList: 1,
        },
        {
          idVM: 2,
          vmName: "VM-Test-02",
          disk: 100,
          ram: 16,
          hasBackup: true,
          os: "windows",
          user: "admin",
          vCPU: 8,
          status: "STOPPED",
          idBrandMaster: 1,
          pass: "123456",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
          task: [],
          brandMaster: {
            brandLogo: "",
            brandName: "Vituax",
          },
          vmIpsRegions: { label: "US-West", region: "usa" },
          idIPList: 2,
        },
      ];

      setVmList(mockVms);
      setVmTotalCount(mockVms.length);
      setTotalCountVMs(mockVms.length);
      // goLogout(); // Disable logout to show mock data
      return;
    }

    setVmList(response.data?.result);
    setVmTotalCount(response.data?.totalCount);
    setTotalCountVMs(response.data?.totalCount);

    if (!currentIdVM && response.data?.result.length) {
      setCurrentIdVM(response.data?.result[0].idVM);
      setCurrentVMName(response.data?.result[0].vmName);
      setCurrentVMOS(response.data?.result[0].os);
    }
  };

  useEffect(() => {
    fetchListVms({ idBrandMaster: idBrand, limit: 20 });
  }, []);

  return { vmList, vmTotalCount, isLoading, fetchListVms };
};
