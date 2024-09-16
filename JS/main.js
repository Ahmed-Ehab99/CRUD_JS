let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCateg = document.getElementById("productCateg");
let productDesc = document.getElementById("productDesc");
let productCount = document.getElementById("productCount");
let update = document.getElementById("update");
let productContainer;
let productType = "addProduct";
let temp;
// ======================================================
// CHECK ABOUT LOCAL STORAGE
if (localStorage.getItem("ourProducts") == null) {
  productContainer = [];
} else {
  productContainer = JSON.parse(localStorage.getItem("ourProducts"));
  displayProduct();
}
// ======================================================
// ADD PRODUCT
function addProduct() {
  let product = {
    pName: productName.value,
    price: productPrice.value,
    categ: productCateg.value,
    desc: productDesc.value,
    count: productCount.value,
  };
  if (
    productName.value != "" &&
    productPrice.value != "" &&
    productCateg.value != "" &&
    productDesc.value != "" &&
    productCount.value != ""
  ) {
    if (productType === "addProduct") {
      if (product.count <= 0) {
        alert("Please Enter Number Greater Than 0");
        productCount.value = "";
      } else {
        productContainer.push(product);
        clearValue();
      }
    } else {
      productContainer[temp] = product;
      productType = "addProduct";
      update.innerHTML = "Add Product";
      clearValue();
    }
  } else {
    swal("Please Fill in the Inputs");
  }
  localStorage.setItem("ourProducts", JSON.stringify(productContainer));
  displayProduct();
}
// ======================================================
// DISPLAY PRODUCT
function displayProduct() {
  let productList1 = "";
  for (let i = 0; i < productContainer.length; i++) {
    productList1 += `<tr>
            <td>${i + 1}</td>
            <td>${productContainer[i].pName.toLowerCase()}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].categ.toLowerCase()}</td>
            <td>${productContainer[i].desc.toLowerCase()}</td>
            <td>${productContainer[i].count}</td>
            <td><button class="btn btn-danger" onclick="deleteRow(${i})"><i class="fa-solid fa-trash icon"></i></button></td>
            <td><button class="btn btn-warning" onclick="updateRow(${i})"><i class="fa-solid fa-pencil icon"></i></button></td>
        </tr>`;
  }
  document.getElementById("tBody").innerHTML = productList1;
}
// ======================================================
// CLEAR VALUE
function clearValue() {
  productName.value = "";
  productPrice.value = "";
  productCateg.value = "";
  productDesc.value = "";
  productCount.value = "";
}
// ======================================================
// DELETE ALL
function deleteAll() {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to See This Products!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Poof! All Products Have been deleted!", {
        icon: "success",
      });
      productContainer.splice(0);
      localStorage.setItem("ourProducts", JSON.stringify(productContainer));
      displayProduct();
    } else {
      swal("Your Products is safe!");
    }
  });
}
// ======================================================
// DELETE ROW
function deleteRow(i) {
  productContainer[i].count--;
  if (productContainer[i].count < 1) {
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover ${productContainer[i].pName} file!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal(`Poof! ${productContainer[i].pName} has been deleted!`, {
          icon: "success",
        });
        productContainer.splice(i, 1);
        localStorage.setItem("ourProducts", JSON.stringify(productContainer));
        displayProduct();
      } else {
        swal(`${productContainer[i].pName} is safe!`);
      }
    });
  }
  localStorage.setItem("ourProducts", JSON.stringify(productContainer));
  displayProduct();
}
// ======================================================
// UPDATE ROW
function updateRow(i) {
  productName.value = productContainer[i].pName;
  productPrice.value = productContainer[i].price;
  productCateg.value = productContainer[i].categ;
  productDesc.value = productContainer[i].desc;
  productCount.value = productContainer[i].count;
  update.innerHTML = "Update Product";
  productType = "updateProduct";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// ======================================================
// SEARCH ABOUT PRODUCT
function searchProduct(s) {
  let productList2 = "";
  for (let i = 0; i < productContainer.length; i++) {
    if (productContainer[i].pName.startsWith(s.trim().toLowerCase()) == true) {
      productList2 += `<tr>
        <td>${i + 1}</td>
        <td>${productContainer[i].pName}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].categ}</td>
        <td>${productContainer[i].desc}</td>
        <td>${productContainer[i].count}</td>
        <td><button class="btn btn-danger" onclick="deleteRow(${i})">Delete</button></td>
        <td><button class="btn btn-warning" onclick="updateRow(${i})">Update</button></td>
        </tr>`;
    }
  }
  document.getElementById("tBody").innerHTML = productList2;
}
