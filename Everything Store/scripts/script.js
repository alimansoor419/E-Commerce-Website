// onhover display Product options

// text slide up for toolbar

const txts = document.querySelector(".animate-text").children,
  txtsLen = txts.length;
let index = 0;
const textInTimer = 3000,
  textOutTimer = 2800;

function animateText() {
  for (let i = 0; i < txtsLen; i++) {
    txts[i].classList.remove("text-in", "text-out");
  }
  txts[index].classList.add("text-in");

  setTimeout(function () {
    txts[index].classList.add("text-out");
  }, textOutTimer);

  setTimeout(function () {
    if (index == txtsLen - 1) {
      index = 0;
    } else {
      index++;
    }
    animateText();
  }, textInTimer);
}
animateText();

// Popup Functionality
let popup_container = document.querySelector(".popup-container");
window.onload = function () {
  popup_container.style.display = "flex";
};
popup_container.onclick = function () {
  popup_container.style.display = "none";
};
let popup_close = document.querySelector(".close-popup");
popup_close.onclick = function () {
  popup_container.style.display = "none";
};

// Drop down language
let options = document.querySelector(".options");
let lang_options = document.querySelector(".menu");
let lang_options_img = lang_options.querySelector("img");
lang_options_img.onclick = function () {
  if (options.style.display === "none") {
    options.style.display = "block";
  } else {
    options.style.display = "none";
  }
};
// dropdown currency

// drop down display " Home"
let home = document.querySelector(".header-nav-home");
let home_dropdown = document.querySelector(".home-dropodown");
home.addEventListener("mouseover", function handleMouseOver() {
  home_dropdown.style.display = "block";
});

home.addEventListener("mouseout", function handleMouseOut() {
  home_dropdown.style.display = "none";
});
home_dropdown.addEventListener("mouseover", function handleMouseOver() {
  home_dropdown.style.display = "block";
});
home_dropdown.addEventListener("mouseout", function handleMouseOut() {
  home_dropdown.style.display = "none";
});
// drop down display " blog"
let blog = document.querySelector(".header-nav-blog");
let blog_dropdown = document.querySelector(".blog-dropdown");

blog.addEventListener("mouseover", function handleMouseOver() {
  blog_dropdown.style.display = "block";
});
blog.addEventListener("mouseout", function handleMouseOut() {
  blog_dropdown.style.display = "none";
});
blog_dropdown.addEventListener("mouseover", function handleMouseOut() {
  blog_dropdown.style.display = "block";
});
blog_dropdown.addEventListener("mouseout", function handleMouseOut() {
  blog_dropdown.style.display = "none";
});
// Drop down display "shop"
let shop = document.querySelector(".header-nav-shop");
let shop_dropdown = document.querySelector(".shop-dropdown");

shop.addEventListener("mouseover", function handleMouseOver() {
  shop_dropdown.style.display = "block";
});
shop.addEventListener("mouseout", function handleMouseOut() {
  shop_dropdown.style.display = "none";
});
shop_dropdown.addEventListener("mouseover", function handleMouseOut() {
  shop_dropdown.style.display = "block";
});
shop_dropdown.addEventListener("mouseout", function handleMouseOut() {
  shop_dropdown.style.display = "none";
});
// Drop down display "mega Menu"
let mega = document.querySelector(".header-nav-megaMenu");
let mega_dropdown = document.querySelector(".mega-menu");

mega.addEventListener("mouseover", function handleMouseOver() {
  mega_dropdown.style.display = "flex";
});
mega.addEventListener("mouseout", function handleMouseOut() {
  mega_dropdown.style.display = "none";
});
mega_dropdown.addEventListener("mouseover", function handleMouseOut() {
  mega_dropdown.style.display = "flex";
});
mega_dropdown.addEventListener("mouseout", function handleMouseOut() {
  mega_dropdown.style.display = "none";
});

// Product Card Options
let product_card = document.querySelector(".product-card");
let card_options = document.querySelector(".card-options");
card_options.style.display = "none";

// Populate data on the page featured
var productContainer = document.querySelector(".popular-products-cards");

let URL = "http://localhost:3000/products?_page=1&_limit=8";
fetchp(URL).then((data) => {
  productContainer.innerHTML = "";
  data.forEach((element) => {
    var stock = "";
    if (element.quantity === 0) {
      stock = "Out of Stock";
    } else {
      stock = "In Stock";
    }
    var newprice = (2 * element.price) / 100;
    newprice = element.price - newprice;
    var productCard = `
    <div class="product-card" ">
    <div class="image-wrapper">
        <img src="${element.thumbnail}"
            alt="bitcoin">
    </div>
    <div class="description relative-left-8">
        <a href="#"> ${element.title} </a>, <a href="#">${element.category}</a>, <a href="#">${element.brand}</a>, <a
            href="#"></a>
    </div>
    <div class="instock relative-left-8">
        <span>${stock}(${element.quantity})</span>
    </div>
    <div class="product-name relative-left-8">
        <a href="#">${element.title}</a href="#">
    </div>
    <div class="stars relative-left-8">
        <span style="font-size: 16px;" class="material-symbols-outlined ">star</span>
        <span style="font-size: 16px;" class="material-symbols-outlined ">star</span>
        <span style="font-size: 16px;" class="material-symbols-outlined ">star</span>
        <span style="font-size: 16px;" class="material-symbols-outlined ">star</span>
        <span style="font-size: 16px;" class="material-symbols-outlined ">star</span>
    </div>
    <div class="price relative-left-8"><span class="newprice">$${newprice}</span><s class="oldprice">$${element.price}</s></div>
    <div class="add-tocart relative-left-8" onclick ="addToWishlist(event, '${element.id}')">
        <button>Add to cart</button>
    </div>
    <div class="card-options">
        <div class="options-style" onclick ="addToWishlist(event, '${element.id}')">
            <span class="material-symbols-outlined" >
                favorite
            </span>
        </div>
        <div class="options-style">
            <span class="material-symbols-outlined">
                compare_arrows
            </span>
        </div>
        <div class="options-style">
            <span class="material-symbols-outlined">
                visibility
            </span>
        </div>
    </div>
</div>
    `;
    productContainer.innerHTML += productCard;
  });
});

//wishlist badge update
let wishListBadge = document.querySelector(".badge");
fetchp(`http://localhost:3000/wishlist`).then((data) => {
  console.log(data.length);
  wishListBadge.innerHTML = data.length;
});
// add to wishlist
function addToWishlist(event, itemId) {
  let obj = {
    Productid: itemId,
  };
  let link = `http://localhost:3000/wishlist`;
  fetchp(`http://localhost:3000/wishlist?Productid_like=${itemId}`).then(
    (data) => {
      console.log(data);
      console.log(data.length);
      if (data.length === 0) {
        Post(link, obj).then((data) => {
          console.log("done");
          //wishlist badge update
          fetchp(`http://localhost:3000/wishlist`).then((data) => {
            console.log(data.length);
            wishListBadge.innerHTML = data.length;
          });
        });
      }

      data.forEach((element) => {
        let IDfromWishlist = element.id;
        if (data.length !== 0) {
          fetch(`http://localhost:3000/wishlist/${IDfromWishlist}`, {
            method: "DELETE",
          })
            .then((e) => e.json)
            .then((e) => console.log(e));

          //wishlist badge update
          fetchp(`http://localhost:3000/wishlist`).then((data) => {
            console.log(data.length);
            wishListBadge.innerHTML = data.length;
          });
        }
      });
    }
  );

  event.preventDefault();
  console.log(itemId);
}

// Async function
async function fetchp(url) {
  let response = await fetch(url);
  let responsedata = await response.json();
  return responsedata;
}

// Post function
async function Post(link, obj) {
  try {
    const response = await fetch(link, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: { "content-type": "application/json; charset=UTF-8" },
    });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}
//display wishlist on click
let wishlist_container = document.querySelector(".wishlist-container");
let wishlist = document.querySelector(".wishlist");
wishlist.onclick = function showishlist() {
  wishlist_container.style.display = "flex";
};
let wishlistclose = document.querySelector(".wishlist-close");
wishlistclose.onclick = function closewishlist() {
  wishlist_container.style.display = "none";
};

// Populate wishlist card
let wishlist_product_container = document.querySelector(".wishlist-products");
fetchp(`http://localhost:3000/wishlist`).then((data) => {
  data.forEach((element) => {
    fetchp(`http://localhost:3000/products?id=${element.Productid}`).then(
      (data) => {
        data.forEach((element) => {
          if (element.stock > 0) {
            var stock_avialable = "In Stock";
          } else {
            stock_avialable = "Out of Stock";
          }
          wishlist_product_container.innerHTML += `    <div style="width: 100%;display: flex; ">
          <div style="width: 35.7%;padding-left: 2%;display: flex;justify-content: space-around;">
              <div>
                  <img src="${element.thumbnail}" alt="" style="width:70px;height: 70px;">
              </div>
              <div style="padding-left: 10px">
                  <span
                      style="font-family: Quicksand, sans-serif; font-size: px;color:#3bb77e;-webkit-text-stroke: thin;">${element.title}</span>
              </div>
          </div>
          <div style="width: 21%;"><span
                  style="font-family: Quicksand,sans-serif;font-size: 26px;color:#3bb77e;-webkit-text-stroke: thin;margin: 0 5px;">
                  $${element.price}</span>
              <s
                  style="font-family: Quicksand,sans-serif;font-size: 16px;color:#b2b8b9;-webkit-text-stroke: thin;">$40.3</s>
          </div>
          <div style="width: 21%;"><span
                  style="background: #def9ec;font-family: Quicksand,sans-serif;font-size: 14px;color:#3bb77e;border-radius: 5px; -webkit-text-stroke: thin;padding: 8px; ">
                  ${stock_avialable}</span>
          </div>
          <div style="width: 21%;"> <button
                  style="    width: 130px;height: 35px;background: #def9ec;border: none;border-radius: 5px;color: #3bb77e;">Add
                  to cart</button><span class="material-symbols-outlined">
                  delete
              </span></div>
      </div>`;
        });
      }
    );
  });
});

// slide down bar
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 260
  ) {
    document.getElementById("slide_down_navbar").style.top = "0";
  } else {
    document.getElementById("slide_down_navbar").style.top = "-50px";
  }
}

// fetchp(`http://localhost:3000/wishlist`).then((data) => {
//   data.forEach((element) => {
//     wishlist_container.innerHTML = "";

//     fetchp(`http://localhost:3000/products?id=${element.Productid}`).then(
//       (data) => {
//         wishlist_container.innerHTML = ``;
//       }
//     );
//   });
//   console.log(data);
// });

// add to cart

// console.log(home.style);
// scroll tool bar
