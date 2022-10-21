class MyTask {
  constructor(name, terms, describe, tags = [], priority) {
    if (name.trim() !== "") this.name = name;
    else throw new Error("You have to set task name");

    if (terms !== "") this.terms = terms;
    else throw new Error("You have to set task terms");

    this.describe = describe === "" ? "---" : describe.trim();
    this.tags = tags.length === 0 || tags === undefined ? "---" : tags;

    if (priority !== "" || priority !== undefined) this.priority = priority;
    else throw new Error("You have to set task priority");

    this.creatingDate = new Date().toLocaleString();
  }

  getCreatingDate() {
    return this.creatingDate;
  }

  setCreatingDate(date) {
    this.creatingDate = date;
  }

  returnTaskTeg() {
    let elementLi = document.createElement("li");
    elementLi.className = "list-group-item";

    let elementDivCard = document.createElement("div");
    elementDivCard.className = "card";

    let elementDivBody = document.createElement("div");
    elementDivBody.className = "card-body";

    let elementH5 = document.createElement("h5");
    elementH5.className = "card-title";
    elementH5.innerText = this.name;

    let tags = this.tags;
    if (this.tags != "---") {
      tags = "";
      this.tags.forEach((tag) => {
        tags += `#${tag} `;
      });
    }

    let priority;
    switch (this.priority) {
      case "hight":
        priority = "🥇";
        break;
      case "middle":
        priority = "🥈";
        break;
      case "low":
        priority = "🥉";
        break;
    }

    let elementP = document.createElement("p");
    elementP.className = "card-text";
    elementP.innerText = `Terms: ${
      this.terms.includes("T")
        ? new Date(this.terms).toLocaleString()
        : new Date(this.terms).toLocaleDateString()
    }
      Describe: ${this.describe}
      Tags: ${tags}
      Priority: ${priority}\n
      Created: ${this.creatingDate}`;

    let rowForBtn = document.createElement("div");
    rowForBtn.className = "row";

    let colForBtn1 = document.createElement("div");
    colForBtn1.className = "col";

    let colForBtn2 = document.createElement("div");
    colForBtn2.className = "col";

    let buttonEdit = document.createElement("button");
    buttonEdit.className = "btn btn-outline-warning";
    buttonEdit.innerText = "✍";

    let buttonRemove = document.createElement("button");
    buttonRemove.className = "btn btn-outline-danger";
    buttonRemove.innerText = "🧺";

    elementLi.appendChild(elementDivCard).appendChild(elementDivBody);

    elementDivBody.appendChild(elementH5);
    elementDivBody.appendChild(elementP);
    elementDivBody.appendChild(rowForBtn);

    rowForBtn.appendChild(colForBtn1);
    rowForBtn.appendChild(colForBtn2);

    colForBtn1.appendChild(buttonEdit);
    colForBtn2.appendChild(buttonRemove);

    return elementLi;
  }

  returnTaskTegForProject() {
    let elementLi = document.createElement("li");
    elementLi.className = "list-group-item";

    let elementDivCard = document.createElement("div");
    elementDivCard.className = "card";

    let elementDivBody = document.createElement("div");
    elementDivBody.className = "card-body";

    let elementH5 = document.createElement("h5");
    elementH5.className = "card-title";
    elementH5.innerText = this.name;

    let tags = this.tags;
    if (this.tags != "---") {
      tags = "";
      this.tags.forEach((tag) => {
        tags += `#${tag} `;
      });
    }

    let priority;
    switch (this.priority) {
      case "hight":
        priority = "🥇";
        break;
      case "middle":
        priority = "🥈";
        break;
      case "low":
        priority = "🥉";
        break;
    }

    let elementP = document.createElement("p");
    elementP.className = "card-text";
    elementP.innerText = `Terms: ${
      this.terms.includes("T")
        ? new Date(this.terms).toLocaleString()
        : new Date(this.terms).toLocaleDateString()
    }
      Describe: ${this.describe}
      Tags: ${tags}
      Priority: ${priority}\n
      Created: ${this.creatingDate}`;

    let buttonAdd = document.createElement("button");
    buttonAdd.className = "btn btn-outline-primary";
    buttonAdd.innerText = "✅";

    elementLi.appendChild(elementDivCard).appendChild(elementDivBody);

    elementDivBody.appendChild(elementH5);
    elementDivBody.appendChild(elementP);
    elementDivBody.appendChild(buttonAdd);

    return elementLi;
  }
}

export default MyTask;
