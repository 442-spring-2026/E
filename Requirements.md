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

When the user submits the login form with a registered email and correct password:  
A3. The user is redirected to the Dashboard page.  

When the user submits the login form with an unrecognized email or incorrect password:  
A4. The user remains on the Authentication page.  

When the user submits the login form with the password field empty:  
A5. The login is not submitted.  

When the user selects "Sign Up":  
A6. The user is redirected to the Onboarding page.  

## Onboarding Page

When the Onboarding page loads:  
O1. A child's age dropdown field is displayed.  
O2. A screen time limit dropdown field is displayed.  
O3. An interests text input field is displayed.  
O4. A "Submit" button is displayed.  

When the user submits the form with all fields completed:  
O5. The user is redirected to the Dashboard page.  

When the user submits the form with one or more fields left empty:  
O6. The message "Please complete all required fields" is displayed.  
O7. The form is not submitted.  

## Dashboard Page

When the Dashboard page loads for a logged-in user:
D1. The page displays the user's current day's total screen time.
D2. The page displays the amount of screen time remaining for the current day.
D3. The page displays a progress indicator representing the portion of the daily screen time limit that has been used.
D4. The page displays a weekly screen time summary.
D5. The page displays the user's current total reward points.
D6. The page displays a button that opens activity suggestions.

When the user's daily screen time is less than the daily screen time limit:
D7. The remaining screen time value equals the daily screen time limit minus the current day's total screen time.
D8. No screen time warning message is displayed.

When the user's daily screen time is equal to the daily screen time limit:
D9. The remaining screen time value is displayed as zero.
D10. A warning message is displayed indicating that the daily screen time limit has been reached.

When the user's daily screen time is greater than the recommended or configured limit:
D11. A warning message is displayed indicating that screen time has exceeded the limit.

When the Dashboard page displays the weekly screen time summary:
D12. The summary includes one value for each day of the current week.
D13. Each displayed daily value corresponds to the total screen time recorded for that day.

When the user has no recorded screen time for a day in the current week:
D14. The weekly screen time summary displays that day's value as zero.

When reward points are displayed on the Dashboard page:
D15. The displayed reward points value equals the user's current accumulated reward points total.

When the user selects the button to view activity suggestions:
D16. The user is redirected to the Activity Suggestions page.

When the Dashboard page is opened after the user completes onboarding successfully:
D17. The page uses the child's saved profile information to determine the displayed screen time limit and related dashboard values.

When the Dashboard page is opened by an unauthenticated user:
D18. The user is redirected to the Authentication page.

## Activity Suggestions Page

When the Activity Suggestions page loads:  
S1. A filter for child age is displayed.  
S2. A filter for available time is displayed.  
S3. A filter for activity type is displayed.  
S4. A button to apply filters is displayed.  

Before any filters are applied:  
S5. No activity recommendations are displayed.

When the user selects a child age filter and clicks the Apply button:  
S6. The activity list updates to show activities matching the selected age range.

When the user selects an available time filter and clicks the Apply button:  
S7. The activity list updates to show activities with duration within the selected time limit.

When the user selects an activity type filter and clicks the Apply button:  
S8. The activity list updates to show activities matching the selected category.

When the user applies one or more filters and clicks the Apply button:  
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

After the activity is added to the Daily Plan:  
S18. A confirmation message is displayed.

## Daily Plan Page

When the Daily Plan page loads:    
DP1. A timeline for the current day is displayed.  
DP2. The remaining allowed screen time is displayed.  
DP3. All scheduled activities are displayed in their assigned time slots.  

When there are no activities in the Daily Plan:    
DP4. The message "No activities in your daily plan" is displayed.    

When the user clicks the "Remove" button for an activity:  
DP5. The activity disappears from the timeline.  

When the user drags an activity to reorder it:  
DP6. The activity is moved to the new position on the timeline.  

When the user drags an activity to another time slot:  
DP7. The activity is reassigned to the new time slot.  

When the user attempts to place an activity into an occupied time slot:  
DP8. The message "This time slot is already occupied" is displayed.  

When the user clicks the "Complete" icon for an activity:  
DP9. The activity is displayed as completed.  
DP10. Reward points increase.  

When a reminder is added to an activity:  
DP11. The reminder is displayed with the corresponding activity.  

## Profile Page

When the Profile page loads:  
P1. A field for child's age is displayed.  
P2. A field for screen time limit is displayed.  
P3. A field for interests is displayed.  

When the user has previously entered profile information:  
P4. The saved values for child's age, screen time limit, and interests are displayed.  

When the user edits the child's age:  
P5. The updated value is displayed in the child's age field.  

When the user edits the screen time limit:  
P6. The updated value is displayed in the screen time limit field.  

When the user edits interests:  
P7. The updated value is displayed in the interests field.  

When the user submits valid profile information:  
P8. The updated values are saved.  

When the profile is successfully saved:  
P9. The updated values are used for future activity recommendations.  

When the user submits the form with any required field empty:  
P10. The message "Please enter valid information" is displayed.

## Nonfunctional Requirements

#### Security
On the Authentication page:  
NF1. The password input field masks characters as the user types.

#### Usability
On the Activity Suggestions page:  
NF2. Filter dropdown menus remain usable on both desktop and mobile screen sizes.
