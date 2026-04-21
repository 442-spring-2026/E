# Requirements

## Global Elements

On every page, when the user is not logged in:
G1. The navigation bar displays the "Nestly" site name.
G2. The navigation bar displays a "Home" link.
G3. The navigation bar displays a "Login" link.

On every page, when the user is logged in:
G4. The navigation bar displays the "Nestly" site name.
G5. The navigation bar displays a "Dashboard" link.
G6. The navigation bar displays an "Activities" link.
G7. The navigation bar displays a "Daily Plan" link.
G8. The navigation bar displays a "Profile" link.
G9. The navigation bar displays a "Logout" link.

On every page:
G10. The footer displays a brief description of the platform.
G11. The footer displays contact information.

When the user selects a navigation link:
G12. The user is redirected to the page corresponding to the selected link.

When a logged-in user selects "Logout":
G13. The user's session is ended.
G14. The user is redirected to the Home page.

When an unauthenticated user attempts to navigate to any page other than Home:
G15. The user is redirected to the Authentication page.

## Home Page

When the Home Page loads:  
H1. The title "Nestly" is displayed.  
H2. A description and guidence of the platform is displayed.  
H3. A “Get Started” button is displayed.

When the user selects "Get Started" button:  
H4. If the user is not logged in, the Authentication page is opened.  
H5. If the user is logged in but has not completed the set up, the Onboarding page is opened.  
H6. If the user has completed onboarding, the Dashboard page is opened.  

## Authentication Page

When the Authentication page loads:
A1. An email input field is displayed.
A2. A password input field is displayed.
A3. A "Login" button is displayed.
A4. A "Sign Up" button is displayed.

When the user submits the login form with a registered email and correct password:
A5. The user is redirected to the Dashboard page.

When the user submits the login form with an unrecognized email or incorrect password:
A6. The message "Invalid email or password" is displayed.
A7. The user remains on the Authentication page.

When the user submits the login form with the email field empty:
A8. The login is not submitted.

When the user submits the login form with the password field empty:
A9. The login is not submitted.

When the user selects "Sign Up":
A10. The user is redirected to the Onboarding page.

## Onboarding Page

When the Onboarding page loads:
O1. A child's age dropdown field is displayed.
O2. A screen time limit dropdown field is displayed.
O3. An interests text input field is displayed.
O4. A "Submit" button is displayed.

When the user submits the form with all fields completed:
O5. The entered child's age is saved to the user's profile.
O6. The entered screen time limit is saved to the user's profile.
O7. The entered interests are saved to the user's profile.
O8. The user is redirected to the Dashboard page.

When the user submits the form with one or more fields left empty:
O9. The message "Please complete all required fields" is displayed.
O10. The form is not submitted.

## Dashboard Page

## Activity Suggestions Page

When the Activity Suggestions page loads:  
S1. A filter for child age is displayed.  
S2. A filter for available time is displayed.  
S3. A filter for activity type is displayed.  
S4. A button to apply filters is displayed.  

Before any filters are applied:  
S5. No activity recommendations are displayed.

When the user selects a child age filter:  
S6. The activity list updates to show activities matching the selected age range.

When the user selects an available time filter:  
S7. The activity list updates to show activities with duration within the selected time limit.

When the user selects an activity type filter:  
S8. The activity list updates to show activities matching the selected category.

When the user applies one or more filters:  
S9. A list of activities matching the selected filters is displayed.

When no activities match the selected filters:  
S10. The message “No activities found. Try adjusting filters.” is displayed.

For each activity shown in the filtered activity list:  
S11. The activity name is displayed.  
S12. A short description of the activity is displayed.  
S13. The estimated duration of the activity is displayed.  
S14. The activity category is displayed.  
S15. The reward points value is displayed.  
S16. A button to add the activity to the Daily Plan is displayed.  

When the user selects “Add to Plan” for an activity:  
S17. A time selection option is displayed.  

When the user selects a time slot:  
S18. The selected activity is added to the Daily Plan at the chosen time.  

After the activity is added to the Daily Plan:  
S19. A confirmation message is displayed.

## Daily Plan Page

## Profile Page

## Nonfunctional Requirements

#### Security
On the Authentication page:  
NF1. The password input field masks characters as the user types.

#### Usability
On the Activity Suggestions page:  
NF2. Filter dropdown menus remain usable on both desktop and mobile screen sizes.