import React from "react";
import { it, expect, describe, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { LoginPage } from "../../../src/pages/Login";
import "@testing-library/jest-dom/vitest";
import loginJson from "../../../src/languages/en/loginRegister/loginRegisterPage.json";

// Tipos para os mocks
interface LinkProps {
  children: React.ReactNode;
  to?: string;
  [key: string]: unknown;
}

interface TransProps {
  children: React.ReactNode;
}

// Mock do tema
const mockedTheme = (mode: "light" | "dark" = "dark") => ({
  mode: mode,
  theme: {
    light: {
      blue: "#0000FF",
      primary: "#FFFFFF",
      mainBackground: "#FFFFFF",
      light: "#000000",
    },
    dark: {
      blue: "#3333FF",
      primary: "#000000",
      mainBackground: "#000000",
      light: "#FFFFFF",
    },
  },
});

// Mocks - DEVEM estar fora do describe
vi.mock("../../../src/stores/useZTheme", () => ({
  useZTheme: vi.fn(() => mockedTheme("dark")),
}));

vi.mock("react-router-dom", () => ({
  Link: ({ children, to = "/", ...props }: LinkProps) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  useNavigate: () => vi.fn(),
  useLocation: () => ({
    pathname: "/login",
    search: "",
    hash: "",
    state: null,
  }),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (arg: string) => {
      if (!arg || typeof arg !== "string") return arg;

      const key = arg.split(".").pop() || arg;
      return loginJson[key as keyof typeof loginJson] || arg;
    },
    i18n: { changeLanguage: vi.fn(), language: "en" },
  }),
  Trans: ({ children }: TransProps) => children,
}));

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render without crashing", () => {
    const { container } = render(<LoginPage />);
    expect(container).toBeTruthy();
  });

  it("should match snapshot", () => {
    const { container } = render(<LoginPage />);
    expect(container).toMatchSnapshot();
  });
});
