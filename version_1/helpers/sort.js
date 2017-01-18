/**
 * Created by kate on 16/01/17.
 */

module.exports = (function () {

    const quickSort = (arr, left, right)=> {
        const len = arr.length;
        let pivot;
        let partitionIndex;

        if (left < right) {
            pivot = right;
            partitionIndex = partition(arr, pivot, left, right);

            //sort left and right
            quickSort(arr, left, partitionIndex - 1);
            quickSort(arr, partitionIndex + 1, right);
        }
        return arr;
    };


    function partition(arr, pivot, left, right) {
        let pivotValue = arr[pivot];
        let partitionIndex = left;

        for (let i = left; i < right; i++) {
            if (arr[i] < pivotValue) {
                swap(arr, i, partitionIndex);
                partitionIndex++;
            }
        }
        swap(arr, right, partitionIndex);
        return partitionIndex;
    }


    function swap(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    const mergeSort = (arr)=> {
        if (arr.length < 2)
            return arr;

        let middle = parseInt(arr.length / 2);
        let left = arr.slice(0, middle);
        let right = arr.slice(middle, arr.length);

        return merge(mergeSort(left), mergeSort(right));
    };

    function merge(left, right) {
        let result = [];
        left.reverse();
        right.reverse();

        while (left.length && right.length) {
            if (left[left.length - 1] <= right[right.length - 1]) {
                result.push(left.pop());
            } else {
                result.push(right.pop());
            }
        }
        
        while (left.length)
            result.push(left.pop());

        while (right.length)
            result.push(right.pop());

        return result;
    }
    
    return {
        quickSort: quickSort,
        mergeSort: mergeSort,
        merge: merge
    }
}());

 