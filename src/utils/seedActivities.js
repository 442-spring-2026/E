import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

const defaultActivities = [
  // 2-5 years old
  { id: 'storytime-25', name: 'Storytime', description: 'Read a picture book together before bed.', duration: '15 min', type: 'Indoor', age: '2-5 years old', points: '+10 pts' },
  { id: 'dance-party-25', name: 'Dance Party', description: 'Put on some music and dance together at home.', duration: '15 min', type: 'Family Bonding', age: '2-5 years old', points: '+10 pts' },
  { id: 'finger-painting-25', name: 'Finger Painting', description: 'Let your toddler explore colors and creativity with finger paints.', duration: '20 min', type: 'Indoor', age: '2-5 years old', points: '+15 pts' },
  { id: 'playground-25', name: 'Playground Trip', description: 'Head to the playground for some outdoor fun and fresh air.', duration: '30 min', type: 'Outdoor', age: '2-5 years old', points: '+20 pts' },
  { id: 'bubbles-25', name: 'Bubble Play', description: 'Blow bubbles outside and chase them around together.', duration: '15 min', type: 'Outdoor', age: '2-5 years old', points: '+10 pts' },
  { id: 'sorting-game-25', name: 'Sorting Game', description: 'Sort toys, blocks, or household items by color and shape together.', duration: '20 min', type: 'Indoor', age: '2-5 years old', points: '+15 pts' },
  { id: 'family-walk-25', name: 'Family Walk', description: 'Take a slow walk around the block and point out things you see.', duration: '20 min', type: 'Outdoor', age: '2-5 years old', points: '+15 pts' },
  { id: 'sing-along-25', name: 'Sing-Along', description: 'Sing nursery rhymes or favorite songs together.', duration: '15 min', type: 'Family Bonding', age: '2-5 years old', points: '+10 pts' },
  { id: 'playdough-25', name: 'Playdough Sculpting', description: 'Make shapes and animals together with playdough.', duration: '25 min', type: 'Indoor', age: '2-5 years old', points: '+15 pts' },
  { id: 'nature-collect-25', name: 'Nature Collecting', description: 'Go outside and collect leaves, rocks, or flowers together.', duration: '30 min', type: 'Outdoor', age: '2-5 years old', points: '+20 pts' },
  { id: 'puzzle-25', name: 'Simple Puzzle', description: 'Work on a simple puzzle together to build focus and problem-solving.', duration: '20 min', type: 'Family Bonding', age: '2-5 years old', points: '+15 pts' },
  { id: 'block-building-25', name: 'Block Building', description: 'Build towers and structures with blocks or duplos.', duration: '25 min', type: 'Indoor', age: '2-5 years old', points: '+15 pts' },
  { id: 'water-play-25', name: 'Water Play', description: 'Play with cups and water in a safe outdoor setting.', duration: '30 min', type: 'Outdoor', age: '2-5 years old', points: '+20 pts' },
  { id: 'cooking-helper-25', name: 'Kitchen Helper', description: 'Let your child help with simple tasks like mixing or pouring.', duration: '20 min', type: 'Family Bonding', age: '2-5 years old', points: '+15 pts' },

  // 6-8 years old
  { id: 'family-cooking', name: 'Family Cooking', description: 'Cook a simple meal together and encourage teamwork at home.', duration: '30 min', type: 'Family Bonding', age: '6-8 years old', points: '+20 pts' },
  { id: 'drawing-time', name: 'Drawing Time', description: 'Spend time drawing, coloring, or making a small creative project.', duration: '20 min', type: 'Indoor', age: '6-8 years old', points: '+15 pts' },
  { id: 'nature-walk', name: 'Nature Walk', description: 'Take a short walk outside together and explore the neighborhood.', duration: '25 min', type: 'Outdoor', age: '6-8 years old', points: '+20 pts' },
  { id: 'board-game-night', name: 'Board Game Night', description: 'Play a board game together to build connection and reduce screen time.', duration: '40 min', type: 'Family Bonding', age: '6-8 years old', points: '+25 pts' },
  { id: 'storytime', name: 'Storytime', description: 'Read a picture book together before bed.', duration: '15 min', type: 'Indoor', age: '6-8 years old', points: '+10 pts' },
  { id: 'backyard-play', name: 'Backyard Play', description: 'Play outside with toys, chalk, or just run around.', duration: '45 min', type: 'Outdoor', age: '6-8 years old', points: '+25 pts' },
  { id: 'puppet-show', name: 'Puppet Show', description: 'Make puppets from socks and put on a short show together.', duration: '20 min', type: 'Family Bonding', age: '6-8 years old', points: '+15 pts' },
  { id: 'lego-building', name: 'Lego Building', description: 'Build something creative with Legos or building blocks.', duration: '45 min', type: 'Indoor', age: '6-8 years old', points: '+25 pts' },
  { id: 'sidewalk-chalk', name: 'Sidewalk Chalk', description: 'Draw pictures and play games with chalk outside.', duration: '15 min', type: 'Outdoor', age: '6-8 years old', points: '+10 pts' },

  // 9-11 years old
  { id: 'science-experiment', name: 'Science Experiment', description: 'Try a simple at-home science experiment like making a volcano.', duration: '30 min', type: 'Indoor', age: '9-11 years old', points: '+20 pts' },
  { id: 'bike-ride-911', name: 'Neighborhood Bike Ride', description: 'Go on a bike ride around the neighborhood together.', duration: '40 min', type: 'Outdoor', age: '9-11 years old', points: '+25 pts' },
  { id: 'cooking-together-911', name: 'Recipe Night', description: 'Let your child help make a simple recipe from start to finish.', duration: '45 min', type: 'Family Bonding', age: '9-11 years old', points: '+25 pts' },
  { id: 'journaling', name: 'Journaling', description: 'Write about your day or draw a comic strip in a notebook.', duration: '15 min', type: 'Indoor', age: '9-11 years old', points: '+10 pts' },
  { id: 'frisbee', name: 'Frisbee in the Park', description: 'Head to the park and toss a frisbee or play catch.', duration: '30 min', type: 'Outdoor', age: '9-11 years old', points: '+20 pts' },
  { id: 'family-trivia-911', name: 'Trivia Challenge', description: 'Play a round of trivia with fun questions for everyone.', duration: '20 min', type: 'Family Bonding', age: '9-11 years old', points: '+15 pts' },
  { id: 'art-project-911', name: 'Art Project', description: 'Work on a detailed drawing, painting, or craft project.', duration: '45 min', type: 'Indoor', age: '9-11 years old', points: '+25 pts' },
  { id: 'jump-rope-911', name: 'Jump Rope', description: 'Head outside for a quick jump rope session.', duration: '15 min', type: 'Outdoor', age: '9-11 years old', points: '+10 pts' },
  { id: 'hiking-911', name: 'Short Hike', description: 'Go on a short nature hike and look for plants and animals.', duration: '50 min', type: 'Outdoor', age: '9-11 years old', points: '+30 pts' },

  // 12+ years old
  { id: 'reading-challenge', name: 'Reading Challenge', description: 'Read a short story or chapter and share one favorite part.', duration: '15 min', type: 'Indoor', age: '12+ years old', points: '+10 pts' },
  { id: 'bike-ride', name: 'Long Bike Ride', description: 'Go on a longer supervised bike ride or outdoor movement break.', duration: '50 min', type: 'Outdoor', age: '12+ years old', points: '+30 pts' },
  { id: 'family-cooking-12', name: 'Lead the Kitchen', description: 'Take the lead on cooking a full meal for the family.', duration: '45 min', type: 'Family Bonding', age: '12+ years old', points: '+25 pts' },
  { id: 'puzzle-12', name: 'Puzzle Challenge', description: 'Work on a complex puzzle alone or with a sibling.', duration: '30 min', type: 'Indoor', age: '12+ years old', points: '+15 pts' },
  { id: 'run-12', name: 'Morning Run', description: 'Go for a jog around the block or neighborhood trail.', duration: '20 min', type: 'Outdoor', age: '12+ years old', points: '+15 pts' },
  { id: 'game-night-12', name: 'Strategy Game Night', description: 'Play a strategy board game or card game together.', duration: '40 min', type: 'Family Bonding', age: '12+ years old', points: '+20 pts' },
  { id: 'journaling-12', name: 'Creative Writing', description: 'Write a short story or poem and share it with the family.', duration: '20 min', type: 'Indoor', age: '12+ years old', points: '+15 pts' },
  { id: 'quick-chat-12', name: 'Family Check-In', description: 'Spend a few minutes sharing highlights and plans for the day.', duration: '15 min', type: 'Family Bonding', age: '12+ years old', points: '+10 pts' },
  { id: 'book-club-12', name: 'Independent Reading', description: 'Read for an extended period and write down your thoughts.', duration: '45 min', type: 'Indoor', age: '12+ years old', points: '+25 pts' },

]

export async function seedActivities() {
  const flagDoc = await getDoc(doc(db, 'meta', 'seeded'))
  if (flagDoc.exists()) return

  for (const activity of defaultActivities) {
    const { id, ...data } = activity
    await setDoc(doc(db, 'activities', id), data)
  }

  await setDoc(doc(db, 'meta', 'seeded'), { done: true })
}
