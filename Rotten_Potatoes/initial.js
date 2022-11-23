const arr = [ 1,2,3,4,5,6,7,8,9,10 ]

const sumOfArr = (arr) => {
    const newArr = arr.reduce((num1, num2) => 
        num1 + num2);
    return newArr
};

console.log(sumOfArr(arr));
