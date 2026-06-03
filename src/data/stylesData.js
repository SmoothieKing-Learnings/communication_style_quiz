// Centralized theme colors for the 4 styles to allow easy editing during development
export const STYLE_COLORS = {
  direct:        '#E76F51', // Burnt Sienna  — assertive, no-nonsense
  enthusiastic:  '#F4A261', // Warm Honey    — energetic, upbeat
  collaborative: '#2A9D8F', // Deep Teal     — calm, people-first
  precise:       '#E9C46A'  // Soft Gold     — methodical, exacting
};

// The 4 Communication Styles
// Question option `styleId`s in ./questionsData.js MUST match an `id` here.
// - `priority` / `mantra`: shown together on the results screen as "Priority: X | Mantra: Y"
// - `strengths` / `blindSpots`: short, at-a-glance bullets shown by default
// - `strengthsDetailed` / `blindSpotsDetailed`: full titled descriptions
//   revealed inside the "Show full description" accordion on the results screen
export const STYLES = [
  {
    id: 'direct',
    name: 'The Direct Communicator',
    subtitle: 'Direct',
    priority: 'efficiency',
    mantra: 'clear is efficient',
    summary: 'You talk to move the shift forward. When tickets are flying and the lobby is full, your team trusts the fast, clear calls that come from you. You skip the warm-up and go straight to the decision. Clarity is your kindness.',
    strengths: ['The anchor in the rush', 'Decisive problem solving', 'Protecting labor and speed'],
    blindSpots: ['The robot vibe', 'Leaving out the why', 'The accidental snap'],
    strengthsDetailed: [
      {
        title: 'The anchor in the rush',
        description: 'When the tickets are printing fast and the lobby is full, you\'re the one who keeps the team from sinking. You don\'t clutter the airwaves; you give the fast, clear decisions the team needs.'
      },
      {
        title: 'Decisive problem solving',
        description: 'If a blender breaks or a guest is upset, you don\'t over-analyze. You provide an immediate solution so the team never has to guess what the next move is.'
      },
      {
        title: 'Protecting labor and speed',
        description: 'You\'re a master at shaving seconds off ticket times. You communicate exactly how to be faster, helping the team hit its goals without sacrificing quality.'
      }
    ],
    blindSpotsDetailed: [
      {
        title: 'The robot vibe',
        description: 'By skipping the warm-up talk, you can come across as cold. Your team might feel like they\'re just labor units on a spreadsheet rather than people you care about.'
      },
      {
        title: 'Leaving out the why',
        description: 'Because you value brevity, you might give a task without the reason. Without the why, the team loses their connection to our mission and the guest\'s experience.'
      },
      {
        title: 'The accidental snap',
        description: 'Your directness can be misread as anger. More collaborative team members might feel snapped at even when you\'re just trying to be efficient.'
      }
    ],
    color: STYLE_COLORS.direct
  },
  {
    id: 'enthusiastic',
    name: 'The Enthusiastic Communicator',
    subtitle: 'Enthusiastic',
    priority: 'engagement',
    mantra: 'energy is contagious',
    summary: 'You are the heartbeat of the shift. Your energy lifts the team out of a slump, and guests remember the warmth they got from you. You communicate with enthusiasm because you know momentum matters as much as accuracy.',
    strengths: ['The heartbeat of the team', 'Legendary guest connections', 'Recharging the team'],
    blindSpots: ['Burying the lead', 'Dismissing the details', 'Ignoring the low battery'],
    strengthsDetailed: [
      {
        title: 'The heartbeat of the team',
        description: 'You are the source of energy. Your big smiles and high-fives make a shift feel like a team sport rather than a job.'
      },
      {
        title: 'Legendary guest connections',
        description: 'You don\'t just take orders; you engage. You make guests feel seen and excited to come back, which is the secret sauce for building a loyal community.'
      },
      {
        title: 'Recharging the team',
        description: 'When everyone is dragging during a tough closing shift, your energy is what gets them across the finish line. You know how to pull people out of a slump.'
      }
    ],
    blindSpotsDetailed: [
      {
        title: 'Burying the lead',
        description: 'Sometimes the hype hides the instruction. A team member might leave a shift huddle feeling pumped but have no idea which prep task they\'re actually supposed to start.'
      },
      {
        title: 'Dismissing the details',
        description: 'Precise communicators might feel you\'re all talk. If you gloss over the technical facts to keep the energy high, your more detail-oriented teammates might lose trust in your leadership.'
      },
      {
        title: 'Ignoring the low battery',
        description: 'You might try to cheerlead a teammate who is actually burnt out or struggling. In those moments, they need you to hear them, not just hype them.'
      }
    ],
    color: STYLE_COLORS.enthusiastic
  },
  {
    id: 'collaborative',
    name: 'The Collaborative Communicator',
    subtitle: 'Collaborative',
    priority: 'connection',
    mantra: 'lead by listening',
    summary: 'You talk by listening first. Team members come to you when something is off because they know you will hear them out. You build loyalty by treating every conversation as a two-way street. Connection before correction.',
    strengths: ['The safe harbor', 'De-escalating conflict', 'Building loyalty'],
    blindSpots: ['The soft signal', 'Avoiding hard conversations', 'Slowing down the rush'],
    strengthsDetailed: [
      {
        title: 'The safe harbor',
        description: 'You are an incredible listener. Your team feels safe coming to you with mistakes or personal problems because they know you\'ll react with empathy, not a lecture.'
      },
      {
        title: 'De-escalating conflict',
        description: 'You excel at handling guest complaints. You naturally ask questions to understand their frustration before trying to solve it, which makes the guest feel respected.'
      },
      {
        title: 'Building loyalty',
        description: 'People stay with you because they feel valued. You lead with praise and catch the small wins that others miss, making your team feel like a family.'
      }
    ],
    blindSpotsDetailed: [
      {
        title: 'The soft signal',
        description: 'Your instructions can sound like suggestions. A direct teammate might not realize that "I was thinking we should sweep the lobby" actually means "The lobby is dirty; please sweep it now."'
      },
      {
        title: 'Avoiding hard conversations',
        description: 'Because you value harmony, you might hesitate to give a nudge or corrective feedback. Not being clear is unkind, it allows a missed standard to become a bad habit.'
      },
      {
        title: 'Slowing down the rush',
        description: 'During a peak hour, your desire to check in on everyone can actually slow the operation down. Sometimes the team just needs a command, not a conversation.'
      }
    ],
    color: STYLE_COLORS.collaborative
  },
  {
    id: 'precise',
    name: 'The Precise Communicator',
    subtitle: 'Precise',
    priority: 'accuracy',
    mantra: 'the details matter',
    summary: 'You speak in specifics. You catch the small thing that everyone else missed: the prep date, the temperature, the exact step that got skipped. Your team trusts that what you say is right, and your guests get the drink exactly as promised.',
    strengths: ['The guardian of the standard', 'Training mastery', 'Integrity of the blend'],
    blindSpots: ['The over-communication trap', 'The nagging label', 'Telling over showing'],
    strengthsDetailed: [
      {
        title: 'The guardian of the standard',
        description: 'Your prep lists are perfect and your counter is spotless. You ensure that whether a guest visits on Monday or Friday, their smoothie tastes exactly the same.'
      },
      {
        title: 'Training mastery',
        description: 'You\'re the best at taking a green hire and getting them solo on the line. Your instructions are backed by the manual and data, leaving no room for guessing.'
      },
      {
        title: 'Integrity of the blend',
        description: 'You know the products better than anyone. You ensure the blend promise is met because you communicate the exact measurements required for every recipe.'
      }
    ],
    blindSpotsDetailed: [
      {
        title: 'The over-communication trap',
        description: 'During a rush, a three-minute explanation for a ten-second task will frustrate a fast-moving team. Learn to give the quick fix now and the deep dive in a slow moment.'
      },
      {
        title: 'The nagging label',
        description: 'Enthusiastic communicators might feel you\'re constantly critiquing minor details. This can drain their energy and make them feel like they can\'t do anything right.'
      },
      {
        title: 'Telling over showing',
        description: 'You might rely so much on the manual that you forget to jump in and model the behavior. Some team members need to see the care behind the task, not just hear the rule.'
      }
    ],
    color: STYLE_COLORS.precise
  }
];
