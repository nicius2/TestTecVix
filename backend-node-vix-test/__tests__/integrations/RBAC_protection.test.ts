import request from "supertest";
import { app } from "../../src/app";
import { API_VERSION, ROOT_PATH } from "../../src/constants/basePathRoutes";

const BRAND_MASTER_PATH = API_VERSION.V1 + ROOT_PATH.BRANDMASTER;
const VM_PATH = API_VERSION.V1 + ROOT_PATH.VM;
const USER_PATH = API_VERSION.V1 + ROOT_PATH.USER;

describe("RBAC Route Protection", () => {
  describe("BrandMaster Routes", () => {
    it("should return 401 for GET /brand-master without token", async () => {
      const res = await request(app).get(BRAND_MASTER_PATH);
      expect(res.statusCode).toBe(401);
    });

    it("should return 401 for POST /brand-master without token", async () => {
      const res = await request(app).post(BRAND_MASTER_PATH).send({});
      expect(res.statusCode).toBe(401);
    });
  });

  describe("VM Routes", () => {
    it("should return 401 for GET /vm without token", async () => {
      const res = await request(app).get(VM_PATH);
      expect(res.statusCode).toBe(401);
    });

    it("should return 401 for POST /vm without token", async () => {
      const res = await request(app).post(VM_PATH).send({});
      expect(res.statusCode).toBe(401);
    });
  });

  describe("User Routes", () => {
    it("should return 401 for GET /user without token", async () => {
      const res = await request(app).get(USER_PATH);
      expect(res.statusCode).toBe(401);
    });

    it("should return 401 for POST /user without token", async () => {
      const res = await request(app).post(USER_PATH).send({});
      expect(res.statusCode).toBe(401);
    });
  });
});
