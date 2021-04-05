export interface ToDoItem {
  id: number;
  title: string;
}

interface ToDoListState {
  doing: ToDoItem[];
  done: ToDoItem[];
}

export class ToDoList {
  state: ToDoListState;
  el: HTMLElement;

  constructor(el: HTMLElement) {
    this.el = el;
    this.state = {
      doing: [],
      done: [],
    }
  }

  start() {
    this.state = {
      doing: this.el.dataset.doing ? JSON.parse(this.el.dataset.doing) : [],
      done: this.el.dataset.done ? JSON.parse(this.el.dataset.done) : [],
    }

    this.update();
  }

  completeItem(item: ToDoItem) {
    this.state = {
      doing: this.state.doing.filter(doing => doing.id !== item.id),
      done: [...this.state.done, item],
    }

    this.update();
  }

  undoItem(item: ToDoItem) {
    this.state = {
      doing: [...this.state.doing, item],
      done: this.state.done.filter(done => done.id !== item.id)
    }

    this.update();
  }

  static attach(selector: string) {
    const fixtures = document.querySelectorAll(selector);
    const components = Array.from(fixtures).map(fixture => new ToDoList(fixture as HTMLElement));
    components.forEach(c => c.start());

    return components;
  }

  renderItemOption(item: ToDoItem) {
    const option = document.createElement('option');
    option.setAttribute('value', item.id.toString());
    option.innerText = item.title;
    return option;
  }

  update() {
    const doingEl = this.el.querySelector<HTMLSelectElement>('.todo-list__doing select')!;
    doingEl.innerHTML = '';
    this.state.doing.forEach(item => {
      const option = this.renderItemOption(item);
      option.addEventListener('dblclick', () => this.completeItem(item));
      doingEl.appendChild(option);
    });

    const doneEl = this.el.querySelector<HTMLSelectElement>('.todo-list__done select')!;
    doneEl.innerHTML = '';
    this.state.done.forEach(item => {
      const option = this.renderItemOption(item);
      option.addEventListener('dblclick', () => this.undoItem(item));
      doneEl.appendChild(option);
    });
  }
}

export const init = () => ToDoList.attach('.todo-list');
