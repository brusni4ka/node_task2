/**
 * Created by kate on 17/01/17.
 */
module.exports = class Worker {
    constructor(processes, arr) {
        this._processes = processes;
        this._sourceList = arr;
        this._processesPairs = [];
        this.result=null;
    }


    init() {
        const chunkLength = this._sourceList.length / this._processes.length;
        this._processes.forEach((child, index)=> {
            console.log(child.send);
            child.on('message', (data)=> {
                if(data.length === this._sourceList.length){
                    this.result = data;
                    child.kill();
                    this._onDoneCallback(data);
                }
                const length = this._processesPairs.length;
                let lastPair = this._processesPairs[length - 1];
                if (!length || lastPair.secondary_process) {
                    this._processesPairs.push({
                        main_process: {instance: child, result: data},
                        secondary_process: null
                    });
                } else {
                    lastPair.secondary_process = {instance: child, result: data};
                    this._processPair(lastPair);
                }
                console.log(length, this._processesPairs.length);

            });
            child.send({
                type: 'SORT',
                array: this._sourceList.slice(index * chunkLength, (index + 1) * chunkLength)
            });
        })
    }

    _processPair(pair) {
        const {main_process, secondary_process} = pair;
        console.log(main_process.instance.send);
        secondary_process.instance.kill();
        main_process.instance.send({
            type: 'MERGE',
            data: {
                main: main_process.result,
                secondary: secondary_process.result
            }
        });
    }
    
    onDone(callback){
        this._onDoneCallback = callback;
    }
    
};