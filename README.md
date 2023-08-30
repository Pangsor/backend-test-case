# backend-test-case

# ALGORITMA
1. Reverse
function reverseString(str) {
    let newStr = str.substring(0,str.length -1);
    return str.split("").reverse().join("");
}
const result = reverseString("NEGIE1") + "1";

2. Longest
const sentence = "Saya sangat senang mengerjakan soal algoritma"

function longest(sentence) {
    const myArray = sentence.split(" ");
    let newSentence="";
    for(let i in myArray){
        if(myArray[i].length > newSentence.length){
            newSentence = myArray[i];
        }
    }
    return newSentence;
}
const result = longest(sentence);

3. Array
let arrInput = ['xc', 'dz', 'bbb', 'dz','ac','ac']  
let arrQuery = ['bbb', 'ac', 'dz']  
let arrResult=[];
let count=0;
for(let q in arrQuery){
    for(let i in arrInput){
        if(arrQuery[q] == arrInput[i]){
            count += 1;
        }
    }
    arrResult.push(count)
    count=0;
}
console.log(arrResult);

4. Matrix
let matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]
let num1 = 0;
let num2 = 0;
let result;
for(let i in matrix){
    if(i == 0){
        num1 += matrix[i][0];
        num2 += matrix[i][2];
    }
    if(i == 1){
        num1 += matrix[i][1];
        num2 += matrix[i][1];
    }
    if(i == 2){
        num1 += matrix[i][2];
        num2 += matrix[i][0];
    }
}
result = num1 - num2;
console.log(result);