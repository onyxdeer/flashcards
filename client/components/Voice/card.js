


const Card = class {
  constructor(data){
    this.data = data
    this.processData()
  }

  processData(){
    this.front = this.getFront()
    this.back = this.getBack()
  }

  getFront(){
    return this.data.front
  }

  getBack(){
    return this.data.back
  }
}