const keywords = [
    '+','-','*','/','%','=','++','--',';',
    '!=','==','>','<','>=','<=', '+>', '->'
];

const func = [
    'for','if',
    'left','right','up','down'
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

    func_check(cmd){

        for(var i=0;i < cmd.length;i++){
            if(this.func_matach(cmd[i])){
                var dump = []
                for(var j = i + 2;j<cmd.length-1;j++){
                    dump.push(cmd[j])
                }
                return [cmd[i],dump]
            }
        }

        return false
    }

    parsing(cmd){

    var j = 0
    var blocks = cmd
    var depth = 0
    var ds = []

    var temp = []

    var stack = []

    for(var i = 0; i < blocks.length;i++){
        switch(blocks[i]){
            case '++':
            case '--':
                break
            case '>':
            case '<':
            case '>=':
            case '<=':
            case '==':
            case '!=':
            case '=':
                if(depth >0){
                    ds[depth -1].push(blocks[i])
                }else{
                    stack.push(blocks[i])
                }
                break
            case '+':
            case '-':
                if(depth >0){
                    var d = temp.pop()
                    var dump = d.pop()
                    if(dump === '='){
                        ds[depth -1].push(dump)
                    }else{
                        d.push(dump)
                    }
                    temp.push(d)
                    ds[depth-1].push(blocks[i])
                }else{
                    if(temp.length > 0){
                        dump = temp.pop()
                        if(dump === '='){
                            stack.push(dump)
                        }else{
                            temp.push(dump)
                        }
                    }
                    stack.push(blocks[i])
                }
                break;
            case '*':
            case '/':
                if(depth > 0){
                    d = temp.pop()
                    dump = d.pop()
                    if(dump === '+' || dump === '=' || dump === '-'){
                        ds[depth -1].push(dump)
                    }else{
                        d.push(dump)
                    }
                    temp.push(d)
                    ds[depth-1].push(blocks[i])
                }else{
                    if(temp.length > 0){
                        dump = temp.pop()
                        if(dump === '+' || dump === '=' || dump === '-'){
                            stack.push(dump)
                        }else{
                            temp.push(dump)
                        }
                    }
                    stack.push(blocks[i])
                }
                break;
            case '+>':
            case '->':
                if(depth > 0){
                    d = temp.pop()
                    dump = d.pop()
                    if(dump === '+' || dump === '=' || dump === '-' || dump === '*' || dump === '/'){
                        ds[depth -1].push(dump)
                    }else{
                        if(blocks[i - 1] !== '(')
                            d.push(dump)
                    }
                    temp.push(d)
                    ds[depth-1].push(blocks[i])
                }else{
                    if(temp.length > 0){
                        dump = temp.pop()
                        if(dump === '+' || dump === '=' || dump === '-' || dump === '*' || dump === '/'){
                            stack.push(dump)
                        }else{
                            if(dump)
                                temp.push(dump)
                        }
                    }
                    stack.push(blocks[i])
                }
                break
            case '(':
                depth += 1;
                ds.push([])
                temp.push([])
                break
            case ')':
                if(ds[depth-1].length > 0){
                    d = temp.pop()

                    for(j = 0; j < ds[depth-1].length;j++){
                        d.push(ds[depth-1].pop())
                    }
                    temp.push(d)
                }
                depth -= 1;
                ds.pop()
                break
            default:
                if(depth > 0){
                    d = temp.pop()
                    d.push(blocks[i])
                    if(ds[0].length > 0){
                        for(j = 0; j < ds[0].length;j++){
                            d.push(ds[0].pop())
                        }
                    }
                    temp.push(d)
                }else{
                    temp.push(blocks[i])
                    if(stack.length > 0){
                        for(j = 0;j < stack.length;j++){
                            temp.push(stack.pop())
                        }
                    }
                }
                break;
        }
    }

    if(stack.length > 0){
        for(i = 0; i < stack.length;i++){
            temp.push(stack.pop())
        }
    }

    ds = []
    for(i = 0; i < temp.length;i++){
        if(typeof temp[i] === "object"){
            stack = temp[i]
            for(j = 0; j < stack.length;j++){
                ds.push(stack[j])                
            }            
        }else{
            ds.push(temp[i])
        }
    }
    temp = ds
    return temp
    }

    make(cmd){
        var block = cmd
        var cmds = []
        var vals = []
        var names = []

        for(var i = 0; i < block.length;i++){
            if(typeof block[i] === "string"){
                if(this.key_match(block[i])){
                    switch(block[i]){
                        case '+':
                            cmds.push(['ADD_VALS', 'none'])
                            break;
                        case '-':
                            cmds.push(['SUB_VALS', 'none'])
                            break;
                        case '*':
                            cmds.push(['MUL_VALS', 'none'])
                            break;
                        case '/':
                            cmds.push(['DIV_VALS', 'none'])
                            break;
                        case '%':
                            cmds.push(['REM_VALS', 'none'])
                            break;
                        case '=':
                            cmds.push(['STORE_VAL', 'none'])
                            break;
                        case '==':
                            cmds.push(['COMPARE_E', 'none'])
                            break;
                        case '!=':
                            cmds.push(['COMPARE_NE', 'none'])
                            break;
                        case '>=':
                            cmds.push(['COMPARE_BE', 'none'])
                            break;
                        case '<=':
                            cmds.push(['COMPARE_SE', 'none'])
                            break;
                        case '>':
                            cmds.push(['COMPARE_B', 'none'])
                            break;
                        case '<':
                            cmds.push(['COMPARE_S', 'none'])
                            break;
                        case '+>':
                            cmds.push(['ADD_O', 'none'])
                            break
                        case '->':
                            cmds.push(['SUB_O', 'none'])
                            break
                        case ';':
                            break

                    }
                }else{
                    cmds.push(['LOAD_NAME',names.length])
                    names.push(block[i])
                }
            }else{
                cmds.push(['LOAD_VAL',vals.length])
                vals.push(block[i])
            }
        }
        return {cmds,vals,names}
    }
}

export default Parser