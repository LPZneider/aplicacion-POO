class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UI {
  addProduct(product) {
    const $productList = document.getElementById("product-list");
    const $elemet = document.createElement("div");
    $elemet.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body">
                <strong>Product</strong>: ${product.name}
                <strong>Product Price</strong>: ${product.price}
                <strong>Product year</strong>: ${product.year}
                <a href="#" class="btn btn-danger" name="delete">Delete</a>
            </div>
        </div>
    `;
    $productList.appendChild($elemet);
    this.resetform();
  }

  resetform() {
    document.getElementById("product-form").reset();
  }

  deleteProduct(elemet) {
    if(elemet.name === "delete"){
        elemet.parentElement.parentElement.parentElement.remove();
    }
  }
  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass}`;
    div.appendChild(document.createTextNode(message))
    // showing in DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#App")
    container.insertBefore(div, app);
    setTimeout(()=>{
        div.remove();
    }, 1500)

  }
}
// dom eventos
document
  .getElementById("product-form")
  .addEventListener("submit", function (e) {
    const $name = document.getElementById("name").value,
      $price = document.getElementById("price").value,
      $year = document.getElementById("year").value;

    console.log($name, $price, $year);

    const product = new Product($name, $price, $year);
    const ui = new UI();

    if($name === "" || $price === "" || $year === ""){
        return ui.showMessage('complete fields PLEASE', "danger")
    }
    ui.addProduct(product);

    ui.showMessage('product added successfully', 'success')

    e.preventDefault();
  });

document
  .getElementById("product-list")
  .addEventListener("click", function (e) {
    const ui = new UI();
    ui.deleteProduct(e.target)
    ui.showMessage('product deleted successfully','danger')
  });
