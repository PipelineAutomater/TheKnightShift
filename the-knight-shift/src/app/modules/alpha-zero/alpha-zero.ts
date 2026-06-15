import { Component } from '@angular/core';
import { MCTSArgs } from './models';

@Component({
  selector: 'app-alpha-zero',
  imports: [],
  templateUrl: './alpha-zero.html',
  styleUrl: './alpha-zero.css',
})
export class AlphaZero {
  
}

class Node {
  
}

class MCTS {
  private args: MCTSArgs = {num_searches: 5};
  constructor() {}
  public search(state) {
    //Define Root
    for (let search = 0; search < this.args.num_searches; search++) {
      //Selection (Phase 1 of MCTS)
      //Expansion (Phase 2 of MCTS)
      //Simulation (Phase 3 of MCTS)
      //Backpropogation (Phase 4 of MCTS)
    }
    //Return visit counts distribution for the child nodes
  }
}