import Lexer from './lexer'
import Parser from './parser'

class Interpreter{

    stack = []
    heap = []
    fp = []
    i_block = []
    f_block = []

    indent = 0
    blockinfo = []

    /**
     * IF_BLOCK
     * CMD: ['IF_BLOCK',0]
     * [
     *  IF_CMD: {}
     *  BODY_CMD: {}
     * ]
     * 
     * FOR_BLOCK
     * CMD: ['FOR_BLOCK', 0]
     * [
     *  INIT_CMD: {}
     *  COMPARE_CMD: {}
     *  BODY_CMD: {}
     *  AFTER_CMD: {}
     * ]
     */
    constructor(){
        this.lexer = new Lexer()
        this.parser = new Parser();
    }

    /**
     * 
     * @param {*} cmd 
     * Memo:
     *  fix 
     * if indent > 0
     *  indent out?
     *  yes
     *  no
     *  input
     *      indent input
     *      normal input
     * else 0
     *  if func?
     *      yes
     *      no
     * 
     */
    run(cmd){
        var pre = this.lexer.decode(cmd)
        if(this.indent > 0){
            // execute section
            if(cmd === ""){
                this.indent--;
                this.blockinfo.pop()
                if(this.indent === 0){
                    for(var i = 0;i<this.fp.length;i++){
                        var temp = this.fp[i]
                        if(temp[0] === 'IF_BLOCK'){
                            this.excute(this.i_block[temp[1]]['if_cmd'])
                            var flag = this.stack.pop()
                            if(flag === 'true'){
                                for(var j = 0;j<this.i_block[temp[1]]['body_cmd'].length;j++){
                                    this.excute(this.i_block[temp[1]]['body_cmd'][j])
                                }
                            }
                        }else{
                            this.for_execute(temp[1])                            
                        }
                    }
                    this.fp = []
                    console.log(this.stack)
                }
            }
            // insert section
            else{
                var checker = this.parser.func_check(pre)
                if(checker[0] === 'if'){
                    var parse = this.parser.parsing(checker[1])
                    pre = this.parser.make(parse)
                    this.blockinfo.push('if')

                    var dump = this.fp.pop()
                    this.fp.push(dump)

                    this.i_block.push({if_cmd: pre, body_cmd: []})
                    temp = {cmds:[['IF_BLOCK',this.i_block.length - 1]],vals:[],names:[]}
                    if(dump[0] === 'IF_BLOCK'){
                        this.i_block[dump[1]]['body_cmd'].push(temp)
                    }else{
                        this.f_block[dump[1]]['body_cmd'].push(temp)
                    }
                    this.indent++
                }else if(checker[0] === 'for'){
                    this.new_forblock(checker)

                    this.blockinfo.push('for')
                    var dump = this.fp.pop()
                    this.fp.push(dump)
                    temp = {cmds:[['FOR_BLOCK',this.f_block.length - 1]],vals:[],names:[]}
                    if(dump[0] === 'IF_BLOCK'){
                        this.i_block[dump[1]]['body_cmd'].push(temp)
                    }else{
                        this.f_block[dump[1]]['body_cmd'].push(temp)
                    }
                    this.indent++
                }else{
                    parse = this.parser.parsing(pre)
                    pre = this.parser.make(parse)//-> make body cmd

                    if(this.blockinfo.pop() === 'if'){
                        this.blockinfo.push('if')
                        this.i_block[this.i_block.length - 1]['body_cmd'].push(pre)
                    }else{
                        this.blockinfo.push('for')
                        this.f_block[this.f_block.length - 1]['body_cmd'].push(pre)
                    }
                }
            }
        }
        //normal insert section
        else{
            checker = this.parser.func_check(pre)
            if(checker){
                if(checker[0] === 'if'){
                    this.blockinfo.push('if')
                    this.fp.push(['IF_BLOCK',this.i_block.length])
                    parse = this.parser.parsing(checker[1])
                    pre = this.parser.make(parse)
                    this.i_block.push({if_cmd: pre, body_cmd: []})
                }else if(checker[0] === 'for'){
                    this.fp.push(['FOR_BLOCK', this.f_block.length])
                    this.blockinfo.push('for')
                    this.new_forblock(checker)
                }
                this.indent++
            }else{
                parse = this.parser.parsing(pre)
                pre = this.parser.make(parse)
                this.excute(pre)
                if(this.stack.length > 0)
                    return this.stack.pop()
            }
        }
    }

    new_forblock(checker){
        var temp1 = [[]]
        for(var i = 0; i < checker[1].length;i++){
            if(checker[1][i] === ";"){
                temp1.push([])
            }else{
                temp1[temp1.length - 1].push(checker[1][i])
            }
        }
        // parse = this.parser.parsing(checker[1])
        var dump1 = this.parser.parsing(temp1[0])//init
        dump1 = this.parser.make(dump1)
        var dump2 = this.parser.parsing(temp1[1])//compare
        dump2 = this.parser.make(dump2)
        var dump3 = this.parser.parsing(temp1[2])//after
        dump3 = this.parser.make(dump3)
        this.f_block.push({init_cmd:dump1, compare_cmd: dump2,
                            body_cmd:[], after_cmd:dump3})

    }

    for_execute(num){
        var temp = this.f_block[num]
        this.excute(temp['init_cmd'])

        var infinate = 0
        while(true){
            infinate++;
            if(infinate > 100000){
                console.log("infinate loop error")
                break
            }

            this.excute(temp['compare_cmd'])
            var flag = this.stack.pop()
            if(flag === 'true'){
                for(var i2 = 0;i2<temp['body_cmd'].length;i2++){
                    this.excute(temp['body_cmd'][i2])
                }
                this.excute(temp['after_cmd'])
            }else{
                break
            }
        }
    }

    if_execute(num){
        var temp = this.i_block[num]
        this.excute(temp['if_cmd'])

        var flag = this.stack.pop()
        if(flag === 'true'){
            for(var j2 = 0;j2 < temp['body_cmd'].length;j2++){
                this.excute(temp['body_cmd'][j2])
            }
        }
    }

    load_val(){
        var i3 = 0;
        var tar2 = this.stack.pop()
        if(typeof tar2 === 'string'){
            for(i3 = 0;i3 < this.heap.length;i3++){
                if(this.heap[i3][0] === tar2){
                    tar2 = this.heap[i3][1]
                    break
                }
            }
        }
        var tar1 = this.stack.pop()
        if(typeof tar1 === 'string'){
            for(i3 = 0;i3 < this.heap.length;i3++){
                if(this.heap[i3][0] === tar1){
                    tar1 = this.heap[i3][1]
                    break
                }
            }
        }
        return [tar1, tar2]
    }    

    excute(cmds){
        var cmd = cmds.cmds
        var val = cmds.vals
        var name = cmds.names

        var temp = []

        for(var i = 0; i < cmd.length;i++){
            switch(cmd[i][0]){
                case 'LOAD_VAL':
                    this.stack.push(val[cmd[i][1]])
                    break
                case 'LOAD_NAME':
                    this.stack.push(name[cmd[i][1]])
                    break
                case 'ADD_O':
                    var tar1 = this.stack.pop()
                    if(typeof tar1 === 'string'){
                        for(var i3 = 0;i3 < this.heap.length;i3++){
                            if(this.heap[i3][0] === tar1){
                                this.heap[i3][1]++;
                                tar1 = this.heap[i3][1]
                                break
                            }
                        }
                    }else{
                        this.stack.push(++tar1)                        
                    }
                    break
                case 'SUB_O':
                    tar1 = this.stack.pop()
                    if(typeof tar1 === 'string'){
                        for(i3 = 0;i3 < this.heap.length;i3++){
                            if(this.heap[i3][0] === tar1){
                                this.heap[i3][1]--;
                                tar1 = this.heap[i3][1]
                                break
                            }
                        }
                    }else{
                        this.stack.push(--tar1)
                    }
                    break
                case 'ADD_VALS':
                    temp = this.load_val()
                    var re = temp[0] + temp[1]
                    this.stack.push(re)
                    break
                case 'SUB_VALS':
                    temp = this.load_val()
                    var re = temp[0] - temp[1]
                    this.stack.push(re)
                    break
                case 'MUL_VALS':
                    temp = this.load_val()
                    var re = temp[0] * temp[1]
                    this.stack.push(re)
                    break
                case 'DIV_VALS':
                    temp = this.load_val()
                    var re = temp[0] / temp[1]
                    this.stack.push(re)
                    break
                case 'REM_VALS':
                    temp = this.load_val()
                    var re = temp[0] % temp[1]
                    this.stack.push(re)
                    break
                case 'STORE_VAL':
                    var tar2 = this.stack.pop()
                    var tar1 = this.stack.pop()
                    var flag = false
                    for(var i3 = 0;i3 < this.heap.length;i3++){
                        if(this.heap[i3][0] === tar1){
                            this.heap[i3][1] = tar2
                            flag = true
                            break
                        }
                    }
                    if(flag)
                        break
                    else
                        this.heap.push([tar1,tar2])
                    break
                case 'COMPARE_E':
                    temp = this.load_val()
                    if(temp[0] === temp[1])
                        this.stack.push('true')
                    else
                        this.stack.push('false')
                    break
                case 'COMPARE_NE':
                    temp = this.load_val()

                    if(temp[0] !== temp[1])
                        this.stack.push('true')
                    else
                        this.stack.push('false')
                    break
                case 'COMPARE_BE':
                    temp = this.load_val()

                    if(temp[0] >= temp[1])
                        this.stack.push('true')
                    else
                        this.stack.push('false')
                    break
                case 'COMPARE_SE':
                    temp = this.load_val()

                    if(temp[0] <= temp[1])
                        this.stack.push('true')
                    else
                        this.stack.push('false')
                    break
                case 'COMPARE_B':
                    temp = this.load_val()

                    if(temp[0] > temp[1])
                        this.stack.push('true')
                    else
                        this.stack.push('false')
                    break
                case 'COMPARE_S':
                    temp = this.load_val()
                    if(temp[0] < temp[1])
                        this.stack.push('true')
                    else
                        this.stack.push('false')
                    break
                case 'IF_BLOCK':
                    this.if_execute(cmd[i][1])
                    break
                case 'FOR_BLOCK':
                    this.for_execute(cmd[i][1])
                    break
                default:
                    console.log("error")
                    break
            }
        }
    }
}

export default Interpreter