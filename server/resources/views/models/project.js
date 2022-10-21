class MyProject {
  constructor(name, tasks) {
    if (name.trim() !== "") this.name = name;
    else throw new Error("You have to set project name");

    if (tasks !== undefined) this.tasks = tasks;
    else throw new Error("You have to set tasks");

    this.creatingDate = new Date().toLocaleString();
  }

  getCreatingDate() {
    return this.creatingDate;
  }

  setCreatingDate(date) {
    this.creatingDate = date;
  }

  returnProjectTag() {
    let elementLi = document.createElement("li");
    elementLi.className = "list-group-item";

    let elementDivCard = document.createElement("div");
    elementDivCard.className = "card";

    let elementDivBody = document.createElement("div");
    elementDivBody.className = "card-body";

    let elementH5 = document.createElement("h5");
    elementH5.className = "card-title";
    elementH5.innerText = this.name;

    let listOfTasks = document.createElement("ul");
    listOfTasks.className = "list-group";

    let li;
    this.tasks.forEach((element) => {
      li = document.createElement("li");
      li.className = "list-group-item";
      li.innerText = "- " + element.name;
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

export default MyProject;
