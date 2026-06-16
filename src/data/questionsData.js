// Communication Style Quiz
// styleId mapping (matches ./stylesData.js):
//   direct        → A answers: speed, clarity, decisive action
//   enthusiastic  → B answers: energy, motivation, positive vibe
//   collaborative → C answers: care, connection, shared problem-solving
//   precise       → D answers: accuracy, standards, detail

export const QUESTIONS = [
  {
    id: 'q1',
    text: 'A team member used the wrong milk in a smoothie. What sounds most like you?',
    options: [
      { id: 'q1-direct',        text: '"Wrong item. Remake it with almond milk and keep the line moving."', styleId: 'direct' },
      { id: 'q1-enthusiastic',  text: '"No worries! Let\'s knock out a perfect remake and get it to them with a smile."', styleId: 'enthusiastic' },
      { id: 'q1-collaborative', text: '"Rough one, I\'ve been there. What can I do to help you get the right one out?"', styleId: 'collaborative' },
      { id: 'q1-precise',       text: '"Double check the ticket, they swapped almond milk. Read every line carefully for the remake."', styleId: 'precise' }
    ]
  },
  {
    id: 'q2',
    text: 'A team member isn\'t offering E&Es. How do you coach them?',
    options: [
      { id: 'q2-direct',        text: '"Use this line: \'Would you like to customize your smoothie with an energy boost or extra protein?\' Try it for the next ten guests."', styleId: 'direct' },
      { id: 'q2-enthusiastic',  text: '"You\'re great with guests! Now, tell them why you love customizing your own smoothie with a multivitamin."', styleId: 'enthusiastic' },
      { id: 'q2-collaborative', text: '"It feels a bit awkward to ask, doesn\'t it? Let\'s find a way to say it that feels like you."', styleId: 'collaborative' },
      { id: 'q2-precise',       text: '"If we add an E&E to 10 more orders a day, our team hits its goal."', styleId: 'precise' }
    ]
  },
  {
    id: 'q3',
    text: 'It\'s shift change. How do you brief the incoming lead?',
    options: [
      { id: 'q3-direct',        text: '"Lobby is clean, and prep is caught up, John comes in at 6. You\'re set."', styleId: 'direct' },
      { id: 'q3-enthusiastic',  text: '"Team is in a great groove! Awesome energy at the window, just keep that momentum going."', styleId: 'enthusiastic' },
      { id: 'q3-collaborative', text: '"Team\'s good, but Sarah had a tough rush, check on her. Anything you need from me?"', styleId: 'collaborative' },
      { id: 'q3-precise',       text: '"Strawberry inventory is low and the walk-in is organized by date. Waste is logged in the book."', styleId: 'precise' }
    ]
  },
  {
    id: 'q4',
    text: 'A new seasonal smoothie starts today. What sounds most like you?',
    options: [
      { id: 'q4-direct',        text: '"New smoothie today. Keep the recipe chits up so we can keep the line moving."', styleId: 'direct' },
      { id: 'q4-enthusiastic',  text: '"This flavor is a game-changer! Taste it so you can get the guests hyped about it."', styleId: 'enthusiastic' },
      { id: 'q4-collaborative', text: '"We have a new launch. I want to hear what you guys think of the flavor profile."', styleId: 'collaborative' },
      { id: 'q4-precise',       text: '"New smoothie today. The recipe is a little tricky, so double-check your measurements."', styleId: 'precise' }
    ]
  },
  {
    id: 'q5',
    text: 'A team member is fast but isn\'t greeting guests warmly. What\'s your move?',
    options: [
      { id: 'q5-direct',        text: '"Your speed is great, but you need to greet guests as soon as they walk in."', styleId: 'direct' },
      { id: 'q5-enthusiastic',  text: '"You\'re a machine behind the counter! Now, let\'s bring that same energy to the front door."', styleId: 'enthusiastic' },
      { id: 'q5-collaborative', text: '"I love how reliable you are. How can we make the greeting feel more natural for you?"', styleId: 'collaborative' },
      { id: 'q5-precise',       text: '"Surveys show the greeting is our most important metric. Let\'s make sure we check that box."', styleId: 'precise' }
    ]
  },
  {
    id: 'q6',
    text: 'A team member who is usually on time arrives 15 minutes late. What sounds most like you?',
    options: [
      { id: 'q6-direct',        text: '"You\'re late. Clock in and prep a box of bananas. We\'ll talk about the schedule later."', styleId: 'direct' },
      { id: 'q6-enthusiastic',  text: '"Glad you made it! We need your energy on the line, grab your apron and jump in."', styleId: 'enthusiastic' },
      { id: 'q6-collaborative', text: '"Glad you\'re safe. Is everything okay? Take a second to breathe, then join us."', styleId: 'collaborative' },
      { id: 'q6-precise',       text: '"You\'re 15 minutes behind. Note the correct time on the log before you wash up."', styleId: 'precise' }
    ]
  },
  {
    id: 'q7',
    text: 'When I\'m in a shift huddle or a meeting, I usually…',
    options: [
      { id: 'q7-direct',        text: 'Focus on the "bottom line" so we can get back to work.', styleId: 'direct' },
      { id: 'q7-enthusiastic',  text: 'Keep the energy up and make sure the team stays motivated.', styleId: 'enthusiastic' },
      { id: 'q7-collaborative', text: 'Listen more than I talk to ensure everyone feels included.', styleId: 'collaborative' },
      { id: 'q7-precise',       text: 'Take notes and look for the specific details or changes.', styleId: 'precise' }
    ]
  },
  {
    id: 'q8',
    text: 'I feel most confident as a leader when…',
    options: [
      { id: 'q8-direct',        text: 'We have a clear goal and a deadline to hit.', styleId: 'direct' },
      { id: 'q8-enthusiastic',  text: 'The team is excited and the energy in the store is high.', styleId: 'enthusiastic' },
      { id: 'q8-collaborative', text: 'My team feels supported, heard, and seen.', styleId: 'collaborative' },
      { id: 'q8-precise',       text: 'I have all the facts and the manual in front of me.', styleId: 'precise' }
    ]
  },
  {
    id: 'q9',
    text: 'When I have to give tough feedback, my biggest concern is…',
    options: [
      { id: 'q9-direct',        text: 'Not wasting time and getting the behavior fixed immediately.', styleId: 'direct' },
      { id: 'q9-enthusiastic',  text: 'Not killing the team\'s "vibe" or positive momentum.', styleId: 'enthusiastic' },
      { id: 'q9-collaborative', text: 'Making sure the team member knows I still care about them.', styleId: 'collaborative' },
      { id: 'q9-precise',       text: 'Being 100% accurate and meeting our standards.', styleId: 'precise' }
    ]
  },
  {
    id: 'q10',
    text: 'In my store, the most important part of a conversation is…',
    options: [
      { id: 'q10-direct',        text: 'Clarity: does everyone know exactly what to do next?', styleId: 'direct' },
      { id: 'q10-enthusiastic',  text: 'Engagement: is everyone fired up to do their best?', styleId: 'enthusiastic' },
      { id: 'q10-collaborative', text: 'Connection: does the team feel like we\'re in this together?', styleId: 'collaborative' },
      { id: 'q10-precise',       text: 'Accuracy: are we following the Smoothie King standards perfectly?', styleId: 'precise' }
    ]
  }
];
