import { AuthService } from "../../src/services/AuthService";
import { UserModel } from "../../src/models/UserModel";
import { AppError } from "../../src/errors/AppError";
import { STATUS_CODE } from "../../src/constants/statusCode";
import { ERROR_MESSAGE } from "../../src/constants/erroMessages";
import { compare, hash } from "bcryptjs";
import { genToken } from "../../src/utils/jwt";

jest.mock("../../src/models/UserModel");
jest.mock("bcryptjs");
jest.mock("../../src/utils/jwt");

describe("AuthService", () => {
  let authService: AuthService;
  let userModelMock: jest.Mocked<UserModel>;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Create a new instance of AuthService, which triggers new UserModel()
    authService = new AuthService();
    
    // Grab the mocked instance of UserModel created inside AuthService
    // This works because jest.mock replaces the class constructor
    userModelMock = (UserModel as jest.Mock).mock.instances[0] as jest.Mocked<UserModel>;
  });

  describe("login", () => {
    const mockUser = {
      idUser: 1,
      name: "Test User",
      email: "test@example.com",
      password: "hashedPassword",
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it("should return token and user without password when credentials are valid", async () => {
      // Arrange
      const email = "test@example.com";
      const password = "password123";
      const token = "valid_token";

      userModelMock.getByEmail.mockResolvedValue(mockUser as any);
      (compare as jest.Mock).mockResolvedValue(true);
      (genToken as jest.Mock).mockReturnValue(token);

      // Act
      const result = await authService.login(email, password);

      // Assert
      expect(userModelMock.getByEmail).toHaveBeenCalledWith(email);
      expect(compare).toHaveBeenCalledWith(password, mockUser.password);
      expect(genToken).toHaveBeenCalledWith({ id: mockUser.idUser, role: mockUser.role });
      
      expect(result).toEqual({
        token,
        user: {
            idUser: mockUser.idUser,
            name: mockUser.name,
            email: mockUser.email,
            role: mockUser.role,
            createdAt: mockUser.createdAt,
            updatedAt: mockUser.updatedAt,
        },
      });
      expect(result.user).not.toHaveProperty("password");
    });

    it("should throw AppError when user is not found", async () => {
      // Arrange
      const email = "wrong@example.com";
      const password = "password123";

      userModelMock.getByEmail.mockResolvedValue(null);

      // Act & Assert
      await expect(authService.login(email, password)).rejects.toBeInstanceOf(AppError);
      
      // We can also verify the properties of the error
      try {
        await authService.login(email, password);
      } catch (error: any) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe(ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD);
        expect(error.status).toBe(STATUS_CODE.UNAUTHORIZED);
      }
      
      expect(userModelMock.getByEmail).toHaveBeenCalledWith(email);
      expect(compare).not.toHaveBeenCalled();
    });

    it("should throw AppError when password does not match", async () => {
      // Arrange
      const email = "test@example.com";
      const password = "wrongPassword";

      userModelMock.getByEmail.mockResolvedValue(mockUser as any);
      (compare as jest.Mock).mockResolvedValue(false);

      // Act & Assert
      await expect(authService.login(email, password)).rejects.toBeInstanceOf(AppError);

       try {
        await authService.login(email, password);
      } catch (error: any) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe(ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD);
        expect(error.status).toBe(STATUS_CODE.UNAUTHORIZED);
      }

      expect(userModelMock.getByEmail).toHaveBeenCalledWith(email);
      expect(compare).toHaveBeenCalledWith(password, mockUser.password);
    });
  });

  describe("register", () => {
    it("should register a new user successfully", async () => {
        // Arrange
        const registerData = {
            username: "newuser",
            email: "new@example.com",
            password: "password123",
            confirmPassword: "password123",
        };

        const mockUser = {
            idUser: 1,
            username: "newuser",
            email: "new@example.com",
            password: "hashedPassword",
            role: "member",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        userModelMock.getByEmail.mockResolvedValue(null);
        (hash as jest.Mock).mockResolvedValue("hashedPassword");
        userModelMock.createUser.mockResolvedValue(mockUser as any);

        // Act
        const result = await authService.register(registerData);

        // Assert
        expect(userModelMock.getByEmail).toHaveBeenCalledWith(registerData.email);
        expect(hash).toHaveBeenCalledWith(registerData.password, 8);
        expect(userModelMock.createUser).toHaveBeenCalledWith({
            username: registerData.username,
            email: registerData.email,
            password: "hashedPassword",
            role: "member",
            isActive: true,
        });

        expect(result.user).toEqual({
            idUser: mockUser.idUser,
            username: mockUser.username,
            email: mockUser.email,
            role: mockUser.role,
            createdAt: mockUser.createdAt,
            updatedAt: mockUser.updatedAt,
        });
        expect(result.user).not.toHaveProperty("password");
    });

    it("should throw AppError when user already exists", async () => {
        // Arrange
        const registerData = {
            username: "existinguser",
            email: "existing@example.com",
            password: "password123",
            confirmPassword: "password123",
        };

        userModelMock.getByEmail.mockResolvedValue({} as any);

        // Act & Assert
        await expect(authService.register(registerData)).rejects.toBeInstanceOf(AppError);

        try {
            await authService.register(registerData);
        } catch (error: any) {
            expect(error).toBeInstanceOf(AppError);
            expect(error.message).toBe(ERROR_MESSAGE.USER_ALREADY_EXISTS);
            expect(error.status).toBe(STATUS_CODE.CONFLICT);
        }

        expect(userModelMock.getByEmail).toHaveBeenCalledWith(registerData.email);
        expect(hash).not.toHaveBeenCalled();
        expect(userModelMock.createUser).not.toHaveBeenCalled();
    });
  });
});