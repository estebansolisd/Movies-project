import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import moviesReducer from "@/features/moviesSlice";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";

export function renderWithProviders(
  ui: React.ReactElement,
  { preloadedState = {} } = { preloadedState: {} }
) {
  const store = configureStore({
    reducer: {
      movies: moviesReducer.reducer,
    },
    preloadedState,
  });

  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  };
}

describe("App", () => {
  test("renders inputs and button", () => {
    renderWithProviders(<App />, {
      preloadedState: {
        movies: { status: "idle", movies: [] },
      },
    });

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/actor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("updates input value", async () => {
    renderWithProviders(<App />, {
      preloadedState: {
        movies: { status: "idle", movies: [] },
      },
    });

    const titleInput = screen.getByLabelText(/title/i);
    await userEvent.type(titleInput, "Fast and Furious");

    expect(titleInput).toHaveValue("Fast and Furious");
  });

  test("Show loader when loading", () => {
    renderWithProviders(<App />, {
      preloadedState: {
        movies: { status: "loading", movies: [] },
      },
    });

    expect(screen.getByRole("progressbar")).toBeVisible();
  });

  test("Show movies correctly", () => {
    renderWithProviders(<App />, {
      preloadedState: {
        movies: {
          status: "idle",
          movies: [
            {
              id: "1",
              title: "Amazing Spiderman",
              genre: "Sci-Fi",
              year: 2026,
              actors: [{ name: "Leonardo Wilson" }],
            },
          ],
        },
      },
    });

    expect(screen.getByText("Amazing Spiderman")).toBeInTheDocument();
    expect(screen.getByText(/2026/)).toBeInTheDocument();
    expect(screen.getByText(/Leonardo Wilson/)).toBeInTheDocument();
  });
});
