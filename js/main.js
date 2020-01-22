var algo = "";
var animationSteps = new Array();
var step = 0;
var inputs = document.getElementsByClassName("nav")[0].getElementsByTagName("li");

makeArr();

function updateAlgo(al) {
  algo = al;

  var choices = document.getElementsByClassName("algoChoice");

  for (var i = 0; i < choices.length; i++) {
    if (choices[i].innerHTML === this.algo) {
      if (!choices[i].className.includes("active")) {
        choices[i].className += " active";
      }
    } else {
      if (choices[i].className.includes("active")) {
        choices[i].className = choices[i].className.slice(0, -7);
      }
    }
  }
}

function makeArr() {
  var size = document.getElementById("sizeControl").value;
  var arr = new Array(parseInt(size));

  var i;
  for (i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * 500) + 8;
  }

  var ul = document.createElement("ul");
  ul.style.backgroundColor = "#ddd";
  ul.style.border = "none";
  var li;
  var text;

  for (i = 0; i < arr.length; i++) {
    li = document.createElement("li");
    li.style.display = 'inline-block';
    li.style.height = arr[i] + "px";
    li.style.width = parseInt(500 / size) + "px";
    li.style.backgroundColor = "lightskyblue";
    li.style.margin = "2px";
    li.style.padding = "0px";
    li.data = arr[i];
    ul.appendChild(li);
  }

  var canvas = document.getElementById("canvas");
  canvas.replaceChild(ul, canvas.childNodes[0]);
}

function sort() {
  this.animationSteps = new Array();
  this.step = 0;

  switch(algo) {
    case "Quick Sort":
      quickSort();
      break;
    case "Merge Sort":
      mergeSort();
      break;
    case "Heap Sort":
      heapSort();
      break;
    case "Insertion Sort":
      insertionSort();
      break;
    default:
      insertionSort();
  }

  this.disableInputs();
  this.animate();
}

function quickSort() {
  var arr = document.getElementById("canvas").childNodes[0];
  var arrSize = arr.getElementsByTagName("li").length;

  qSort(arr, 0, arrSize - 1);
}

function qSort(arr, low, high) {
  if (low < high) {
    var pi = partition(arr, low, high);

    qSort(arr, low, pi - 1);
    qSort(arr, pi + 1, high);
  }
}

function partition(arr, low, high) {
  var pivot = parseInt(arr.childNodes[high].data);
  this.animationSteps.push({action: "colorChange", color: "red", position: high});
  var i = low - 1;

  for (var j = low; j < high; j++) {
    this.animationSteps.push({action: "colorChange", color: "yellow", position: j});

    if (parseInt(arr.childNodes[j].data) <= pivot) {
      i++;

      var tmp = arr.childNodes[i].data;

      this.animationSteps.push({action: "dataChange", data: arr.childNodes[j].data, position: i});
      this.animationSteps.push({action: "dataChange", data: tmp, position: j});

      arr.childNodes[i].data = arr.childNodes[j].data;
      arr.childNodes[j].data = tmp;
    }

    this.animationSteps.push({action: "colorChange", color: "lightskyblue", position: j});
  }

  var tmp = arr.childNodes[i + 1].data;

  this.animationSteps.push({action: "dataChange", data: arr.childNodes[high].data, position: i + 1});
  this.animationSteps.push({action: "dataChange", data: tmp, position: high});

  arr.childNodes[i + 1].data = arr.childNodes[high].data;
  arr.childNodes[high].data = tmp;

  this.animationSteps.push({action: "colorChange", color: "lightskyblue", position: high});
  return i + 1;
}

function mergeSort() {
  var arr = document.getElementById("canvas").childNodes[0];
  var arrSize = arr.getElementsByTagName("li").length;

  mSort(arr, 0, arrSize - 1);
}

function mSort(arr, l, r) {
  if (l < r) {
    var m = Math.floor((l + r) / 2);

    this.animationSteps.push({action: "colorChange", color: "red", position: m});

    mSort(arr, l, m);
    mSort(arr, m + 1, r);

    merge(arr, l, m, r);

    this.animationSteps.push({action: "colorChange", color: "lightskyblue", position: m});
  }
}

function merge(arr, l, m, r) {
  var n1 = m - l + 1;
  var n2 = r - m;

  var arrTmp1 = new Array(n1);
  var arrTmp2 = new Array(n2);

  for (var i = 0; i < n1; i++) {
    arrTmp1[i] = parseInt(arr.childNodes[l + i].data);
  }

  for (var j = 0; j < n2; j++) {
    arrTmp2[j] = parseInt(arr.childNodes[m + 1 + j].data);
  }

  var k = 0;
  var j = 0;
  var z = l;

  while (k < n1 && j < n2) {
    if (arrTmp1[k] < arrTmp2[j]) {
      arr.childNodes[z].data = arrTmp1[k];

      this.animationSteps.push({action: "colorChange", color: "yellow", position: z});

      this.animationSteps.push({action: "dataChange", data: arrTmp1[k], position: z});

      this.animationSteps.push({action: "colorChange", color: "lightskyblue", position: z});
      k++;
    } else {
      arr.childNodes[z].data = arrTmp2[j];

      this.animationSteps.push({action: "colorChange", color: "yellow", position: z});

      this.animationSteps.push({action: "dataChange", data: arrTmp2[j], position: z});

      this.animationSteps.push({action: "colorChange", color: "lightskyblue", position: z});
      j++;
    }

    z++;
  }

  while(k < n1) {
    arr.childNodes[z].data = arrTmp1[k];

    this.animationSteps.push({action: "colorChange", color: "yellow", position: z});

    this.animationSteps.push({action: "dataChange", data: arrTmp1[k], position: z});

    this.animationSteps.push({action: "colorChange", color: "lightskyblue", position: z});
    k++;
    z++;
  }

  while(j < n2) {
    arr.childNodes[z].data = arrTmp2[j];

    this.animationSteps.push({action: "colorChange", color: "yellow", position: z});

    this.animationSteps.push({action: "dataChange", data: arrTmp2[j], position: z});

    this.animationSteps.push({action: "colorChange", color: "lightskyblue", position: z});
    j++;
    z++;
  }
}

function heapSort() {
  var arr = document.getElementById("canvas").childNodes[0];
  var n = arr.getElementsByTagName("li").length;
  var i = Math.floor((n / 2) - 1);

  buildMinHeap(arr, n, i);
  hSort(arr, n);
}

function buildMinHeap(arr, n, i) {
  for (var j = i; j >= 0; j--) {
    heapify(arr, n, j);
  }
}

function hSort(arr, n) {
  for (var i = n - 1; i >= 0; i--) {
    var tmp = arr.childNodes[0].data;
    arr.childNodes[0].data = arr.childNodes[i].data;
    arr.childNodes[i].data = tmp;

    this.animationSteps.push({action: "colorChange", color: "red", position: i});

    this.animationSteps.push({action: "dataChange", data: arr.childNodes[i].data, position: 0});
    this.animationSteps.push({action: "dataChange", data: tmp, position: i});

    heapify(arr, i, 0);
    this.animationSteps.push({action: "colorChange", color: "lightskyblue", position: i});
  }
}

function heapify(arr, n, i) {
  var largest = i;
  var l = 2 * i + 1;
  var r = l + 1;

  if (l < n && parseInt(arr.childNodes[l].data) > parseInt(arr.childNodes[largest].data))
        largest = l;

  if (r < n && parseInt(arr.childNodes[r].data) > parseInt(arr.childNodes[largest].data))
      largest = r;

  if (largest != i)
  {
      this.animationSteps.push({action: "colorChange", color: "yellow", position: largest});

      var tmp = arr.childNodes[largest].data;
      arr.childNodes[largest].data = arr.childNodes[i].data;
      arr.childNodes[i].data = tmp;

      this.animationSteps.push({action: "dataChange", data: arr.childNodes[i].data, position: largest});
      this.animationSteps.push({action: "dataChange", data: tmp, position: i});

      this.animationSteps.push({action: "colorChange", color: "lightskyblue", position: largest});

      heapify(arr, n, largest);
  }
}

function insertionSort() {
  var arr = document.getElementById("canvas").childNodes[0];
  var arrSize = arr.getElementsByTagName("li").length;
  var i;
  var j;
  var k;
  var tmp;

  for (i = 1; i < arrSize; i++) {
    this.animationSteps.push({action: "colorChange", color: "red", position: i});
    j = i - 1;

    while (j >= 0 && parseInt(arr.childNodes[i].data) < parseInt(arr.childNodes[j].data)) {
      this.animationSteps.push({action: "colorChange", color: "yellow", position: j});
      this.animationSteps.push({action: "colorChange", color: "lightskyblue", position: j});

      j--;
    }

    if (j + 1 < i) {
      tmp = arr.childNodes[i].data;

      for (k = i - 1; k > j; k--) {
        this.animationSteps.push({action: "dataChange", data: arr.childNodes[k].data, position: k + 1});

        arr.childNodes[k + 1].data = arr.childNodes[k].data;
      }

      this.animationSteps.push({action: "dataChange", data: tmp, position: j + 1});

      arr.childNodes[j + 1].data = tmp;
    }

    this.animationSteps.push({action: "colorChange", color: "lightskyblue", position: i});
  }
}

function animate() {
  var intervalID = setInterval(function(step) {
    var arr = document.getElementById("canvas").childNodes[0];

    if(this.step < this.animationSteps.length) {
      switch (this.animationSteps[this.step].action) {
        case "dataChange":
          arr.childNodes[this.animationSteps[this.step].position].data = this.animationSteps[this.step].data;
          arr.childNodes[this.animationSteps[this.step].position].style.height = this.animationSteps[this.step].data + "px";
        case "colorChange":
          //console.log(animationSteps[i].position);
          arr.childNodes[this.animationSteps[this.step].position].style.backgroundColor = this.animationSteps[this.step].color;
        default:
          break;
      }
    }

    if (this.step >= this.animationSteps.length) {
      this.enableInputs();
      clearInterval(intervalID);
    }

    this.step++;
  }, 1000 / parseInt(document.getElementById("sizeControl").value));
}

function disableInputs() {
  for (var i = 0; i < inputs.length; i++) {
    this.inputs[i].className += " red";
    this.inputs[i].style.pointerEvents = "none";
  }
}

function enableInputs() {
  for (var i = 0; i < inputs.length; i++) {
    this.inputs[i].className = inputs[i].className.slice(0, -4);
    this.inputs[i].style.pointerEvents = "auto";
  }
}
