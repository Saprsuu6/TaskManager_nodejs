class MyProject {
  constructor(name, tasks) {
    if (tasks != undefined) this.tasks = tasks;
    else throw new Error("You have to set tasks");

    this.creatingDate = new Date().toLocaleString();
  }

  getCreatingDate() {
    return this.creatingDate;
  }

  setCreatingDate(date) {
    this.creatingDate = date;
  }
}

export default MyProject;
