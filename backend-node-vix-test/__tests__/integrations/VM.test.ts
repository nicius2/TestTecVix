import request from "supertest";
import { app } from "../../src/app";
import { API_VERSION, ROOT_PATH } from "../../src/constants/basePathRoutes";
import { prismaMock } from "../singleton";
import { VMListMock as OriginalVMListMock } from "../__mocks__/VMList";
import { newBrandMasterMock } from "../__mocks__/brandMaster";
import { ETaskLocation, vM } from "@prisma/client";

jest.unmock("../../src/database/client");

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.VM;
const AUTH_PATH = API_VERSION.V1 + ROOT_PATH.AUTH;

const BrandMasterListMock = [newBrandMasterMock];

const VMListMock = OriginalVMListMock.map((vm) => ({
  ...vm,
  pass: "password",
  location: ETaskLocation.LOCAL,
  os: "Linux",
  createdAt: new Date(vm.createdAt),
  updatedAt: new Date(vm.updatedAt),
}));

describe("Testing VM API", () => {
  let token: string;

  beforeAll(async () => {
    const user = {
      email: `test-user-${Date.now()}@test.com`,
      username: "test-user",
      password: "password",
      confirmPassword: "password",
    };
    await request(app).post(`${AUTH_PATH}/register`).send(user);
    const response = await request(app).post(`${AUTH_PATH}/login`).send({
      email: user.email,
      password: user.password,
    });
    token = response.body.token;
  });

  describe("Testing VM API - getById", () => {
    it("should return null when no VMs with the given id", async () => {
      const vm = VMListMock[0];
      prismaMock.vM.findUnique.mockResolvedValue(null);

      const response = await request(app)
        .get(`${BASE_PATH}/${vm.idVM}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(null);
    });
  });

  describe("Testing VM API - createVM", () => {
    it("should return Unauthorized if BrandMaster not match", async () => {
      const vm = VMListMock[0];
      const brandMaster = BrandMasterListMock[0];
      prismaMock.brandMaster.findUnique.mockResolvedValue(brandMaster);

      const response = await request(app)
        .post(BASE_PATH)
        .send({ ...vm, idBrandMaster: 123 })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(401);
    });

    it("should return Unauthorized if Company not match", async () => {
      const vm = VMListMock[0];
      const brandMaster = BrandMasterListMock[0];
      prismaMock.brandMaster.findUnique.mockResolvedValue(brandMaster);

      const response = await request(app)
        .post(BASE_PATH)
        .send({ ...vm, companyId: 123 })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(401);
    });
  });

  describe("Testing VM API - deleteVM", () => {
    it("should return Unauthorized if BrandMaster not exist", async () => {
      const vm = VMListMock[0];
      prismaMock.brandMaster.findUnique.mockResolvedValue(null);

      const response = await request(app)
        .delete(`${BASE_PATH}/${vm.idVM}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(401);
    });

    it("should return Unauthorized if BrandMaster not match", async () => {
      const vm = VMListMock[0];
      const brandMaster = BrandMasterListMock[0];
      prismaMock.brandMaster.findUnique.mockResolvedValue(brandMaster);

      const response = await request(app)
        .delete(`${BASE_PATH}/${vm.idVM}`)
        .send({ ...vm, idBrandMaster: 123 })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(401);
    });

    it("should return Unauthorized if Company not match", async () => {
      const vm = VMListMock[0];
      const brandMaster = BrandMasterListMock[0];
      prismaMock.brandMaster.findUnique.mockResolvedValue(brandMaster);

      const response = await request(app)
        .delete(`${BASE_PATH}/${vm.idVM}`)
        .send({ ...vm, companyId: 123 })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(401);
    });
  });
});
