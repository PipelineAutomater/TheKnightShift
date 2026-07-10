import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MCTSArgs } from './models';

@Component({
  selector: 'app-alpha-zero',
  imports: [],
  templateUrl: './alpha-zero.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './alpha-zero.css',
})
export class AlphaZero {}

class Node {
  private visit_count;
  private value_sum;
  constructor(
    private args: MCTSArgs,
    private state: string,
    private parent: Node | null = null,
    action_taken: string | undefined = undefined,
  ) {
    this.visit_count = 0;
    this.value_sum = 0;
  }
}

class MCTS {
  private args: MCTSArgs = { num_searches: 5 };
  constructor() {}
  public search(state: string) {
    //Define Root
    const root = new Node(this.args, state);
    for (let search = 0; search < this.args.num_searches; search++) {
      //Selection (Phase 1 of MCTS)
      //Expansion (Phase 2 of MCTS)
      //Simulation (Phase 3 of MCTS)
      //Backpropogation (Phase 4 of MCTS)
    }
    //Return visit counts distribution for the child nodes
  }
}
