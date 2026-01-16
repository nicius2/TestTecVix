import { user } from "@prisma/client";
import { VMModel } from "../models/VMModel";
import { vMCreatedSchema } from "../types/validations/VM/createVM";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { vMUpdatedSchema } from "../types/validations/VM/updateVM";
import { vmListAllSchema } from "../types/validations/VM/vmListAll";

export class VMService {
  constructor() {}

  private vMModel = new VMModel();

  async getById(idVM: number) {
    return this.vMModel.getById(idVM);
  }

  async listAll(query: unknown, user: user) {
    const validQuery = vmListAllSchema.parse(query);

    // If user is admin, allow them to query any brand or all (if they don't specify)
    // If user is member/manager, RESTRICT to their idBrandMaster

    let filterBrandId: number | undefined | null = undefined;

    if (user.role === "admin") {
      filterBrandId = validQuery.idBrandMaster as number | null | undefined;
    } else {
      filterBrandId = user.idBrandMaster;
    }

    return this.vMModel.listAll({
      query: validQuery,
      idBrandMaster: filterBrandId || undefined,
    });
  }

  async createNewVM(data: unknown, _user: user) {
    const validateData = vMCreatedSchema.parse(data);

    const createdVM = await this.vMModel.createNewVM({
      ...validateData,
      status: "RUNNING",
    });

    return createdVM;
  }

  async updateVM(idVM: number, data: unknown, _user: user) {
    const validateDataSchema = vMUpdatedSchema.parse(data);
    const oldVM = await this.getById(idVM);

    if (!oldVM) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const updatedVM = await this.vMModel.updateVM(idVM, validateDataSchema);
    return updatedVM;
  }

  async startVM(idVM: number, _user: user) {
    const oldVM = await this.getById(idVM);

    if (!oldVM) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const updatedVM = await this.vMModel.updateStatus(idVM, "RUNNING");
    return updatedVM;
  }

  async getVMUsage(idVM: number, _user: user) {
    const vm = await this.getById(idVM);

    if (!vm) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    // Mock usage data based on VM specs
    // In a real scenario, this would come from a monitoring service
    const cpuUsage = Math.floor(Math.random() * 100);
    const ramUsage = Math.floor(Math.random() * vm.ram);
    const diskUsage = Math.floor(Math.random() * vm.disk);

    return {
      idVM: vm.idVM,
      cpu: {
        total: vm.vCPU,
        usage: cpuUsage, // percentage
        usageUnit: "%",
      },
      ram: {
        total: vm.ram,
        usage: ramUsage,
        totalUnit: "GB",
        usageUnit: "GB",
      },
      disk: {
        total: vm.disk,
        usage: diskUsage,
        totalUnit: "GB",
        usageUnit: "GB",
      },
    };
  }

  async deleteVM(idVM: number, _user: user) {
    const oldVM = await this.getById(idVM);
    if (!oldVM) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const deletedVm = await this.vMModel.deleteVM(idVM);
    return deletedVm;
  }
}
