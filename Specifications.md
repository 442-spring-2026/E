# Design & Specifications

## Problem
### Scope
Excessive screen time among young children is a growing developmental concern, as many parents struggle to manage usage due to limited strategies and a lack of practical alternatives that support family interaction. This issue is closely related to SDG 3: Good Health and Well-being, as it directly affects children’s physical and mental health.

This problem affects a large proportion of young children. A recent study on early childhood screen use published in BMJ Paediatrics Open found that more than 60% of children aged 2–5 spend between two and four hours per day on screens, exceeding recommended guidelines . In comparison, the World Health Organization recommends no more than one hour of daily screen time for this age group. This shows that excessive screen exposure is common among young children.

### Impact
Excessive screen time can have significant impacts on children’s development. It is associated with reduced attention span, lower social engagement, impaired emotional regulation, and delays in language and motor development. Research published in JAMA Network Open on young children’s screen use and well-being found that higher screen time is linked to poorer psychological outcomes, including behavioral and emotional difficulties . Children with high screen exposure may also experience problems such as aggression, difficulty interacting with peers, and sleep disturbances. Over time, these issues can affect school readiness, social relationships, and overall well-being. Reduced physical activity linked to prolonged screen use may also contribute to long-term health risks such as obesity.

### Causes
Several factors contribute to this problem, especially within family environments. A study in the Journal of Child and Family Studies shows that parents’ confidence in managing screen time is strongly related to children’s screen use. When parents feel less able to enforce rules, children tend to spend more time on screens. The study also highlights that children’s behavioral difficulties can make it harder for parents to limit usage, creating a cycle where both sides reinforce the problem. In addition, broader research on early childhood screen habits shows that parents often use screens during routines such as meals or to manage children’s behavior, which further increases screen exposure . A systematic review of screen time correlates also found that parental behavior, home environment, and the presence of devices are key factors influencing children’s screen use . These findings suggest that the issue is not only about children’s preferences, but also about family habits and available support.

### Existing solutions
Although solutions exist, they do not fully address the problem. Parental control tools mainly focus on limiting or monitoring screen time, rather than helping families replace it with meaningful activities. Research from the Association for Computing Machinery points out that parents need tools that support engagement and interaction, not just restriction. Many parents reported wanting systems that encourage shared activities and better communication with their children, but current technologies rarely provide this.

### References

1.Early childhood screen time and usage patterns. BMJ Paediatrics Open. https://pmc.ncbi.nlm.nih.gov/articles/PMC12198805/

2.Kwon, S., et al. Screen time and child psychological well-being. JAMA Network Open. https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2815689

3.Nikken, P., & Schols, M. Parenting and child behavior barriers to managing screen time with young children. Journal of Child and Family Studies. Springer. https://link.springer.com/article/10.1007/s10826-020-01881-4

4.Correlates of children’s screen time: A systematic review. BMC Public Health. https://pubmed.ncbi.nlm.nih.gov/37223568/

5.Parenting in the digital age: Design opportunities for family interaction technologies. Association for Computing Machinery. https://dl.acm.org/doi/10.1145/2858036.2858278


## Solution Summary

<<<<<<< HEAD
=======
Our platform helps parents manage their young children's screen time by giving them a clear picture of daily usage and offering real-time suggestions for activities to do instead. Rather than just blocking or restricting screens, the app encourages families to replace that time with indoor, outdoor, or bonding activities that fit the child's age and interests. Parents can build a daily schedule around these activities, and children earn reward points for staying within the recommended limits. By making it easier to plan alternatives and track progress, the app supports healthier habits without making screen time management feel like a punishment.

>>>>>>> origin
## Design

### Global Elements

Every page consists of:

- Navigation bar
- Body
- Footer

The navigation bar contains:

- Website name (””)
- Links: Home, Dashboard, Activities, Daily Plan, Profile

The footer contains:

- Brief description of the platform
- Contact information

---

### Home Page

The Home page introduces the product and guides users to begin.

When the page loads, the following elements are displayed:

- Title: “”
- Short description and guidance of the platform
- “Get Started” button

On click of the “Get started” button, the user is redirected to the Dashboard page.

---

### Dashboard Page

The Dashboard page provides an overview of the child’s screen time and progress.

When the page load, the following elements are displayed:

- Daily screen time (e.g. “3.5 hours”)
- Weekly trend chart
- Remaining allowed screen time (e.g. “1.5 hours left today”)
- Reward points (e.g. “120 pts”)

Screen time is calculated by summing all usage sessions recorded during the day.

Reward points are updated in real time based on:

- staying within daily screen time limit
- completing activities in the Daily Plan

If the screen time exceeds the recommended limit, a warning message is displayed:

- “Screen time exceeded recommended limit”

If the screen time is within the limit, a positive message is displayed:

- “Great job staying within the limit!”

A button labeled “View Suggestions” is displayed.

On click of the “View Suggestions” button, the user is redirected to the Activity Suggestion Page.

If no screen time data has been entered, an error message is displayed:

- “Please enter screen time data”

---

### Activity Suggestions Page

The Activity Suggestions page provides alternative activities to replace screen time. 

When the page loads, a list of activities is displayed. Each activity includes:

- Activity name
- Short description
- Estimated duration

Activities are categorized into:

- Indoor activities
- Outdoor activities
- Family bonding activities

Users can filter activities by:

- Child’s age
- Available time
- Activity type

On click of an activity:

- The activity is added to the Daily Plan
- A confirmation message is displayed

If no activities match the selected filters, an error message is displayed:

- “No activities found. Try adjusting filters.”

---

### Daily Plan Page

The Daily Plan Page helps users organize activities throughout the day.

When the page loads, a timeline of the day is displayed.

Users are able to:

- Add activities to specific time slots
- Remove activities
- Reorder activities
- Add reminders

On drag-and-drop of an activity, the schedule updates accordingly.

The remaining allowed screen time is also displayed on the side.

---

### Profile Page

The Profile Page stores user information and preferences.

When the page loads, the following fields are displayed:

- Child’s age
- Screen time limit
- Interests

Users can update these fields.

On save, the system updates future activity recommendations.

If invalid input is entered, an error message is displayed:

- “Please enter valid information”

---

### Stretch Goals

- Personalized activity recommendations
- Family shared accounts and group challenges
- Simple reward / points system
