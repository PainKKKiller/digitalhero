// f([2, 3, 5, 8, 9, 1]) === 2

function f(arr) {
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            if ((arr[i] + arr[j]) === 10 && i !== j) {
                console.log(i, j, arr[i], arr[j]);
                counter++;
            }
        }
    }
    return counter;
}

console.log(f([2, 3, 5, 8, 9, 1]));