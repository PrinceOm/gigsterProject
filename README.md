Deployed URL: http://ec2-54-164-31-6.compute-1.amazonaws.com:3000/

Feel free to test out the application using the mentioned URL.  To run the app locally please do the following:

Please change the DOMAIN variable located inside '/client/modules/environment.js' file to 'localhost:9000' instead of the AWS domain.  The repo is currently configured for deployment through AWS EC2.  Thus, the domain for all API calls needs to be adjusted to run locally.  


In order to run the application from your local computer please make sure to have installed latest versions of MongoDB and Node.  Also, make sure to start mongoDB with 'Mongod' command.

To start application locally please do the following steps in order:
  1. NPM install
  2. NPM start
  3. NPM run build
  4. NPM run client


Now you may access the app from your browser by going to localhost:3000

The server is currently running on port 9000 while client is hosted on port 3000

ExpenseApp user guide:
  1. Signup/Login
    - To Signup, click on the top right 'signup' tab to signup (password,username,account-type required).
    - Login screen is the default landing page for the app; user can login with password and username.
  2. Homepage(expense list, expense form, generate report, logout)
    - Once logged in the user sees a list of expenses, expense input form, a generate report form, and a logout tab on top right of the navigation bar.
    - Clicking logout will log the user out of the application, otherwise the application will retain the JSON webtoken to verify authenticity of the user and keep them logged in even when navigating to other sites.
  3. Expense input form
    - To create a new expense user needs to input date/time(only after 1970), description of the expense, and amount.  Any invalid inputs will prevent user from submitting an improper expense.
  4. Expenses list
    - Expense list shows all user owned expenses and if the owner is an Admin will show all the expenses by any user.
    - User can only edit expenses owned by them all other expenses are disabled for editing.
    - Clicking 'edit' will populate the Expense input form to be able to delete or edit the selected expense.
  5. Generate report
    - Allows users to generate a report of their owned expenses by selecting a start date/time and end date/time(invalid queries will prompt for valid inputs).
    - Upon entering a valid query, an Expense Report component will display the expenses matching the query and a report showing:
      - Start and end date of the generated report
      - Number of total expenses in the report
      - Total amount spent
      - Per day, per week, and per year breakdown of spending
    - Return tab on the bottom of the listed report expense will return the user to the main page of the application to add/edit/delete expense and generate reports.


Software Application Features:
  1. For persistent data application uses mongodb to store information.
  2. The Redux state is stored in localStorage, not just to access the webtoken for user auth; but also, stores the a complete copy of the Redux state using a throttle function found in the /client/localStorage.js file.
  3. Tests can be run by using the 'NPM run test' command; few basic tests are setup.  All tests are on the server-side.  Unfortunately, I was unable to setup client/browser tests within the project timeline.  For ReactJS based applications jest and enzyme are the two best resources for tests.

Project-setup:
  1. Client - contains all client-side:
    - Modules: contains auth, expense, and user constants/actions/reducers for redux state.
    - Containers: all React components which are connected to the redux state.
    - Components: all React components which are not connected to the redux state.
  2. Server
    - Api: contains all the api endpoints for the application, each subfolder has a mongodb model to create collection of data related to its api endpoint.
      - User: responsible for creating, deleting users
      - Expense: responsible for CRUD actions related to expenses
      - Auth: responsible for authentication for application
    - Config: contains setup for the server including production, test, and development environments.  As well as defining the express configuration and API routes.
    - Db: basic setup for mongodb/mongoose.
    - Util: contains reused utility functions needed for all the API endpoints.
