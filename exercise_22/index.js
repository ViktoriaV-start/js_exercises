let j = 0;

// ВТОРОЙ ВАРИАНТ
function foo1() {
      
  try {
    console.log(j);
    document.write('<div>New</div>');
    j++;
    foo1();
  } catch(er) {
    console.log(er);
  }
}

//foo1();


// ТРЕТИЙ ВАРИАНТ
function foo2() {
    document.write('1');
    console.log(j++);
    foo2();
}

//foo2();

// ЧЕТВЕРТЫЙ ВАРИАНТ
function foo3() {
  let b = 3;
  let c = 4;
  let d = 5;
  document.write('1');
  console.log(j++);
  foo3();
}

foo3();