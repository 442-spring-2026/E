# Requirements

## Navigation Bar

- **N1:** Given any page is loaded, when the navigation bar is visible, it displays the website name.
- **N2:** Given any page is loaded, when the navigation bar is visible, it displays a link labeled "Home."
- **N3:** Given any page is loaded, when the navigation bar is visible, it displays a link labeled "Dashboard."
- **N4:** Given any page is loaded, when the navigation bar is visible, it displays a link labeled "Activities."
- **N5:** Given any page is loaded, when the navigation bar is visible, it displays a link labeled "Daily Plan."
- **N6:** Given any page is loaded, when the navigation bar is visible, it displays a link labeled "Profile."
- **N7:** Given any page is loaded, when the user clicks the "Home" link in the navigation bar, the user is redirected to the Home page.
- **N8:** Given any page is loaded, when the user clicks the "Dashboard" link in the navigation bar, the user is redirected to the Dashboard page.
- **N9:** Given any page is loaded, when the user clicks the "Activities" link in the navigation bar, the user is redirected to the Activity Suggestions page.
- **N10:** Given any page is loaded, when the user clicks the "Daily Plan" link in the navigation bar, the user is redirected to the Daily Plan page.
- **N11:** Given any page is loaded, when the user clicks the "Profile" link in the navigation bar, the user is redirected to the Profile page.

---

## Footer

- **FT1:** Given any page is loaded, when the footer is visible, it displays a description of the platform.
- **FT2:** Given any page is loaded, when the footer is visible, it displays contact information.

---

## Home Page

- **H1:** Given the Home page is loaded, when the page renders, it displays a title.
- **H2:** Given the Home page is loaded, when the page renders, it displays a description of the platform.
- **H3:** Given the Home page is loaded, when the page renders, it displays a button labeled "Get Started."
- **H4:** Given the Home page is loaded, when the user clicks the "Get Started" button, the user is redirected to the Dashboard page.

---

## Dashboard Page

Given the Dashboard page is loaded and screen time data has been entered for the current day:

- **D1:** When the page renders, it displays the total daily screen time as the sum of all usage sessions recorded during the current day.
- **D2:** When the page renders, it displays the remaining allowed screen time as the daily screen time limit minus the total daily screen time.
- **D3:** When the page renders, it displays a chart showing the total daily screen time for each of the seven days up to and including the current day.
- **D4:** When the page renders, it displays the current reward points total.
- **D5:** When the total daily screen time exceeds the daily screen time limit, the page displays a message indicating the recommended limit has been exceeded.
- **D6:** When the total daily screen time is less than or equal to the daily screen time limit, the page displays a message indicating the child is within the recommended limit.
- **D7:** When the user clicks the "View Suggestions" button, the user is redirected to the Activity Suggestions page.

Given the Dashboard page is loaded and no screen time data has been entered for the current day:

- **D8:** When the page renders, it displays a message prompting the user to enter screen time data.
- **D9:** When the page renders, it does not display a weekly trend chart.

Given the Dashboard page is loaded:

- **D10:** When the page renders, it displays a button labeled "View Suggestions."
- **D11:** When the child stays within the daily screen time limit for the day, the reward points total increases without requiring a page refresh.
- **D12:** When the child marks an activity in the Daily Plan as complete, the reward points total increases without requiring a page refresh.

---

## Activity Suggestions Page

- **A1:** Given the Activity Suggestions page is loaded, when the page renders, it displays a list of activities.
- **A2:** Given the Activity Suggestions page is loaded, when the page renders, each activity in the list displays an activity name.
- **A3:** Given the Activity Suggestions page is loaded, when the page renders, each activity in the list displays a short description.
- **A4:** Given the Activity Suggestions page is loaded, when the page renders, each activity in the list displays an estimated duration.
- **A5:** Given the Activity Suggestions page is loaded, when the page renders, activities are grouped under the category "Indoor."
- **A6:** Given the Activity Suggestions page is loaded, when the page renders, activities are grouped under the category "Outdoor."
- **A7:** Given the Activity Suggestions page is loaded, when the page renders, activities are grouped under the category "Family Bonding."
- **A8:** Given the Activity Suggestions page is loaded, when the page renders, it displays a filter control for child's age.
- **A9:** Given the Activity Suggestions page is loaded, when the page renders, it displays a filter control for available time.
- **A10:** Given the Activity Suggestions page is loaded, when the page renders, it displays a filter control for activity type.
- **A11:** Given the Activity Suggestions page is loaded, when the user selects a value from the child's age filter, the displayed activities are limited to those matching the selected age.
- **A12:** Given the Activity Suggestions page is loaded, when the user selects a value from the available time filter, the displayed activities are limited to those whose estimated duration does not exceed the selected available time.
- **A13:** Given the Activity Suggestions page is loaded, when the user selects a value from the activity type filter, the displayed activities are limited to those belonging to the selected activity type.
- **A14:** Given the Activity Suggestions page is loaded, when the user applies multiple filters simultaneously, the displayed activities are limited to those that match all selected filter values.
- **A15:** Given the Activity Suggestions page is loaded, when the applied filters match no activities, the page displays a message indicating no activities were found and prompting the user to adjust the filters.
- **A16:** Given the Activity Suggestions page is loaded, when the user clicks an activity, the activity is added to the Daily Plan.
- **A17:** Given the Activity Suggestions page is loaded, when an activity is added to the Daily Plan, the page displays a confirmation message.

---

## Daily Plan Page

- **DP1:** Given the Daily Plan page is loaded, when the page renders, it displays a timeline of the current day.
- **DP2:** Given the Daily Plan page is loaded, when the page renders, it displays the remaining allowed screen time for the current day.
- **DP3:** Given the Daily Plan page is loaded and no activities have been added, when the page renders, the timeline displays no activities.
- **DP4:** Given the Daily Plan page is loaded, when the user selects a time slot on the timeline, the user is able to add an activity to that time slot.
- **DP5:** Given an activity exists on the timeline, when the user removes it, the activity is no longer displayed on the timeline.
- **DP6:** Given an activity exists on the timeline, when the user drags the activity to a different time slot and drops it, the activity appears in the new time slot.
- **DP7:** Given an activity exists on the timeline, when the user adds a reminder to it, the reminder is associated with that activity on the timeline.

---

## Profile Page

- **PR1:** Given the Profile page is loaded, when the page renders, it displays a field showing the child's current age.
- **PR2:** Given the Profile page is loaded, when the page renders, it displays a field showing the current daily screen time limit.
- **PR3:** Given the Profile page is loaded, when the page renders, it displays a field showing the child's current interests.
- **PR4:** Given the Profile page is loaded, when the user updates a field with valid input and saves, the updated value is displayed in that field.
- **PR5:** Given the Profile page is loaded, when the user saves a valid change to the child's age, the activities shown on the Activity Suggestions page reflect the updated age.
- **PR6:** Given the Profile page is loaded, when the user saves a valid change to the child's interests, the activities shown on the Activity Suggestions page reflect the updated interests.
- **PR7:** Given the Profile page is loaded, when the user saves a valid change to the daily screen time limit, the remaining allowed screen time displayed on the Dashboard page reflects the updated limit.
- **PR8:** Given the Profile page is loaded, when the user attempts to save a field containing invalid input, the page displays a message indicating the input is invalid.
- **PR9:** Given the Profile page is loaded, when the user attempts to save a field containing invalid input, the profile is not updated.
