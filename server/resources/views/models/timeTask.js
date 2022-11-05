const msInDay = 86400000;

class timeTask {
  constructor(criterion, tasks = []) {
    this.index = 0;
    this.isActive = true;

    if (String(criterion).trim() !== "")
      this.criterion = String(criterion).trim();
    else throw new Error("You have to set ctiterion");

    if (tasks.length !== 0) this.tasks = tasks;
    else throw new Error("You have to set tasks");

    this.creatingDate = new Date().toLocaleString();
  }

  startTimer() {
    switch (this.criterion.toLowerCase()) {
      case "to day":
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("promise");
          }, 10000);
        });
        break;
      case "to week":
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("promise");
          }, 20000);
        });
        break;
      case "to month":
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("promise");
          }, 30000);
        });
        break;
    }
  }

  getCreatingDate() {
    return this.creatingDate;
  }

  setCreatingDate(date) {
    this.creatingDate = date;
  }

  returnTasksTag() {
    let elementLi = document.createElement("li");
    elementLi.className = "list-group-item";
    elementLi.setAttribute("criterion", this.criterion);

    let elementDivCard = document.createElement("div");
    elementDivCard.className = "card";

    let elementDivBody = document.createElement("div");
    elementDivBody.className = "card-body";

    let elementH5 = document.createElement("h5");
    elementH5.className = "card-title";

    let listOfTasks = document.createElement("ul");
    listOfTasks.className = "list-group";

    let li;
    this.tasks.forEach((element) => {
      li = document.createElement("li");
      li.className = "list-group-item";
      li.innerText = "- " + element.name;
      li.id = this.index;
      listOfTasks.append(li);
    });

    let rowForBtn = document.createElement("div");
    rowForBtn.className = "row mt-2";

    let colForBtn = document.createElement("div");
    colForBtn.className = "col";

    let buttonRemove = document.createElement("button");
    buttonRemove.className = "btn btn-outline-danger";
    buttonRemove.innerText = "🧺";

    elementLi.appendChild(elementDivCard).appendChild(elementDivBody);

    elementDivBody.appendChild(elementH5);
    elementDivBody.appendChild(listOfTasks);
    elementDivBody.appendChild(rowForBtn);

    rowForBtn.appendChild(colForBtn);

    colForBtn.appendChild(buttonRemove);

    return elementLi;
  }
}

export default timeTask;
