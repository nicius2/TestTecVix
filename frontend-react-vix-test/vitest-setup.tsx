import React from "react";
import { afterEach, expect, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { createSerializer } from "@emotion/jest";

expect.addSnapshotSerializer(createSerializer());

// Mock HTMLCanvasElement.getContext to prevent lottie-web errors
if (typeof window !== "undefined") {
  HTMLCanvasElement.prototype.getContext = vi.fn();
}

// Mock lottie-react globally
vi.mock("lottie-react", () => ({
  default: () => <div data-testid="lottie-mock" />,
  useLottie: () => ({ View: <div data-testid="lottie-mock" /> }),
}));

afterEach(() => {
  cleanup();
});
