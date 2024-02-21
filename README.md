## About
Rep Radar is a civic engagement tool that provides comprehensive information about members of the U.S. House of Representatives. It allows users to search for their representatives by entering their address to access a wealth of information, including voting records, campaign finances, sponsored bills, public statements, press coverage, and more. Rep Radar dynamically compiles information from multiple online resources, ensuring that the information is always up to date and accurate.

## Tech Stack

Rep Radar utilizes the following languages and technologies:

- **Frontend**:
  - HTML
  - CSS
  - JavaScript
  - React
  - Bootstrap
  - Netlify for deployment

- **Backend**:
  - Python
  - FastAPI
  - Redis for caching
  - Heroku for deployment

- **Version Control**:
  - Git
  - GitHub

## Screenshots

![Rep Radar Screenshot](./docs/rep-radar-screenshot.png)

## Architecture

Rep Radar follows a client-server architecture, with the React frontend interacting with the backend server to retrieve data from various public APIs. This architecture enables backend caching for optimization and ensures that API keys remain confidential on the backend.

1. **Frontend-Backend Interaction**: The React frontend communicates with the backend server, which acts as an intermediary for accessing external APIs.

2. **Backend API Calls**: The backend server makes requests to public APIs to gather comprehensive information about members of the U.S. House of Representatives.

3. **Caching**: Rep Radar utilizes Redis for caching frequently accessed data on the backend. This caching mechanism improves performance by reducing the need to repeatedly fetch data from external APIs.

## API Calls

Rep Radar interacts with a number of public APIs to gather comprehensive information about members of the U.S. House of Representatives. Employing asynchronous calls and complex data parsing, the application passes information between these APIs, to seamlessly integrate data from multiple sources. Below are the APIs utilized by Rep Radar:

1. **Civic Info API**: Used to retrieve representative information based on user-provided addresses, including details such as names, districts, and contact information. This information is used to make subsequent API calls.

2. **ProPublica API**: Provides access to data on representatives' biographical details, committee memberships, and voting records.

3. **Congress.gov API**: Retrieves data on sponsored bills, statements, and photos of representatives.

4. **OpenSecrets API**: Offers information on campaign contributions made to representatives, including contribution amounts, sources, and summaries.

5. **News API**: Fetches news articles and coverage related to representatives, enabling users to stay informed about their activities and positions.

## Optimization

Rep Radar implements several optimization techniques to improve performance and efficiency:

- **Backend Caching with Redis**: Rep Radar uses Redis for caching frequently accessed data, such as representative voting patterns and campaign contributions. This helps minimize calls to external APIs and improves response times for user requests.

- **Concurrent API Calls**: Where possible, Rep Radar makes concurrent API calls to retrieve information from multiple online resources simultaneously. This improves response times and overall user experience.

## Responsive Design
Rep Radar is built with a focus on responsive design, ensuring that the application is accessible and user-friendly across a wide range of devices, including desktops, laptops, tablets, and smartphones.

## Future Plans
I plan to expand Rep Radar's capabilities in the future. Some of the planned enhancements include:

- **Expanded Voting Information**: Including more detailed voting information, enabling users to access specific votes and review representatives' voting history related to particular policy areas.

- **Ratings by Advocacy Groups**: Introducing ratings by advocacy groups to provide users with insights into representatives' positions on key issues.

## License
Rep Radar is licensed under the [Mozilla Public License Version 2.0](./LICENSE).
