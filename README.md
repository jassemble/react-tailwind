# Stock Data Viewer

Welcome to the Stock Data Viewer! This React application allows users to search for stock data and view historical price charts using the Alpha Vantage API.

## Features

- **Stock Search**: Users can search for stocks using an autocomplete search bar that fetches stock names and symbols dynamically.
- **Dynamic Charting**: View historical price data in a responsive line chart, with options to display Open, High, Low, and Close prices.
- **Interval Selection**: Users can select the data interval (Daily, Weekly, Monthly) to customize the chart view.
- **Error Handling**: User-friendly error messages are displayed when data fetching fails or if there is no data available.
- **Loading State**: A loading spinner indicates when data is being fetched, providing a smooth user experience.

## Major Techniques Used

- **Custom Hooks**: Created `useStockSearch` to encapsulate stock fetching logic, promoting code reusability and separation of concerns.
- **Caching Mechanism**: Implemented a caching mechanism to store previously fetched stock data, reducing redundant API calls and improving load times.
- **Debouncing**: Implemented debouncing in the search input to optimize API calls and reduce unnecessary requests while the user is typing.
- **Responsive Design**: Built with Tailwind CSS to ensure the application is visually appealing and works seamlessly on both desktop and mobile devices.
- **Error Handling**: Implemented a comprehensive error handling mechanism to gracefully manage API response errors and provide feedback to users.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety and improved code quality.
- **Tailwind CSS**: For styling and layout.
- **Recharts**: For creating responsive line charts.
- **Alpha Vantage API**: For fetching stock data.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/stock-data-viewer.git
   ```
2. Navigate to the project directory:
   ```bash
   cd stock-data-viewer
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Live Demo

Check out the live version of the application at: [Stock Data Viewer](https://react-tailwind-livid.vercel.app/)

## License

This project is licensed under the MIT License. See the LICENSE file for details.
