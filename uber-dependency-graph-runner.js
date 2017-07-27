class Task {
  constructor(name, fn, dependencies) {
    this.name = name;
    this.fn = fn;
    this.dependencies = dependencies;
  }
}

const taskFn = (task, done) => {
  setTimeout(() => {
    console.log(task.name + " task complete");
    done();
  }, 1000);
};

const taskQueue = [
  {name: "A", fn: taskFn},
  {name: "B", fn: taskFn},
  {name: "C", fn: taskFn},
  {name: "D", fn: taskFn, dependencies: ["A", "B"]},
  {name: "E", fn: taskFn, dependencies: ["C", "D"]}
];

const runTasks = (tasks) => {
  const listeners = {};

  const done = (task) => () => {
    if (listeners[task.name] != null) {
      listeners[task.name].forEach((listener) => {
        listener();
      });
    }
  };

  const taskListener = (task, dependency) => () => {
    task.dependencies.splice(task.dependencies.indexOf(dependency), 1);
    if (!task.dependencies.length) {
      task.fn(task, done(task));
    }
  };

  tasks.forEach((task) => {
    if (task.dependencies != null) {
      task.dependencies.forEach((dependency) => {
        if (listeners[dependency] == null) {
          listeners[dependency] = [];
        }

        listeners[dependency].push(taskListener(task, dependency));
      });
    } else {
      task.fn(task, done(task));
    }
  });
};

runTasks(taskQueue);
