//Instead of writing getElement every time, we call it display
const display = document.getElementById("display");

function appendToDisplay(input) {
  const operators = ["+", "-", "*", "/", "%", ",", "."];
  const lastChar = display.value.slice(-1);

  // arka arkaya operatör eklenmesini engelle
  if (operators.includes(lastChar) && operators.includes(input)) {
    return;
  }

  if (input === ".") {
    let lastNumber = display.value.split(/[\+\-\*\/\%]/).pop();
    //split: operatörler arası sayı gruplarını ayrıştırmayı sağladı.
    //pop: son sayı grubunu kontrol etmeyi sağladı.

    if (lastNumber.includes(".")) {
      return;
    }
  }

  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

function clearLastInput() {
  display.value = display.value.slice(0, -1);
  //slice : diziyi bölerek yeni dizi oluşturur (videoyu kliplere bölmek gibi galiba)
  //0. değerden --> son değerden bir eksik değere kadar gösteriyor.
}

function brackets() {
  const arr = display.value;
  const openCount = (arr.match(/\(/g) || []).length;
  const closeCount = (arr.match(/\)/g) || []).length;
  //   /.../ --> tanımın girildiği alan
  //   \( --> açma parantezini tanımlama için.    (.."/"..."\("..."/"..."g"..)
  //   g --> global. String içinde tüm eşleşmeleri içerir.
  // ya da : ["("] gibi string kullanılabilirmiş.
  if (openCount === closeCount) {
    //yani aslında ikisi de sıfırsa
    display.value += "(";
  } else {
    display.value += ")";
  }
}

function calculate() {
  try {
    const expression = display.value;
    //ekrandaki değeri expression değişkenine kaydet
    const result = math.evaluate(expression);
    //expressionda hesaplanan işlemin sonucu result değişkenine kaydet

    display.value = ""; //ekranı yeni işlem için hazırla (temizle)

    //add to historySide
    const li = document.createElement("li");
    li.textContent = `${expression} = ${result}`;
    // ${}: değişkenleri string şekilde koymayı sağlıyor.
    document.querySelector(".history").appendChild(li);
  } catch (error) {
    display.value = "Error";
  }
}

function clearHistory() {
  document.querySelector(".history").textContent = "";
}

// Klavyeden input dinleme
document.addEventListener("keydown", function (event) {
  const key = event.key; // basılan tuş

  if (!isNaN(key) || ["+", "-", "*", "/", "%", "."].includes(key)) {
    // "!isNaN" : input bir sayı mı?
    // veya + - * / % ,  operatörlerinden biri seçildiyse yap:

    event.preventDefault(); //iki kere yazmayı engelle
    appendToDisplay(key);
  }
  if (isNaN(key) && key !== "Enter" && key !== "Backspace") {
    event.preventDefault();
    return;
  }

  //virgüle basılırsa nokta görülsün
  if (key === ",") {
    appendToDisplay(".");
  }

  // Enter tuşu = sonucu hesapla
  if (key === "Enter") {
    calculate();
  }

  // Backspace = son girileni sil
  if (key === "Backspace") {
    clearLastInput();
  }
});
