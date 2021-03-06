let cars = [
  {
    id: 1,
    name: "Lambo",
    price: 120000,
    img:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=689&q=80",
  },
  {
    id: 2,
    name: "Ferrari",
    price: 250000,
    img:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  },
  {
    id: 3,
    name: "Mers",
    price: 300000,
    img:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
  },
];
const toHTML = (car) => `

<div class="col">
  <div class="card">
    <img
      src="${car.img}"
      class="card-img-top"
      style="height: 400px"
      alt ="${car.img}"
    />
    <div class="card-body">
      <h5 class="card-title">${car.name}</h5>
      <a href="#" class="btn btn-primary" data-btn="price" data-id="${car.id}">See Price</a>
      <a href="#" class="btn btn-danger" data-btn="remove" data-id="${car.id}" >Delete</a>
    </div>
  </div>
</div>`;
function render() {
  const html = cars.map(toHTML).join("");
  document.querySelector("#cars").innerHTML = html;
}
render();
const modal = $.modal({
  title: "Price for car",
  closable: true,
  width: "400px",
  footerButtons: [
    {
      text: "Close",
      type: "primary",
      handler() {
        modal.close();
      },
    },
  ],
});

document.addEventListener("click", (e) => {
  e.preventDefault();
  const btnType = e.target.dataset.btn;
  const id = +e.target.dataset.id;
  const car = cars.find((f) => f.id === id);

  if (btnType === "price") {
    modal.setContent(
      `
        <p>Price for ${car.name} : <strong>${car.price}$</strong></p>
        `
    );
    modal.open();
  } else if (btnType === "remove") {
    $.confirm({
      title: "Are you sure?",
      content: ` <p>You want delete: <strong>${car.name}</strong></p>`,
    })
      .then(() => {
        console.log("Remove");
        cars = cars.filter((f) => f.id !== id);
        render();
      })
      .catch(() => {
        console.log("Cancel");
      });
  }
});
