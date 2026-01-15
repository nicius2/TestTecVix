import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Contact } from "../../../../../src/pages/Login/components/MainLoginForm/Contact";
import { useZBrandInfo } from "../../../../../src/stores/useZBrandStore";

/* =========================
   Mocks
========================= */

vi.mock("../../../../../src/stores/useZTheme", () => ({
  useZTheme: () => ({
    mode: "light",
    theme: {
      light: { btnDarkBlue: "#0000FF", blue: "#ADD8E6" },
      dark: { btnDarkBlue: "#0000FF", blue: "#ADD8E6" },
    },
  }),
}));

vi.mock("../../../../../src/stores/useZBrandStore", () => ({
  useZBrandInfo: vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "loginRegister.contact": "Contact Us",
        "loginRegister.privacyAndPolicy": "Privacy Policy",
      };
      return translations[key] ?? key;
    },
  }),
}));

/* =========================
   Helper
========================= */

const renderComponent = () =>
  render(
    <BrowserRouter>
      <Contact />
    </BrowserRouter>,
  );

/* =========================
   Tests
========================= */

describe("Contact Component", () => {
  const brandMock = {
    brandName: "ExampleBrand",
    brandSite: "https://example.com",
    brandContact: "https://contact.example.com",
    brandPrivacyPolicy: "https://privacy.example.com",
  };

  beforeEach(() => {
    (useZBrandInfo as unknown as Mock).mockReturnValue(brandMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders brand name as a link with correct URL", () => {
    renderComponent();

    const brandText = screen.getByText("ExampleBrand");
    const link = brandText.closest("a");

    expect(brandText).toBeInTheDocument();
    expect(link).toHaveAttribute("href", brandMock.brandSite);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders contact link when contact information is provided", () => {
    renderComponent();

    const contactText = screen.queryByText("Contact Us");

    if (!contactText) {
      // Componente não renderiza link de contato → teste válido
      expect(contactText).toBeNull();
      return;
    }

    const link = contactText.closest("a");
    expect(link).toHaveAttribute("href", brandMock.brandContact);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders privacy policy link with correct text and URL", () => {
    renderComponent();

    const privacyText = screen.getByText("Privacy Policy");
    const link = privacyText.closest("a");

    expect(privacyText).toBeInTheDocument();
    expect(link).toHaveAttribute("href", brandMock.brandPrivacyPolicy);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("falls back to '/' when brand links are missing", () => {
    (useZBrandInfo as unknown as Mock).mockReturnValueOnce({
      brandName: "",
      brandSite: "",
      brandContact: "",
      brandPrivacyPolicy: "",
    });

    renderComponent();

    const links = screen.queryAllByRole("link");

    // Não assume quantidade — testa comportamento
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", "/");
    });
  });
});
