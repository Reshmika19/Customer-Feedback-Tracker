
# Custrack: Customer Feedback Management System
Custrack is a comprehensive web application designed to streamline the process of collecting, categorizing, and managing customer feedback. 
This system enables both customers and administrators to efficiently communicate and track feedback while providing actionable insights for continuous improvement.

# Documentation  
For a detailed explanation of the project, refer to the [Documentation](Customer%20Feedback%20Tracker%20-%20Documentation.pdf).

# Screen Recording
Watch a demonstration of how Custrack works:  
[Click here to view the screen recording](Custrack.mp4) 
or https://drive.google.com/file/d/1GA6cbXhDzwu3WYTm5A9AV1KsTmH5lwTg/view?usp=sharing

# Implementation Images
      To provide a better understanding of the application's workflow and features, I have included implementation images in this repository. These images showcase:

            Home Page: Displays the landing page with a welcoming interface.
            Feedback Submission: A detailed view of the feedback form with all required fields.
            Track Feedback: Screenshot of the tracking feature showing feedback status with a unique track ID.
            Admin Dashboard: Insights into the admin functionalities, including filtering feedback by category, status, replying to feedback, and updating status.
            Reports Section: Graphical representations and insights highlighting trends and areas for improvement.
            
      These images will help users and reviewers understand the system's flow and functionality at a glance.

# Technologies Used
      Frontend: React.js
      Backend: Node.js/Express.js
      Database: MongoDB/MySQL (specify based on your implementation)
      Styling: CSS, Bootstrap
      Others: Chart.js (for reports and graphs), Email.js (for feedback confirmation emails)

# Features
      Home: Introduces the platform and guides users on how to submit feedback.
      About: Provides details about the application and its purpose.
      Feedback: Allows customers to submit their feedback with options for categories like complaints, suggestions, and compliments.
      Track Feedback: Enables customers to track the status of their feedback using a unique Track ID.
      Admin Login:
        Secured access for administrators to:
        Filter feedback by category and status.
        Respond to customer feedback.
        Change feedback status.
        Generate reports with graphical insights.
  
# List of Modules
      1. Home Module
            Description:
                Introduces the platform and highlights its features.
                Provides guidance on how to use the system.
            Steps:
                Navigate to the home page.
                Review the provided instructions and features.
            Uses:
                Ensures users understand the purpose of the application.
                Provides a visually engaging entry point for new users.
      2. About Module
            Description:
                Contains detailed information about the application.
                Explains the goals and benefits of using Custrack.
            Steps:
                Click on the "About" tab to access this page.
            Uses:
                Helps users understand the value of the platform.
                Builds trust and transparency.
      3. Feedback Module
            Description:
                Allows users to submit feedback by entering details such as name, email, category, and message.
                Sends a confirmation email with a Track ID upon submission.
            Steps:
                Enter your name and email address.
                Select a category (complaint, suggestion, or compliment).
                Write your feedback message.
                Submit the form.
                Receive a Track ID and confirmation email.
            Uses:
                Enables users to easily communicate their thoughts and experiences.
                Ensures all feedback is documented.
      4. Track Feedback Module
            Description:
                Lets users track the status of their feedback using a unique Track ID.
            Steps:
                Enter the Track ID in the search bar.
                View the current status of the feedback.
            Uses:
                Keeps users informed about the progress of their feedback.
      5. Admin Login Module
            Description:
                Secure login for administrators to manage feedback and generate reports.
            Steps:
                Log in using admin credentials.
                Access the dashboard to view and manage feedback.
                Filter feedback by category, status, or response.
                Change the status of feedback (e.g., pending, resolved).
                Respond to feedback directly.
                Generate reports with graphical insights into feedback trends.
            Uses:
                Streamlines administrative tasks.
                Provides data-driven insights to identify areas for improvement.
         
# Admin Features
      1. Filter Feedback:
          By Category: Complaints, Suggestions, Compliments.
          By Status: Pending, Resolved, In Progress.
          By Response: Feedback with or without a reply.
      2. Manage Feedback:
          Change the status of feedback.
          Reply directly to customers.
      3. Generate Reports:
          View graphs representing feedback trends (e.g., feedback volume by category, feedback resolution times).
          Identify areas for improvement based on insights.
