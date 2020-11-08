console.log('Lab 5 script');

const arr = [];

for (let i = 0; i < 1000; i++) {
    arr.push(Math.floor(Math.random()*501));
}
console.log(JSON.stringify(arr));

const maxVal = arr.reduce((prevMax, cur) => cur > prevMax ? cur : prevMax, -1);
const minVal = arr.reduce((prevMin, cur) => cur < prevMin ? cur : prevMin, 1e3);
console.log(`Max value: ${maxVal}`);
console.log(`Min value: ${minVal}`);

function quickSort(arr) {
    arr = arr.slice();

    function _quickSortRecursive(start, end) {
        if (start >= end) { return; }

        const pivot = arr[Math.round((start + end)/2)];
        
        let i = start, j = end;
        while (i <= j) {
            while (arr[i] < pivot) { i++; }
            while (arr[j] > pivot) { j--; }

            if (i >= j) { break; }
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
            j--;
        }
        _quickSortRecursive(start, i-1);
        _quickSortRecursive(i, end);
    }

    _quickSortRecursive(0, arr.length - 1);
    return arr;
}

const sortedArr = quickSort(arr);
console.log('Sorted array:');
console.log(JSON.stringify(sortedArr));

const divs = document.querySelectorAll('div');
const links = document.querySelectorAll('a');
console.log(`Divs count: ${divs.length}`);
console.log(`Links count: ${links.length}`);