import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const defaultActivities = [
  {
    id: 'family-cooking',
    name: 'Family Cooking',
    description: 'Cook a simple meal together and encourage teamwork at home.',
    duration: '30 min',
    type: 'Family Bonding',
    age: '6-8 years old',
    points: '+20 pts',
  },
  {
    id: 'drawing-time',
    name: 'Drawing Time',
    description: 'Spend time drawing, coloring, or making a small creative project.',
    duration: '20 min',
    type: 'Indoor',
    age: '6-8 years old',
    points: '+15 pts',
  },
  {
    id: 'nature-walk',
    name: 'Nature Walk',
    description: 'Take a short walk outside together and explore the neighborhood.',
    duration: '25 min',
    type: 'Outdoor',
    age: '6-8 years old',
    points: '+20 pts',
  },
  {
    id: 'board-game-night',
    name: 'Board Game Night',
    description: 'Play a board game together to build connection and reduce screen time.',
    duration: '40 min',
    type: 'Family Bonding',
    age: '6-8 years old',
    points: '+25 pts',
  },
  {
    id: 'reading-challenge',
    name: 'Reading Challenge',
    description: 'Read a short story or chapter and share one favorite part.',
    duration: '15 min',
    type: 'Indoor',
    age: '12+ years old',
    points: '+10 pts',
  },
  {
    id: 'bike-ride',
    name: 'Bike Ride',
    description: 'Go on a supervised bike ride or outdoor movement break.',
    duration: '50 min',
    type: 'Outdoor',
    age: '12+ years old',
    points: '+30 pts',
  },
]

export async function seedActivities() {
  for (const activity of defaultActivities) {
    const { id, ...data } = activity
    await setDoc(doc(db, 'activities', id), data)
  }
}
