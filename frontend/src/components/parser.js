const keywords = [
    '+','-','*','/','%','=','++','--'
];

const func = [
    'left','right','up','down',
    'for','if'
]

class Parser{

    constructor(){

    }

    key_match(k){
        for(var i = 0; i < keywords.length;i++){
            if(k === keywords[i])
                return keywords[i];
        }
        return false;
    }

    func_matach(f){
        for(var i = 0; i < func.length;i++){
            if(f === func[i])
                return func[i];
        }
        return false;
    }

    parsing(cmd){
    // syntax decode: reverse borland
    var key;
    for(var i = 0; i < cmd.length;i++){
        if(key = this.key_match(cmd[i])){
            console.log('find key')
        }
    }
    }
}

export default Parser