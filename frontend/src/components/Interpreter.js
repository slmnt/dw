import Lexer from './lexer'
import Parser from './parser'

class Interpreter{

    stack = []
    heap = []
    cmd = [
        { cmds : [], nums: [], names: [] },
    ];
      
    constructor(){
        this.lexer = new Lexer()
        this.parser = new Parser();
    }

    run(cmd){
        var pre = this.lexer.decode(cmd)
        if(pre){
            // console.log(typeof [])
            var parse = this.parser.parsing(pre[0])
            //this.parser.make(parse)
        }
    }

    excute(){

    }
}

export default Interpreter