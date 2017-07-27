let id = 0;
const nextUID = () => id++;

const binarySearch = (priority, tasks) => {
  let min = 0;
  let max = tasks.length - 1;
  let mid = 0;
  while (min <= max) {
    mid = Math.floor((min + max) / 2);
    if (tasks[mid].priority < priority) {
      min = mid + 1;
    } else if (tasks[mid].priority > priority) {
      max = mid - 1;
    }
  }
  return min;
}

class TaskRunner {
  constructor(concurrency) {
    this.tasks = [];
    this.running = [];
    this.complete = [];
    this.concurrency = concurrency;
  }

  run() {
    const done = (task) => () => { 
      this.running.splice(this.running.indexOf(task), 1);

      task.state = "complete";
      this.complete.push(task);
      this.run();
    }

    if (this.tasks.length > 0 && this.running.length < this.concurrency) {
      const task = this.tasks.pop();
      task.state = "running";
      this.running.push(task);
      task.fn(done(task));
    }
  }

  push(task, priority) {
    const uid = nextUID();
    const insertionIndex = binarySearch(priority, this.tasks);
    this.tasks.splice(insertionIndex, 0, {fn: task, priority: priority, id: uid, state: "queued"});
    this.run();
  }
}

const TR = new TaskRunner(1);
const task = (done) => { console.log("task complete"); setTimeout(done, 10); };
TR.push(task, 5);
TR.push(task, 9);
TR.push(task, 7);
TR.push(task, 2);
TR.push(task, 8);
