import React, { useContext } from "react";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import {
  PreloaderContext,
  PreloaderContextProvider,
} from "./preloader.context";
import Preloader from "./preloader.component";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  jest.restoreAllMocks();
});

const MockComponent = () => {
  const { setIsLoading } = useContext(PreloaderContext);
  const handleAction = async () => {
    setIsLoading(true);
  };
  const handleComplete = async () => {
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Mock component</h1>
      <button type="submit" onClick={handleAction}>
        Action
      </button>
      <button type="submit" onClick={handleComplete}>
        Complete
      </button>
    </div>
  );
};

describe("Preloader unit & integration tests", () => {
  it("Can see preloader", () => {
    render(
      <PreloaderContext.Provider
        value={{ isLoading: true, setIsLoading: () => {} }}
      >
        <Preloader />
      </PreloaderContext.Provider>
    );

    expect(screen.getAllByRole("loader").length).toBeGreaterThan(0);
  });

  it("Can't see preloader", () => {
    render(
      <PreloaderContext.Provider
        value={{ isLoading: false, setIsLoading: () => {} }}
      >
        <Preloader />
      </PreloaderContext.Provider>
    );
    expect(screen.queryAllByRole("loader").length).toEqual(0);
  });

  it("Can see preloader after taking action which is pending", async () => {
    render(
      <PreloaderContextProvider>
        <MockComponent />
        <Preloader />
      </PreloaderContextProvider>
    );

    expect(screen.queryAllByRole("loader").length).toEqual(0);
    userEvent.click(screen.getByRole("button", { name: /action/i }));
    await waitFor(() =>
      expect(screen.getAllByRole("loader").length).toBeGreaterThan(0)
    );
  });

  it("Can't see preloader after pending action is complete", async () => {
    render(
      <PreloaderContextProvider>
        <MockComponent />
        <Preloader />
      </PreloaderContextProvider>
    );

    expect(screen.queryAllByRole("loader").length).toEqual(0);
    userEvent.click(screen.getByRole("button", { name: /action/i }));
    await waitFor(() =>
      expect(screen.getAllByRole("loader").length).toBeGreaterThan(0)
    );
    userEvent.click(screen.getByRole("button", { name: /complete/i }));
    await waitFor(() =>
      expect(screen.queryAllByRole("loader").length).toEqual(0)
    );
  });
});
