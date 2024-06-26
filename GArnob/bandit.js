learningIteration(){
    while(this.env.isTerminal(this.state[0], this.state[1])||this.env.isBlocked(this.state[0], this.state[1])){
        this.state = [Math.floor(Math.random()*this.env.width), Math.floor(Math.random()*this.env.height)];
    }
    let a = this.selectActionFromPolicy(this.state);
    let nextState = this.env.getNextState(this.state[0], this.state[1], a)
    let R = this.env.getReward(this.state[0], this.state[1]);
}
selectActionFromPolicy(state){
    let actionIndex;
    if(Math.random()<this.config.epsilon){
        actionIndex = Math.floor(this.env.actions.length*Math.random());
    }
    else{
        actionIndex = Math.max(this.Q[state[0]][state[1]]);
    }
    return actionIndex;
}
updateValue(state, action, reward, nextState){
    this.Q[this.state[0]][this.state[1]][action] = this.Q[this.state[0]][this.state[1]][action] + this.config.alpha*(reward+this.config.gamma * Math.max(this.Q[nextState[0]][nextState[1]])- this.Q[state[0]][state[1]][action]);
}
updatePolicy(state){
    let maxActionValue=Math.max(this.Q[state[0]][state[1]]);
    let maxActions=[];
    for(let i=0; i<this.Q[state[0]][state[1]].length; i++){
        if(this.Q[state[0]][state[1]][i] == maxActionValue){
            maxActions.push(i);
        }
    }
    for(let i=0; i<this.P[state[0]][state[1]].length; i++){
        if(maxActions.includes(i)){
            this.P[state[0]][state[1]][i] = 1.0/maxActions.length;
        }
        else{
            this.P[state[0]][state[1]][i] = 0;
        }
    }
}