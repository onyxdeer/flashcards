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

const uuid = () => { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

const polish = (percentage) => {
    let result = percentage;
    if(percentage > 90 && percentage <= 100){
      return percentage
    } else {
      if(percentage < 50) percentage += 10
      let modifier = 1.3;
      while(percentage * modifier > 100){
        modifier -= 0.1
      }
      result = Math.floor(percentage * modifier )
    }
    return result
}

const verifyAnswer = (answer) => {
  if( answer >= 90 ){
    return true
  } else {
    return false
  } 
}

/**
 * each item comes in the format of { front:str, back:str, data:str, percent:int, isCorrect: bool }
 * front is the question, back is the answer, data is the result from user input
 * @param {Array} answersList 
 */
const summarize = ( answersList, callback ) => {
  const incorrectList = answersList.filter( i => !i.isCorrect )
  const correctSum = answersList.length - incorrectList.length
  const parsedList = incorrectList.map( i => ({
    front: i.front,
    back: i.back,
    data: i.data
  }))
  const toSay = { 
    total: answersList.length ,
    sumCorrect: correctSum, 
    sumIncorrect: incorrectList.length, 
    list: parsedList,
    callback
  }
  return toSay
}

const readSummary = ( { total, sumCorrect, sumIncorrect, list, callback }) => {
  console.log('what is callback:', callback)
  let allCorrect = sumIncorrect === 0 
  let remain = allCorrect ? 'congratulations' : 'here are the questions that we could work on.';
  const str = `That is the end of our session. you got ${sumCorrect} answers correct. ${sumIncorrect} answers incorrect. out of ${total} norreez. ${remain}`
  window.responsiveVoice.speak(
      str, 
      "US English Female", 
      { onend: allCorrect ? callback() : readList.bind(this, list, callback) }
  );
}

const readList = ( list, callback ) => {
  console.log('readList triggered', list, callback)
  const toSay = list.map(i => `the question was. ${i.front}. and the correct answer was. ${i.back}. but I heard ${i.data}`)

  let start = 0;
  const read = (index) => {
    if(!toSay[index]) {
      console.log('triggering callback!!!')
      callback();
      return
    }
    window.responsiveVoice.speak(toSay[index], 'US English Female', { onend: read(index+1)})
  }
  read(start)
}

const startPipingToBackend = () => { console.log('piping data started')}

const endPipingToBackend = () => { console.log('piping data ended')} 

const prompt = (text) => {
    window.responsiveVoice.speak(text, "UK English Female", { onend: recordAnswer });
}

const recordAnswer = () => {
    console.log('recording answer on microphone')
    //this is where we pipe the answer to the backend
}

const say = (text, callbacks ) => {
    window.responsiveVoice.speak(text, "UK English Female", callbacks );
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






module.exports = { commands, noris, uuid, polish, verifyAnswer, summarize, readSummary }