//her seferinde getElement yazmak yerine "display" değişkenine atarak sadece display diye sesleneceğiz.
const display = document.getElementById("display");

function appendToDisplay(input) {
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
    display.value = eval(display.value); // işlemi yazdırırsan işlemden tekrar işlem yazmazsın.
  } catch (error) {
    display.value = "Error";
  }
}
