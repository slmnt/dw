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
    var keyflag = false
    var keydump = ''

    var storeflag = false

    var blocks = cmd.prepro
    var f_block = cmd.flags

    // ( flag
    var depth = 0
    var ds = []


    var temp = []
    var ftemp = []

    var stack = []

    for(var i = 0; i < blocks.length;i++){
        switch(blocks[i]){
            case '+':
                if(depth >0){
                    ds[depth -1].push('+')
                }else{
                    stack.push('+')
                }
                break;
            case '-':
                if(depth > 0){
                    ds[depth -1].push('-')
                }
                else{
                    stack.push('-')
                }
                break;
            case '*':
                if(depth > 0){
                    var d = temp.pop()
                    var dump = d.pop()
                    if(dump === '+'){
                        ds[depth -1].push(dump)
                    }else if(dump === '-'){
                        ds[depth -1].push(dump)
                    }else{
                        d.push(dump)
                    }
                    temp.push(d)
                    ds[depth-1].push('*')
                }else{
                    if(temp.length > 0){
                        var dump = temp.pop()
                        if(dump === '+'){
                            stack.push(dump)
                        }else if(dump === '-'){
                            stack.push(dump)
                        }else{
                            temp.push(dump)
                        }
                    }
                    stack.push('*')
                }
                break;
            case '/':
                stack.push('/')
                break;
            case '(':
                depth += 1;
                ds.push([])
                temp.push([])
                ftemp.push('S')
                break
            case ')':
                if(ds[depth-1].length > 0){
                    for(var j = 0; j < ds[depth-1].length;j++){
                        temp.push(ds[depth-1].pop())
                    }
                }
                depth -= 1;
                ds.pop()
                break
            default:
                if(depth > 0){
                    var d = temp.pop()
                    d.push(blocks[i])
                    if(ds[0].length > 0){
                        for(var j = 0; j < ds[0].length;j++){
                            d.push(ds[0].pop())
                        }
                    }
                    temp.push(d)
                }else{
                    temp.push(blocks[i])
                    ftemp.push(f_block[i])
                    if(stack.length > 0){
                        for(var j = 0;j < stack.length;j++){
                            temp.push(stack.pop())
                            ftemp.push('None')
                        }
                    }
                }
                break;
        }
    }

    if(stack.length > 0){
        for(i = 0; i < stack.length;i++){
            temp.push(stack.pop())
            ftemp.push('None')
        }
    }

    console.log(temp)
    return [{temp, ftemp}]

    }

    make(cmd){
        var flags = cmd[0].ftemp
        var block = cmd[0].temp
        

        var cmds = []
        var vals = []
        var names = []

        for(var i = 0; i < block.length;i++){
            if(flags[i]){
                cmds.push(['LOAD_VAL',vals.length])
                vals.push(block[i])
            }else{
                if(this.key_match(block[i])){
                    switch(block[i]){
                        case '+':
                            cmds.push('ADD_VALS')
                            break;
                        case '-':
                            cmds.push('SUB_VALS')
                            break;
                        case '*':
                            cmds.push('MUL_VALS')
                            break;
                        case '/':
                            cmds.push('DIV_VALS')
                            break;
                        case '%':
                            cmds.push('REM_VALS')
                            break;
                        case '=':
                            cmds.push('STORE_VAL')
                            break;
                    }
                }else{
                    cmds.push(['LOAD_NAME',names.length])
                    names.push(block[i])
                }
            }
        }

        console.log([{cmds,vals,names}])
    }
}

export default Parser