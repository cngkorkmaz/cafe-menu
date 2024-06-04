export const elements = {
  menuArea: document.getElementById("menu-area"),
  buttonsArea: document.getElementById("buttons-area"),
  outlet: document.getElementById("outlet"),
};


//* Fiyat Hesaplama Fonksiyonu.Biz ekstradan fiyat hesaplaması yaptık.rasgele 15 ile çarptık.
export const calculatePrice = (price) => {
   let newPrice = price*15;
   newPrice = newPrice.toFixed(2);
   return newPrice
}