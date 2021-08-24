# csr-reactnative
### Application specifications and requirements
A mobile application to help students find another student to switch their courses/sections with them. 
  
Students will have to sign up for a new account (using MIU emails only), Every time they sign in, the application will read their location and only allow them to proceed if they are located within MIU campus,  application will display 3 tabs:
1. **List of courses** with a requests counter, ordered by offering date (starting from current month forward), when they click on a course name, they see list of students who posted switch-request and currently enrolled in this course. *(Courses list is pre-defined by an admin).*
2. **Latest posts** by date (timeline), every post contains student name, current course, and desired course(s), an optional message.
3. **Post a new switch request**.
  
Users are able to update/remove their own post easily. The application should allow one switch request per student per course. Once a request is fulfilled, students are able to mark it as done and it will be hidden from the courses/posts lists.
  
Any student wants to fulfill a switch request, the app will allow users to communicate via email, use Expo `MailComposer` API to send emails between students. 
  

* Implement a login based system using JSON Web Token (JWT).
* Use UI Kit.
* Use Expo SDK APIs.
* Use Express/MongoDB for supportive backend API. All Express routes should be protected from public access by JWT (except sign up and sign in routes). Persist the app state in AsyncStorage, users don't need to login everytime they start the app.  