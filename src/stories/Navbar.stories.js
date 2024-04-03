// import { within, userEvent, expect } from '@storybook/test';

// import { Page } from './Page';

// export default {
//   title: 'Example/Page',
//   component: Page,
//   parameters: {
//     // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
//     layout: 'fullscreen',
//   },
// };

// export const LoggedOut = {};

// // More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
// export const LoggedIn = {
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     const loginButton = canvas.getByRole('button', { name: /Log in/i });
//     await expect(loginButton).toBeInTheDocument();
//     await userEvent.click(loginButton);
//     await expect(loginButton).not.toBeInTheDocument();

//     const logoutButton = canvas.getByRole('button', { name: /Log out/i });
//     await expect(logoutButton).toBeInTheDocument();
//   },
// };

// Navbar.stories.js

import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import Navbar from "../component/Navbar";
import "../App.css";
import "../main.css";

export default {
  title: "Navbar",
  component: Navbar,
};

// Default story
export const Default = () => (
  <BrowserRouter>
    <Navbar setSelectedValue={() => {}} />
  </BrowserRouter>
);

// Story with selected Metrics
export const WithMetricsSelected = () => (
  <MemoryRouter initialEntries={["/metrics"]}>
    <Navbar setSelectedValue={() => {}} />
  </MemoryRouter>
);

// Story with selected Logs
export const WithLogsSelected = () => (
  <MemoryRouter initialEntries={["/logs"]}>
    <Navbar setSelectedValue={() => {}} />
  </MemoryRouter>
);
