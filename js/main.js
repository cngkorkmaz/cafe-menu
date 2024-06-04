import { buttonsData, menu } from "./db.js";
import { calculatePrice, elements } from "./helpers.js";

//! Fonksiyonlar

function searchCategory(e) {
  //* Tıkladığımız butonun data özelliklerine eriştik ve bir değişkene aktardık.
  const category = e.target.dataset.category;

  //* Tüm dizi elemanlarından yalnızca kategori değeri butonun kategori ile eşleşirse bu ürünleri getir.
  const filteredMenu = menu.filter((item) => item.category === category);

  if (category === "all") {
    renderMenuItems(menu);
  } else {
    renderMenuItems(filteredMenu);
  }

  renderButtons(category);
}

//* Ekrana menu elemanlarını aktaracak fonksiyondur
function renderMenuItems(menuItems) {
  //* Gönderilen verileri dönüp her bir veri için a etiketi oluştur.
  let menuHTML = menuItems.map(
    (item) =>
      `
    <a
    id="card"
    href="/productDetail.html?id=${item.id}&category=${item.category}&price=${item.price}"

    class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2">
        <img class="rounded shadow" src="${item.img}">

        <div>
        <div class="d-flex justify-content-between align-items-center">
            <h5>${item.title}</h5>
            <p class="text-success">${calculatePrice(item.price)} ₺</p>
        </div>

        <p class="lead">
          ${item.desc}
        </p>
    </div>

    </a>

    `
  );
  menuHTML = menuHTML.join(""); // virgülleri yok ettik stringe çevirdik
  //* Oluşturduğumuz menuHTML değişkenini ekrana aktardık.
  elements.menuArea.innerHTML = menuHTML;
}

function renderButtons(active) {
  console.log(active);
  elements.buttonsArea.innerHTML = "";
  //* Yeni butonlar oluşturmak için buttonData içerisindeki verileri dönüp her bir veri için bir buton oluştururuz.
  buttonsData.forEach((btn) => {
    //* Her bir veri için bir HTML buton etiketi oluşturur.
    const buttonEle = document.createElement("button");
    //* Oluşturduğumuz butonlara class ekledik
    buttonEle.className = "btn btn-outline-dark filter-btn";
    //* Oluşturduğumuz butonun özelliklerini değiştirme
    buttonEle.textContent = btn.text;
    //* Oluşturduğumuz butonu hangi kategoride olduğu bilgisini buton elementine ekledik
    buttonEle.dataset.category = btn.value;
    //* Eğer ki active kategorisiyle buton eşleşirse
    if (btn.value === active) {
      buttonEle.classList.add("bg-dark", "text-light");
    }

    //* HTML'e gönderme
    elements.buttonsArea.appendChild(buttonEle);
  });
}

//! Olay İzleyicileri
//* Sayfa yüklendiği anda renderMenuItems fonksiyonunu çalıştır ve menu parametresini gönder. renderbuttons fonksiyonunu çalştır ve seçili olarak hepsi kategorsini parametre olarak gönder
//?ilk yöntem
// document.addEventListener("DOMContentLoaded", renderMenuItems(menu));
// document.addEventListener("DOMContentLoaded", renderButtons("all"));
//?ikinci yöntem
document.addEventListener("DOMContentLoaded", () => {
  renderButtons("all");
  renderMenuItems(menu);
});

//* Butonların bulunduğu alana tıklanıldığıda searchcategory fonksiyonunu çalıştır
elements.buttonsArea.addEventListener("click", searchCategory);
