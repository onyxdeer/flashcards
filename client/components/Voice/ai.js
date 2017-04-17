const AI = class {
  constructor(name) {
    this.name = name;
    // if (annyang) {
    //   annyang.addCommands(this.commands);
    //   annyang.start();
    // };
    // this.commands = Object.getOwnPropertyNames( AI.prototype );
    this.commands = this._getCommands();
  }

  _getCommands(){
    commandNames = Object.getOwnPropertyNames( AI.prototype );
    // commandNames.map( command => { command : AI.prototype[command] })
    // let copy = { ...AI.prototype };
    let commandObj = {};
    filteredCommands = this.removedPrivateMethods(commandNames);
    filteredCommands.map(command => commandObj[command] = AI.prototype[command] );
    return commandObj;
  }

  _checkUnderScore(methodName){
    return methodName[0] === '_';
  }

  _removePrivateMethods(CommandsToRemove){
    let isConstructor = 'constructor';
    getNoneUnderScoreMethods = CommandsToRemove
                        .filter(command => this._checkUnderScore(command))
                        .filter(command => command === isConstructor );
    
    return getNoneUnderScoreMethods;
  }

  say(text) {
    console.log('i am speaking: ', text)
    return this;
  }
  
};


export default AI;