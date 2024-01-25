// Get the table element

var numberOfColumns = 120
var numberOfRows = 80
var color = "#aabbcc"

cellCode = 'a'
colorCode = 'c'
var table = document.getElementById('board');

// let boardData = '<%= note.body %>';
console.log("base",boardData);



// Define the various modes :
const mode = {
    draw : true,
    erase : false,
    shapefill : false,

}


var colorBoard = new Array(numberOfRows)
.fill(0)
.map(() => new Array(numberOfColumns).fill(0)); 


// mainString = location.href
// substringToCheck = "item"
// if (mainString.indexOf(substringToCheck) === -1)
//  {
    
//  }

// console.log(colorBoard);

// colors array :
const colorsArray = [
    "#F5F5F5", // white
    '#ff0000', // Red
    '#ff7f00', // Orange
    '#ffff00', // Yellow
    '#80ff00', // Lime
    '#00ff00', // Green
    '#00ff80', // Teal
    '#00ffff', // Cyan
    '#007fff', // Sky Blue
    '#0000ff', // Blue
    '#7f00ff', // Purple
    '#ff00ff', // Magenta
    '#ff007f', // Pink
    '#ff8080', // Light Red
    '#ffbf80', // Light Orange
    '#ffff80', // Light Yellow
    '#c0ff80', // Light Lime
    '#80ffbf', // Light Teal
    '#000000', // Black
    '#8080ff', // Light Blue
    
];


// class for queue ds :
class Queue {
  constructor() {
    this.elements = {};
    this.front = 0;
    this.back = 0;
  }

  elementor(){
    return this.elements;
  }
  push(element) {
    this.elements[this.back] = element;
    this.back++;
  }
  pop() {
    const item = this.elements[this.front];
    delete this.elements[this.front];
    this.front++;
    return item;
  }
  peek() {
    return this.elements[this.front];
  }
   size() {
    return this.back - this.front;
  }
   empty() {
    return this.length === 0;
  }
}

// hide the textbox :
// const textbox = document.getElementById("body").style.display = "none";

// canvas table
function makeTable()
{
   
    
    for(i = 0 ; i < numberOfRows ; i++)
    {
        const newRow = document.createElement("tr")
        for(j = 0 ; j < numberOfColumns ; j++)
        {
            const newCell = document.createElement("td")

            var giveIdy = "" + i
            var giveIdx = "" + j
           
            newCell.id = cellCode + giveIdy + "-" +giveIdx ;
            

            newRow.appendChild(newCell) ;
        }
        table.appendChild(newRow)
    }


}


// create an Id for drawing board :
function makeId(i,j)
{
  return cellCode + i + "-" + j ;
}


// table for color palette :
function colorTable()
{
   let colorTable = document.getElementById("colorPalette")
    let index = 0 ;
    for( let i = 0 ; i < 4 ; i++)
    {
        const newRow = document.createElement("tr")
        for(let j = 0 ; j < 5 ; j++)
        {
            const newCell = document.createElement("td")

            newCell.id = colorCode + index ;
            
           let colorFilled = colorsArray[index++] ;
           console.log(colorFilled);
           newCell.style.backgroundColor = colorFilled;
           

            newRow.appendChild(newCell) ;
        }
        colorTable.appendChild(newRow)
    }


}


makeTable() ;
colorTable();

if(boardData)
{
  
  for(x in boardData)
  {
    [i,j,cellColorCode] = boardData[x]
    colorBoard[i][j] = cellColorCode

    let id = makeId(i,j) ;
    document.getElementById(id).style.backgroundColor = colorsArray[cellColorCode]
  }
}

const myTable = document.getElementById("board");
const cells = myTable.getElementsByTagName("td");

let isMouseDown = false;

myTable.addEventListener("mousedown", (event) => {
  isMouseDown = true;

  if(event.target.tagName==="TD" &&mode.shapefill)
  {
    let id = event.target.id;
    let [i,j] = getIndices(id) ;
    let clickedColorCode = colorBoard[i][j] ;
    
     if(clickedColorCode!= colorsArray.indexOf(rgbToHex(color)))
    fillTheShape(i,j,clickedColorCode)

  }
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

myTable.addEventListener("mouseover", (event) => {
  if (isMouseDown && event.target.tagName === "TD" && mode.draw) {
    const cell = event.target;
    const id = event.target.id ;

    const [i,j] = getIndices(id) ;

    colorBoard[i][j] = colorsArray.indexOf(rgbToHex(color));
    cell.style.backgroundColor = color;

  }
});

// select the color from the palatte : 
document.getElementById('colorPalette').addEventListener('click', function(event) {
    if (event.target.tagName === 'TD') {
        // var selectedColor = getComputedStyle(event.target).backgroundColor;
        // selectedColorElement.textContent = selectedColor;
        cellId = event.target.id ;
        let targetElement = document.getElementById(cellId)
        color = targetElement.style.backgroundColor;
        let colorBox = document.getElementById("color-box")
        colorBox.style.backgroundColor = color ;
        

    }
});

// gives the indices using id :
function getIndices(x)
{
  a = "" ;
  b = "" ;
  next = false ;
  for(i = 1 ; i < x.length ; i++)
  {
    if(x[i] != '-' && !next)
    {
     a += x[i] ;
    }
    else if(x[i] == '-')
    {
      next = true ;
    }
    else if(next)
    {
      b += x[i] ;
    }
  }

  // console.log([a,b]) ;
  return [parseInt(a),parseInt(b)] ;
}

function rgbToHex(rgbString) {
  const rgbValues = rgbString.match(/\d+/g);

  if (!rgbValues || rgbValues.length !== 3) {
    throw new Error('Invalid RGB string format');
  }

  const toHex = (value) => {
    const hex = parseInt(value, 10).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const [r, g, b] = rgbValues.map(Number);
  const hexR = toHex(r);
  const hexG = toHex(g);
  const hexB = toHex(b);

  return '#' + hexR + hexG + hexB;
}



// deal with the cells here ... 


function fillTheShape(i,j, cellColorCode)
{
  let q = new Queue() ;

  let indexOfColorToFill = colorsArray.indexOf(rgbToHex(color)) ;
  console.log("color:",color,"->",indexOfColorToFill);

   q.push([i,j]) ;

    console.log(colorBoard);
   while(q.empty() == false && q.peek())
   {
    console.log(q.peek());
    let [I,J] =q.peek() ;

    colorBoard[I][J] = indexOfColorToFill ;
    document.getElementById(makeId(I,J)).style.backgroundColor = color ;

    q.pop();

    console.log("running...");

      // top :
     if(I > 0  && colorBoard[I-1][J] == cellColorCode)
     {
       colorBoard[I-1][J] = indexOfColorToFill ;
       getId = makeId(I-1,J) ;
       document.getElementById(getId).style.backgroundColor = color ;
       q.push([I-1,J]) ;
     }

     // bottom :
     if(I < numberOfRows-1  && colorBoard[I+1][J] == cellColorCode)
     {
       colorBoard[I+1][J] = indexOfColorToFill ;
       getId = makeId(I+1,J) ;
       document.getElementById(getId).style.backgroundColor = color ;
       q.push([I+1,J]) ;
     }

     // right:
     if(J < numberOfColumns-1  && colorBoard[I][J+1] == cellColorCode)
     {
       colorBoard[I][J+1] = indexOfColorToFill ;
       getId = makeId(I,J+1) ;
       document.getElementById(getId).style.backgroundColor = color ;
       q.push([I,J+1]) ;
     }

     // left:
     if(J > 0  && colorBoard[I][J-1] == cellColorCode)
     {
       colorBoard[I][J-1] = indexOfColorToFill ;
       getId = makeId(I,J-1) ;
       document.getElementById(getId).style.backgroundColor = color ;
       q.push([I,J-1]) ;
     }


     
   }

   console.log(colorBoard);
}





////////////////// Last part :
document.querySelector("#submit").addEventListener('click',(e)=>{
 
  const myArray = []
  // e.preventDefault()
  for(let i = 0 ; i < numberOfRows; i++)
  {
    for(let j = 0 ; j < numberOfColumns; j++)
    {
      if(colorBoard[i][j])
      {
        // myArray.push({x : i,y: j,color : colorBoard[i][j]});
        myArray.push([i,j,colorBoard[i][j]]);
      }
    }
  }
  originalData = JSON.stringify(myArray);
//   const compressedData = LZString.compressToBase64(originalData);
  document.getElementById("body").value = originalData
})


// control buttons code 
let draw = document.getElementById("draw") ;
draw.addEventListener('click',()=>{
  mode.draw= true ;
  mode.shapefill = false ;
  console.log("draw");
  
})

let fillShape = document.getElementById("filler") ;
fillShape.addEventListener('click',()=>{
  mode.draw= false ;
  mode.shapefill = true ;
  console.log("fill");
})

let reset = document.getElementById("cleaner") ;
reset.addEventListener('click',()=>{
  console.log("clear");
  mode.draw = false ;
  mode.shapefill = false ;

  for(let i=0 ; i < numberOfRows ; i++)
  {
    for(let j = 0 ; j < numberOfColumns ; j++)
    {
      colorBoard[i][j] = 0 ;
     let getId = makeId(i,j) ;
      document.getElementById(getId).style.backgroundColor = colorsArray[0] ;
    }
  }
  
})


// CONVERTING THE CANVAS TO AN IMAGE

function htmlTableToImage() {
  const table = document.getElementById("board");

  html2canvas(table).then(function(canvas) {
      canvas.toBlob(function(blob) {
          saveAs(blob, 'PaintBrush.png');
      });
  });
}

document.getElementById("download-image").addEventListener('click',htmlTableToImage) ;