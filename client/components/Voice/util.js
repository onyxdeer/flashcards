const commands = {
      'start': function() {
        // $('#tpsreport').animate({bottom: '-100px'});
        console.log('hello')
      },
      'hello': function(){
        console.log('hello function called')
        say('hello there, my name is norica, here to help you memorize your ')
      },
      'next': function(){
        console.log('next function called!')
      },
      'go' : function(){
        console.log('go fucntion called')
      },
      'repeat': function(){
        console.log('repeat function called')
      },
      'redo': function(){
        console.log('redo function called')
      },
      'previous': function(){
        console.log('previous function called')
      },
      'retry': function(){
        console.log('retry function called')
      },
      'answer': function(){
        console.log('answer function called')
      },
      'accent': function(){
        //another function alias called
        //say it as if you are *country name
        console.log('accent function called')
      }
    };





const startPipingToBackend = () => { console.log('piping data started')}

const endPipingToBackend = () => { console.log('piping data ended')} 

const prompt = (text) => {
  responsiveVoice.speak(text, "UK English Female", { onend: recordAnswer });
}

const recordAnswer = () => {
  console.log('recording answer on microphone')
  //this is where we pipe the answer to the backend
}

const say = (text, callbacks ) => {
  responsiveVoice.speak(text, "UK English Female", callbacks );
}


const bentoList = [
  {
    name: 'Hack Reactor 2',
    description: 'Learn more about Hack Reactor Cohort 71',
    nori_count: 10,
    visit_count: 20,
    user_id: 1,
    category_id: 1
  },
  {
    name: 'Hack Reactor 3',
    description: 'Learn more about Hack Reactor Cohort 71',
    nori_count: 10,
    visit_count: 20,
    user_id: 1,
    category_id: 1
  },
  {
    name: 'Hack Reactor 4',
    description: 'Learn more about Hack Reactor Cohort 71',
    nori_count: 10,
    visit_count: 20,
    user_id: 1,
    category_id: 1
  },
  {  
    name: 'Hack Reactor 5',
    description: 'Learn more about Hack Reactor Cohort 71',
    nori_count: 10,
    visit_count: 20,
    user_id: 1,
    category_id: 1
  }
]    

const noris = [
  {
    name: 'card 1 ',
    description: 'Question about Eric',
    text_front: 'Who is Eric\'s favorite basketball player?',
    text_back: 'Kevin Durant'
  },
  {
    name: 'card 2',
    description: 'Question about Eric',
    text_front: 'dynamic programming',
    text_back: 'Klay Thompson'
  },
  {
    name: 'card 3',
    description: 'Question about Eric',
    text_front: 'dynamic programming',
    text_back: 'In computer science, mathematics, management science, economics and bioinformatics, dynamic programming, also known as dynamic optimization, is a method for solving a complex problem by breaking it down into a collection of simpler subproblems, solving each of those subproblems just once, and storing their solutions '
  },
  {
    name: 'card 4',
    description: 'Question about Eric',
    text_front: 'Who is Eric\'s favorite person who likes to eat and drink coconuts?',
    text_back: 'aloak misra should be the answer, it is very obvious he has the special ability to absorb calories with accumulating any excess'
  },
  {
    name: 'card 5',
    description: 'Question about Eric',
    text_front: 'Who is Eric\'s favorite basketball player?',
    text_back: 'Iggy'
  }
]


const responses = {
  correct: 'you are right, and by the way i love you',
  wrong: 'totally incorrect, maybe you should buy a new brain because something is definitely wrong',
  wrong80percent: 'not quite there, you got most of it, try again, or would you like to give up like a coward that you are and have me read you the answer'
}



module.exports = { commands, noris, responses }